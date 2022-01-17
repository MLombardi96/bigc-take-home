import Image from "next/image";

export default function Listing({ data }) {
  return (
    <div className="col">
      <div className="card bg-light">
        <Image
          className="card-img-top img-fluid"
          src={data.image.url}
          alt={data.image.title}
          width={data.image.width}
          height={data.image.height}
        ></Image>
        <hr className="dropdown-divider m-0"></hr>
        <div className="card-body">
          <h4 className="card-title">{data.title}</h4>
          <p className="card-text">{data.description}</p>
          <a
            className="btn btn-primary"
            href={data.url.value}
            target={data.url.target ? data.url.target : ""}
            role="button"
            rel="noopener noreferrer"
          >
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}
