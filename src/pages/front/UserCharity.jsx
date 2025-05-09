import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { getPaymentForOneUser } from '@/slice/checkoutSlice';

const UserCharity = () => {

  
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId') || 1;

  // 分頁資訊
  const parPage = 10; // 每頁顯示 3 個項目
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [charityItems, setCharityItems] = useState([]);

  // Redux 狀態
  const { payments, loader } = useSelector((state) => state.checkout);
  const userInfo = useRef({});

  // 取得捐款資料
  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo.current?.id){
      if (payments.length < 1) {
        dispatch(getPaymentForOneUser({ userId:userInfo.current?.id, page: currentPage }));
      }
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
        <div className="table-responsive">
          <table className="tabel w-100">
            <thead>
              <tr>
                <th className="ps-10 py-3">捐款ID</th>
                <th className="p-3">捐款金額</th>
                <th className="p-3">捐款日期</th>
                <th className="p-3">狀態</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.length > 0 ? (
                displayedItems.map((item) => {
                  const formattedPrice = item.price.toLocaleString('zh-TW', {
                    style: 'currency',
                    currency: 'TWD',
                    minimumFractionDigits: 0,
                  });
                  return (
                    <tr key={item.id}>
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">NT{formattedPrice}</td>
                      <td className="p-3">{item.donationDate}</td>
                      <td className="p-3">{item.paymentStatus ? '已完成' : '待確認'}</td>
                    </tr>
                  );
                })
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
