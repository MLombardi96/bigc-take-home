import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Listing from "../components/listing";
import Pagination from "../components/pagination";

const pageSize = 10;

export default function Home({ listings }) {
  const router = useRouter();

  useEffect(() => {
    const onRouteChange = (url) => {
      const queryString = url.replace("#", "").split("?")[1];
      const page = Number(new URLSearchParams(queryString).get("page"));

      if (!isNaN(page) && currentPage !== page) {
        setCurrentPage(Number(page));
      }
    };

    router.events.on("routeChangeStart", onRouteChange);

    return () => {
      router.events.off("routeChangeStart", onRouteChange);
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const currentListingData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * pageSize;
    const lastPageIdx = firstPageIdx + pageSize;
    return listings.slice(firstPageIdx, lastPageIdx);
  }, [listings, currentPage]);

  const pageCount = Math.ceil(listings.length / pageSize);

  return (
    <div>
      <Head>
        <title>Store Listings</title>
        <meta
          name="description"
          content="Store listings app created for BigCommerce take home"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {currentListingData.map((listing) => (
          <Listing key={listing.id} data={listing}></Listing>
        ))}
      </div>
      <Pagination
        pageSize={pageSize}
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={(page) =>
          router.push(
            {
              pathname: router.pathname,
              query: { page },
            },
            null,
            { shallow: true }
          )
        }
      ></Pagination>
    </div>
  );
}

export async function getStaticProps() {
  let listings = [];
  let remainingIds = [];

  try {
    const listingsRes = await fetch(
      "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
    );

    if (!listingsRes.ok) {
      throw new Error(
        `Error while fetching listings: ${listingsRes.statusText}`
      );
    }

    const listingIds = await listingsRes.json();

    remainingIds = listingIds.slice();
  } catch (error) {
    console.error(error.message);
  }

  while (remainingIds.length > 0) {
    console.log(`Remaining listings to fetch: ${remainingIds.length}`);

    let batch = await Promise.all(
      remainingIds.map(async (id) => {
        try {
          const listingRes = await fetch(
            `https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${id}`
          );

          if (!listingRes.ok) {
            throw new Error(
              `Error while fetching listing ${id}: ${listingRes.statusText}`
            );
          }

          const listing = await listingRes.json();

          if (listing.error) {
            throw new Error(
              `Error while fetching listing ${id}: ${listing.error}`
            );
          }

          remainingIds = remainingIds.filter((fetchId) => id !== fetchId);

          return listing;
        } catch (error) {
          console.error(error.message);

          return null;
        }
      })
    );

    batch = batch.filter((i) => i != null);
    console.log(`Batch fetched: ${batch.length}`);

    listings = listings.concat(batch);
    console.log(`Total listings fetched: ${listings.length}`);
  }

  return {
    props: {
      listings,
    },
  };
}
