import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { alertError, alertDeleteConfirm } from '../../../util/sweetAlert';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts as getProductAllList,
  selectProducts,
} from "../../slice/productSlice";
import axios from 'axios';
export default function UserOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const userInfo = useRef({});
  const dispatch = useDispatch();
  const getOrders = async (userId) => {
    setIsLoading(true);
    try {
      const res = await axios(`/600/orders`);
      const userData = res.data.filter(data => Number(data.userId) === userId).map(data => {
        return {
          ...data,
          isOpen: false,
        }
      });
      setOrders(userData);
    } catch(error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const products = useSelector(selectProducts);
  const getProducts = () => {
    dispatch(getProductAllList());
  }
  const toggleOpen = (orderId) => {
    setOrders(prevOrders => {
      const isCurrentlyOpen = prevOrders.find(order => order.id === orderId)?.isOpen;
        return prevOrders.map(order => ({
          ...order,
          isOpen: order.id === orderId ? !isCurrentlyOpen : false
        }));
    })
  }
  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));
    getOrders(userInfo.current.id);
    getProducts();
  }, []);

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <h1 className="fs-4 mb-8 noto-sans-tc">我的訂單</h1>
      <div className="table-responsive">
        <table className="table bg-transparent">
          <thead className="bg-transparent">
            <tr>
              <th scope="col" className="ps-10">
                訂單號碼
              </th>
              <th scope="col" className="p-3">
                下單日期
              </th>
              <th scope="col" className="p-3">
                訂單金額
              </th>
              <th scope="col" className="p-3">
                狀態
              </th>
              <th scope="col" className="p-3">
                查看
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            { orders.map(order => (
              <>
                <tr key={order.id}>
                  <th scope="row" className="p-3 ps-10">
                    { order.displayOrderId }
                  </th>
                  <td className="p-3">
                    { order.date }
                  </td>
                  <td className="p-3">
                    { order.totalAmount }
                  </td>
                  <td className="p-3">
                    { order?.userInfo?.isPaid ? '已付款' : '未付款' }
                  </td>
                  <td className="p-3">
                    <button type="button"
                      className='btn p-0 text-dark'
                      onClick={() => toggleOpen(order.id)}>
                      { order.isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                          width={24} height={24}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                          width={24} height={24}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
                { 
                  order.isOpen && (
                    <tr>
                      <td className='p-3' colSpan={5}>
                        <table className="table">
                          <thead className="bg-transparent">
                            <tr>
                              <th scope="col" className="ps-10">
                                商品名稱
                              </th>
                              <th scope="col" className="p-3">
                                商品數量
                              </th>
                              <th scope="col" className="p-3">
                                商品金額
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            { order?.recentItems?.map(product => (
                              <tr key={product.productId}>
                                <td className="p-3 ps-10">
                                  { products.find(item => item.id === product.productId).title }
                                </td>
                                <td className="p-3">
                                  { product.qty }
                                </td>
                                <td className="p-3">
                                  NT{ product.qty * product.price }
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )
                }
              </>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      /> */}
    </>
  );
}
