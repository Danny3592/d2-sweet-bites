

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <nav className='pt-2 pb-5' aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className={`page-link text-primary-600 ${currentPage <= 1 ? "disabled" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(prePage => prePage - 1);
            }}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
          {
            Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              return (
                <li className="page-item"
                  key={page}>
                  <a className={`page-link text-primary-600 ${currentPage === page ? "text-light bg-primary" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    >
                    {page}
                  </a>
                </li>
              )
            })
          }  
        <li className="page-item">
          <a className={`page-link text-primary-600 ${currentPage >= totalPages ? "disabled" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(prePage => prePage + 1);
            }}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
