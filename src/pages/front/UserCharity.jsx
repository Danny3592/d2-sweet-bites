import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentForOneUser } from '../../slice/checkoutSlice';

const UserCharity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId') || 1;

  // 分頁資訊
  const parPage = 3; // 每頁顯示 3 個項目
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [charityItems, setCharityItems] = useState([]);

  // Redux 狀態
  const { payments, loader } = useSelector((state) => state.checkout);

  // 取得捐款資料
  useEffect(() => {
    if (payments.length < 1) {
      dispatch(getPaymentForOneUser({ userId, page: currentPage }));
    }
  }, [dispatch, payments.length, userId, currentPage]);

  // 處理捐款資料 & 分頁
  useEffect(() => {
    const charityItems = payments.flatMap((payment) =>
      payment.recentItems.filter((item) => item.isCharity === true),
    );

    const charityContents = charityItems.map((item) => ({
      ...item.charityContent,
    }));

    setCharityItems(charityContents);
    setTotalPages(Math.ceil(charityContents.length / parPage));
  }, [payments, parPage]);

  // 計算當前頁面的資料
  const startIndex = (currentPage - 1) * parPage;
  const displayedItems = charityItems.slice(startIndex, startIndex + parPage);

  return (
    <div>
      {loader && <Loading type="spin" color="#D4A58E" />}
      <div className="d-flex justify-content-between align-items-center px-0 pb-10">
        <h2>管理捐款</h2>
      </div>
      <div className="container mt-4 user-coupon mb-10">
        <table className="w-100">
          <thead>
            <tr>
              <th>捐款ID</th>
              <th>捐款金額</th>
              <th>捐款日期</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>NT${item.price}</td>
                  <td>{item.donationDate}</td>
                  <td>{item.paymentStatus ? '已完成' : '待確認'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  目前沒有捐款紀錄
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default UserCharity;
