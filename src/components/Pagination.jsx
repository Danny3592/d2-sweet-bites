

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <nav className='pt-2 pb-5' aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className={`page-link ${currentPage <= 1 ? "disabled" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(prePage => prePage - 1);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
              style={{
                width: '16px',
                height: '16px',
              }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </a>
        </li>
          {
            Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              return (
                <li className="page-item mx-1 mx-md-3"
                  key={page}>
                  <a className={`page-link ${currentPage === page ? "active" : ""}`}
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
          <a className={`page-link ${currentPage >= totalPages ? "disabled" : ""}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(prePage => prePage + 1);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              style={{
                width: '16px',
                height: '16px',
              }}>
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}
