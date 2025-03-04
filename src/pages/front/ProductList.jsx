import { useEffect, useState } from "react";
import { alertError } from '../../../util/sweetAlert';
import CardProduct from "../../components/front/CardProduct";
import Pagination from "../../components/Pagination";
import Breadcrumb from "../../components/front/Breadcrumb";
import Loading from "../../components/Loading";
import axios from "axios";
export default function ProductList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const breadcrumbPath = [{
    path: '/product-list',
    name: '全部商品'
  }];
  
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
      const categoryCount = res.data.reduce((count, product) => {
        if (!count[product.category]) {
          count[product.category] = 1;
        } else {
          count[product.category] += 1;
        }
        return count;
      }, {});
      setProductCategories(Object.entries(categoryCount));
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  // 搜尋商品
  const [searchText, setSearchText] = useState('');
  const searchProducts = () => {
    getProducts({ page: null, category: null, searchText });
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getProducts({ page: currentPage, category: currentCategory });
  }, [currentPage, currentCategory]);

  return (
    <>
      { isLoading && <Loading type="spin" color="#D4A58E"/> }
      <div className="bg-primary-50">
        <div className="container py-4 py-md-15">
          { !isSearchOpen && (
            <div className="row align-items-center justify-content-between">
              <div className="col-auto col-md-9">
                <Breadcrumb
                  currentCategory={currentCategory}
                  breadcrumbPath={breadcrumbPath}
                />
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
                  onKeyDown={(e) => e.key === 'Enter' && searchProducts()}/>
              </div>
            </div>
          )}
          { isSearchOpen && (
            <input
              type="text"
              className="form-control rounded-0 d-md-none"
              placeholder="搜尋商品"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.trim())}
              onKeyDown={(e) => e.key === 'Enter' && searchProducts()}/>
          )}
        </div>
        <div className="container">
          <div className="pt-6 pb-18 py-md-18">
            <div className="row mb-18">
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
                        key={category[0]}
                        className={`btn py-2 px-4 border-gray-400 flex-shrink-0 me-4 ${currentCategory === category[0] ? 'btn-primary-700' : 'btn-light'}`}
                        onClick={(e) => setCategory(e, category[0])}>
                        {category[0]}
                      </button>
                    ))
                  }
                </div>
                <ul className="d-none d-md-block list-unstyled position-sticky top-15">
                  <li className="mb-4">
                    <a href="#"
                      className={`text-danger-hover transition-base ${currentCategory ? 'text-dark' : 'text-danger'}`}
                      onClick={(e) => setCategory(e, '')}>
                      全部商品
                    </a>
                  </li>
                  {
                    productCategories.map(category => (
                      <li className="mb-4"
                        key={category[0]}>
                        <a href="#"
                          className={`text-danger-hover transition-base ${category[0] === currentCategory ? 'text-danger' : 'text-dark'} outline-none`}
                          onClick={(e) => setCategory(e, category[0])}>
                          {category[0]}
                          <span className="text-gray-600 ms-1">({category[1]})</span>
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
                    <>
                      {products.map(product => (
                        <div className="col-md-6 col-lg-4"
                          key={product.id}>
                          <CardProduct product={product}/>
                        </div>
                      ))}
                      {!searchText && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
