import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import {
  alertDeleteConfirm,
  toastAlert,
  alertError,
} from '../../../util/sweetAlert';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import axios from 'axios';
import AdminOrderModal from '../../components/dashboard/AdminOrderModal';

export default function AdminProducts() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`660/orders?_page=${page}&_limit=10`);
      console.log(res.data);
      setOrders(res.data);
      setTotalPages(Math.ceil(res.headers.get('X-Total-Count') / 10));
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrders(currentPage);
  }, [currentPage]);

  const orderModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    orderModal.current = new Modal(modalRef.current, {
      backdrop: 'static',
    });
  }, []);

  const openOrderModal = () => {
    orderModal.current.show();
  };

  const closeOrderModal = () => {
    orderModal.current.hide();
  };
  const deleteOrder = async (order) => {
    const res = await alertDeleteConfirm(
      `確認刪除 ${order?.userInfo?.name}的${order.displayOrderId}號訂單 嗎?`,
    );
    if (!res.isConfirmed) return;
    setIsLoading(true);
    try {
      await axios.delete(`/660/orders/${order.id}`);
      toastAlert('訂單刪除成功');
      getOrders(currentPage);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <AdminOrderModal
        modalRef={modalRef}
        closeOrderModal={closeOrderModal}
        order={order}
        currentPage={currentPage}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理訂單</h2>
      </div>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th>訂單號碼</th>
              <th>客戶名稱</th>
              <th>下單日期</th>
              <th>訂單金額</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              console.log(order);
              const formattedAmount = order.totalAmount.toLocaleString(
                'zh-TW',
                {
                  style: 'currency',
                  currency: 'TWD',
                  minimumFractionDigits: 0,
                },
              );
              return (
                <tr key={order?.id}>
                  <td>{order?.displayOrderId}</td>
                  <td>{order?.userInfo?.name}</td>
                  <td>{order?.date}</td>
                  <td>NT{formattedAmount}</td>
                  <td>{order?.isPaid? '已付款' : '待付款'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setOrder(order)
                        openOrderModal();
                      }}
                    >
                      查看
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => deleteOrder(order)}
                    >
                      取消
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}
