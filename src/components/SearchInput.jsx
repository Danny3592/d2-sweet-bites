import PropTypes from 'prop-types';

export default function SearchInput({ className, searchText, setSearchText, searchMethod }) {
  return (
    <div className={`position-relative ${className}`}>
      <input
        type="text"
        className="form-control rounded-0 ps-13"
        placeholder="搜尋"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.trim())}
        onKeyDown={(e) => e.key === 'Enter' && searchMethod()}/>
      <svg xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="position-absolute top-12px start-16px"
        width={24}
        hanging={24}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>
  )
}

SearchInput.propTypes = {
  className: PropTypes.string,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  searchMethod: PropTypes.func
}


