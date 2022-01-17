export default function Pagination({
  pageCount,
  currentPage,
  pageSize,
  onPageChange,
}) {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={"page-item " + (currentPage === 1 ? "disabled" : "")}>
          <a
            href="#"
            className="page-link"
            onClick={() => {
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            Previous
          </a>
        </li>
        {pages.map((i) => (
          <li
            key={i}
            className={"page-item " + (i === currentPage ? "active" : "")}
          >
            <a href="#" className="page-link" onClick={() => onPageChange(i)}>
              {i}
            </a>
          </li>
        ))}
        <li
          className={
            "page-item " + (currentPage === pageCount ? "disabled" : "")
          }
        >
          <a
            href="#"
            className="page-link"
            onClick={() => {
              if (currentPage < pageCount) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
