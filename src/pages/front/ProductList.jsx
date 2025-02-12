import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alertError } from '../../../util/sweetAlert';
import axios from "axios";
export default function ProductList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // 商品列表
  const [products, setProducts] = useState([]);
  const getProducts = async ({ page, category, searchText }) => {
    setIsLoading(true);
    try {
      let url = `/products?_page=${page}&_limit=6`;
      if (category) {
        url += `&category=${category}`;
      }
      if (searchText) {
        url = `/products?title_like=${searchText}`;
      }
      const res = await axios.get(url);
      setTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 6));
      setProducts(res.data);
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  // 商品類別
  const [productCategories, setProductCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const setCategory = (event, category) => {
    event.preventDefault();
    setSearchText('');
    setCurrentPage(1);
    setCurrentCategory(category);
  }
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/products`);
      setProductCategories([...new Set(res.data.map(product => product.category))]);
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 搜尋商品
  const [searchText, setSearchText] = useState('');
  const searchProducts = () => {
    getProducts({ page: null, category: null, searchText });
  }

  useEffect(() => {
    getProducts({ page: currentPage, category: currentCategory });
    getAllProducts();
  }, [currentPage, currentCategory]);

  return (
    <div className="bg-primary-50">
      <div className="container py-4 py-md-15">
        { !isSearchOpen && (
          <div className="row align-items-center justify-content-between">
            <div className="col-auto col-md-9">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb align-items-center mb-0">
                  <li className="breadcrumb-item py-2 py-md-4">
                    <Link to="/"
                      className="text-gray-600">
                      首頁
                    </Link>
                  </li>
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
                    <Link to="/product-list"
                      className="text-gray-600">
                      全部商品
                    </Link>
                  </li>
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
            </div>
            <div className="col-auto col-md-3">
              <button type="button"
                className="btn p-0 d-md-none"
                onClick={() => setIsSearchOpen(true)}
                >
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                  style={{
                    width: '20px',
                    height: '20px',
                  }}>
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </button>
              <input
                type="text"
                className="form-control rounded-0 d-none d-md-block"
                placeholder="搜尋商品"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.trim())}
                onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                onBlur={(e) => searchProducts(e)}/>
            </div>
          </div>
        )}
        { isSearchOpen && (
          <input
            type="text"
            className="form-control rounded-0 d-md-none"
            placeholder="搜尋商品"
            onChange={(e) => setSearchText(e.target.value.trim())}
            onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
            onBlur={(e) => searchProducts(e)}/>
        )}
      </div>
      <div className="container">
        <div className="pt-6 pb-18 py-md-18">
          <div className="row">
            <div className="col-md-3 mb-6 mb-md-0">
              <div className="d-flex overflow-x-scroll d-md-none">
                <button type="button"
                  className={`btn py-2 px-4 flex-shrink-0 me-4 ${currentCategory ? 'btn-light border-gray-400' : 'btn-primary-700'}`}
                  onClick={(e) => setCategory(e, '')}>
                  全部商品
                </button>
                {
                  productCategories.map(category => (
                    <button type="button"
                      key={category}
                      className={`btn py-2 px-4 border-gray-400 flex-shrink-0 me-4 ${currentCategory === category ? 'btn-primary-700' : 'btn-light'}`}
                      onClick={(e) => setCategory(e, category)}>
                      {category}
                    </button>
                  ))
                }
              </div>
              <ul className="d-none d-md-block list-unstyled">
                <li className="mb-4">
                  <a href="#"
                    className={`${currentCategory ? 'text-dark' : 'text-danger'}`}
                    onClick={(e) => setCategory(e, '')}>
                    全部商品
                  </a>
                </li>
                {
                  productCategories.map(category => (
                    <li className="mb-4"
                      key={category}>
                      <a href="#"
                        className={`${category === currentCategory ? 'text-danger' : 'text-dark'} outline-none`}
                        onClick={(e) => setCategory(e, category)}>
                        {category}
                        <span className="text-gray-600 ms-1">(22)</span>
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="col-md-9">
              { searchText ? (
                <p className="text-dark d-none d-md-block fs-5 mb-md-18">篩選結果</p>
              ) : (
                <h1 className="text-dark d-none d-md-block fs-5 mb-md-18">
                  { currentCategory ? currentCategory : '全部商品' }
                </h1>
              )}
              <div className="row row-gap-12 row-gap-md-18">
                { (!products.length && searchText) ? (
                  <p className="text-center fs-4">您搜尋的商品不存在</p>
                ) : (
                  products.map(product => (
                    <div className="col-md-6 col-lg-4"
                      key={product.id}>
                      <div className="card-product position-relative">
                        <a href="#" className="stretched-link"></a>
                        <div className="card-product__image mb-4 position-relative overflow-hidden">
                          <img
                            className="w-100 object-fit-cover object-position-center"    
                            src={product.imageUrl}
                            alt={product.title} />
                          <button
                            type="button"
                            className="btn btn-primary-500 w-100 card-product__button text-light">
                            加入購物車
                          </button>
                        </div>
                        <h2 className="text-center fs-6 text-dark mb-3">{product.title}</h2>
                        <p className="text-center text-primary-800 noto-serif-tc">
                          NT$ <span className="fs-6">{product.price}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
