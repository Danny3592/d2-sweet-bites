import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLayout from './../../../components/AdminLayout';

const MemberCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getCoupons() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('/coupons'); // 修正 API 錯誤
        setCoupons(res.data);
      } catch (error) {
        console.error('獲取優惠券失敗: ', error);
        setError('無法加載優惠券，請稍後再試');
      } finally {
        setLoading(false);
      }
    }
    getCoupons();
  }, []);

  return (
    <div className="member-coupon">
      <div className="admin__container">
        <aside className="admin__sidebar">
          <h2 className="m-dec-left mb-10">幸享屋</h2>
          <ul className="ps-0">
            <li className="active">
              <a href="#">
                <div className="menu-item">
                  <span className="menu-text">管理訂單</span>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="menu-item">
                  <span className="menu-text">管理優惠券</span>
                </div>
              </a>
            </li>
          </ul>
        </aside>
        <div className="admin__box">
          <header className="admin__header">
            <div className="logout-box">
              <button className="btn-logout">登出</button>
            </div>
          </header>

          {loading && <p>載入中...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>標題</th>
                  <th>優惠碼</th>
                  <th className="px-5">到期日</th>
                  <th>折扣</th>
                  <th>狀態</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id || coupon.code}>
                    <td>{coupon.title}</td>
                    <td className="px-5">{coupon.code}</td>
                    <td>{coupon.due_date}</td>
                    <td>{coupon.percent}%</td>
                    <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => alert(`使用優惠碼: ${coupon.code}`)}
                      >
                        立即使用
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCoupons;
