import { Link } from "react-router-dom";
import { Fragment } from "react";
export default function Breadcrumb({ currentCategory, breadcrumbPath }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb align-items-center mb-0">
        <li className="breadcrumb-item py-2 py-md-4">
          <Link to="/"
            className="text-gray-600">
            首頁
          </Link>
        </li>
        {
          breadcrumbPath.map(path => (
            <Fragment key={path.name}>
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 mx-1"
                style={{
                  width: '20px',
                  height: '20px',
                }}>
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
              </svg>
              <li className="breadcrumb-item py-2 py-md-4">
                <Link to={path.path}
                  className="text-gray-600">
                  {path.name}
                </Link>
              </li>
            </Fragment>
          ))
        }
        {currentCategory && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 mx-1"
              style={{
                width: '20px',
                height: '20px',
              }}>
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
            <li className="breadcrumb-item py-2 py-md-4 active" aria-current="page">
              { currentCategory }
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
