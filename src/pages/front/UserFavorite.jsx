import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { alertError, alertDeleteConfirm } from '../../../util/sweetAlert';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import axios from 'axios';
export default function UserFavorite() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const userInfo = useRef({});
  const getFavoriteProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      userInfo.current = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.current?.id) {
        const res = await axios.get(
          `/600/users/${userInfo.current.id}/favorites?_expand=product&_page=${page}&_limit=10`,
        );
        setTotalPages(Math.ceil(res.headers.get('X-Total-Count') / 10));
        setFavoriteProducts(res.data);
      }
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));
  }, []);
  useEffect(() => {
    getFavoriteProducts(currentPage);
  }, [currentPage]);

  // 刪除收藏商品
  const deleteFavoriteProduct = async (favoriteId, productName) => {
    const res = await alertDeleteConfirm(`確認刪除 ${productName} 嗎`);
    if (res.isConfirmed) {
      setIsLoading(true);
      try {
        await axios.delete(`/600/favorites/${favoriteId}`);
        await getFavoriteProducts();
      } catch (error) {
        alertError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <h1 className="fs-4 mb-8 noto-sans-tc">我的收藏</h1>
      <div className="table-responsive">
        <table className="table bg-transparent">
          <thead className="bg-transparent">
            <tr>
              <th scope="col" className="ps-10">
                商品類別
              </th>
              <th scope="col" className="p-3">
                商品名稱
              </th>
              <th scope="col" className="p-3">
                售價
              </th>
              <th scope="col" className="p-3">
                管理狀態
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {favoriteProducts.map((item) => (
              <tr key={item.product.id}>
                <th scope="row" className="p-3 ps-10">
                  {item.product.category}
                </th>
                <td className="p-3">{item.product.title}</td>
                <td className="p-3">{item.product.price}</td>
                <td className="p-3">
                  <NavLink
                    to={`/product-details/${item.product.id}`}
                    className="btn btn-sm btn-outline-primary me-4"
                  >
                    立即訂購
                  </NavLink>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                      deleteFavoriteProduct(item.id, item.product.title)
                    }
                  >
                    移除收藏
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
