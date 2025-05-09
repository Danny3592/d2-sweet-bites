import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { alertDeleteConfirm, toastAlert, alertError } from '../../../util/sweetAlert';
import AdminCouponModal from '@/components/dashboard/AdminCouponModal';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';

export default function AdminProducts() {
  const [coupons, setCoupons] = useState([]);
  const [type, setType] = useState('create'); // edit
  const [tempCoupon, setTempCoupon] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/660/coupons?_page=${page}&_limit=10`);
      setTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 10));
      setCoupons(res.data);
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCoupons(currentPage);
  }, [currentPage]);

  const couponModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    couponModal.current = new Modal(modalRef.current, {
      backdrop: 'static'
    });
  }, []);

  const openCouponModal = (type, coupon) => {
    setType(type);
    setTempCoupon(coupon);
    couponModal.current.show();
  }

  const closeCouponModal = () => {
    couponModal.current.hide();
  }

  const deleteCoupon = async (coupon) => {
    const res = await alertDeleteConfirm(`確認刪除 ${coupon.title} 嗎?`);
    if (!res.isConfirmed) return;
    setIsLoading(true);
    try {
      await axios.delete(`/660/coupons/${coupon.id}`);
      toastAlert('優惠券刪除成功');
      getCoupons(currentPage);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      { isLoading && <Loading type="spin" color="#D4A58E"/> }
      <AdminCouponModal
        modalRef={modalRef}
        closeCouponModal={closeCouponModal}
        getCoupons={getCoupons}
        currentPage={currentPage}
        tempCoupon={tempCoupon}
        type={type}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理優惠券</h2>
        <button className="btn btn-primary"
          onClick={() => openCouponModal('create', {})}>
          建立新優惠券
        </button>
      </div>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>折扣碼</th>
              <th className='px-5'>折扣</th>
              <th>到期日</th>
              <th>啟用狀態</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              coupons.map(coupon => {
                return (
                  <tr key={coupon.title}>
                    <td>{coupon.title}</td>
                    <td>{coupon.code}</td>
                    <td>{coupon.percent / 10}折</td>
                    <td>{coupon.due_date}</td>
                    <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openCouponModal('edit', coupon)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => deleteCoupon(coupon)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                )
              })
            }
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
