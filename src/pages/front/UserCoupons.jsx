import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertError } from '../../../util/sweetAlert';

// Components
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';

const UserCoupons = () => {
  const navigate = useNavigate();

  // 優惠券 state
  const [coupons, setCoupons] = useState([]);

  // 分頁 state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; // 每頁顯示 10 個項目

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // 取得優惠券 API
  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/660/coupons?_page=${page}&_limit=${itemsPerPage}`);
      setCoupons(res.data);
      
      // 確保 `X-Total-Count` 存在
      const totalCount = res.headers['x-total-count'] ? parseInt(res.headers['x-total-count'], 10) : 0;
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
      
    } catch (error) {
      alertError(error.message || '無法獲取優惠券');
    } finally {
      setIsLoading(false);
    }
  };

  // 監聽 `currentPage` 變更時重新獲取優惠券
  useEffect(() => {
    getCoupons(currentPage);
  }, [currentPage]);

  // 監聽 `coupons` 變更時輸出 console（避免 state 更新延遲）
  useEffect(() => {
    console.log('coupons = ', coupons);
  }, [coupons]);

  return (
    <div>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <div className="d-flex justify-content-between align-items-center px-0 pb-10">
        <h2>管理優惠券</h2>
      </div>
      <div className="container mt-4 user-coupon mb-10">
        <div className="table-responsive">
          <table className="tabel w-100">
            <thead>
              <tr>
                <th className="ps-10 py-3">標題</th>
                <th className="p-3">優惠碼</th>
                <th className="p-3">到期日</th>
                <th className="p-3">折扣</th>
                <th className="p-3">狀態</th>
                <th className="p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  
                  <tr key={coupon.id}>
                    <td className="p-3">{coupon.title}</td>
                    <td className="p-3">{coupon.code}</td>
                    <td className="p-3">{coupon.due_date}</td>
                    <td className="p-3">{coupon.percent}%</td>
                    <td className="p-3">{coupon.is_enabled ? '啟用' : '禁用'}</td>
                    <td className="p-3">
                      <button
                        onClick={() => navigate('/product-list')}
                        className="px-3 py-1 bg-dark text-white rounded-1"
                      >
                        立即使用
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">目前沒有優惠券</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default UserCoupons;
