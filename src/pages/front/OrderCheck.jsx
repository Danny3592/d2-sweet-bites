import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { getCartList } from '../../slice/cartSlice';
import { getCouponList } from '../../slice/couponSlice';
import { Modal } from 'bootstrap';
import CouponModal from '../../components/front/CouponModal';

import continueshopping from '../../assets/images/icons/chevron-left.svg';
import { useNavigate, Link } from 'react-router-dom';

export default function OrderCheck() {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState(''); // 優惠券輸入
  const [discount, setDiscount] = useState(0); // 優惠折扣
  const [error, setError] = useState(''); // 優惠券錯誤訊息
  const userInfo = useRef({});
  const carts = useSelector((state) => {
    return state.cart.carts;
  });
  const cartStatus = useSelector((state) => {
    return state.cart.status;
  });
  const dispatch = useDispatch();

  // 選擇優惠券
  const coupons = useSelector((state) => {
    return state.coupon.coupons;
  });
  const couponModal = useRef(null);
  const modalRef = useRef(null);

  const openCouponModal = () => {
    couponModal.current.show();
  }

  const closeCouponModal = () => {
    couponModal.current.hide();
  }

  useEffect(() => {
    couponModal.current = new Modal(modalRef.current, {
      backdrop: 'static'
    });
    dispatch(getCouponList());
  }, [dispatch]);

  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.current?.id) {
      dispatch(getCartList(userInfo.current.id));
    }

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [dispatch])

  const applyCoupon = async () => {
    setError(''); // 清除錯誤訊息
    try {
      const res = await axios.get(`/coupons?code=${couponCode}`);
      const coupons = res.data; // 後端回傳優惠券陣列
      coupons;

      const validCoupon = coupons.find(
        (coupon) => coupon.code === couponCode && coupon.is_enabled === 1
      );

      if (validCoupon) {
        const discountAmount = Math.round((totalPrice * ( 100 - validCoupon.percent)) / 100);
        setDiscount(discountAmount);
      } else {
        setError('優惠券不存在或不可用');
        setDiscount(0);
      }
    } catch (err) {
      setError('優惠券驗證失敗');
      setDiscount(0);
    }
  };

  const totalPrice = carts.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  );
  const finalPrice = Math.max(totalPrice - discount, 0); // 確保不會低於0

  function handleCheckout() {
    navigate('/checkout', {
      state: {
        type: 'carts',
        totalPrice: totalPrice,
        discount: discount,
        finalPrice: finalPrice,
      },
    });
  }

  return (
    <>
      {cartStatus === 'loading' && <Loading type="spin" color="#D4A58E" />}
      <div className="cart-page pb-md-33 pb-18">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link
                to="/cart"
                className="continue-shopping text-gray-600 text-decoration-none d-flex align-items-center w-25 my-4 my-md-19"
              >
                <img
                  src={continueshopping}
                  alt="Back"
                  className="me-1 back-icon"
                  width="16"
                  height="16"
                />
                返回購物車
              </Link>
            </div>
          </div>

          <div className="row ">
            {/* 購物車列表 */}
            <div className="col-12 col-md-7">
              <div className="cart-section mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0 text-dark fs-5">我的購物車</h5>
                    </div>
                    {carts.map((cart, index) => (
                      <div
                        key={cart.id}
                        className={`d-flex justify-content-between align-items-center py-3
                            ${
                              index !== carts.length - 1 ? 'border-bottom' : ''
                            }`}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={cart.product.imageUrl}
                            alt="圖片"
                            className="cart-item-image me-3"
                          />
                          <div>
                            <h6 className="mb-3 text-dark">
                              {cart.product.title}
                            </h6>
                            <div className="input-group input-group-sm">
                              <p>數量: {cart.qty}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <h6 className="mb-3 text-primary-800">
                            NT${cart.product.price}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 優惠券區塊 */}
              <div className="coupon-section mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-md-flex justify-content-between align-items-center">  
                      <h5 className="mb-6 text-dark fs-5">
                        輸入優惠券，享受甜蜜折扣!
                      </h5>
                      <button type="button"
                        className='btn p-0'
                        onClick={openCouponModal}>
                        選擇優惠券
                      </button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-6">
                      <input
                        type="text"
                        className="form-control w-75"
                        placeholder="輸入優惠券"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        className="btn btn-primary rounded-3 text-white py-3"
                        onClick={applyCoupon}
                      >
                        立即使用
                      </button>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    {discount > 0 && (
                      <p className="text-success mt-2">
                        折扣已套用: -NT${discount}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 訂單摘要 */}
            <div className="col-12 col-md-5">
              <div className="cart-summary mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="mb-3 text-dark fs-5">訂單明細</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between border-bottom-0">
                        <span className="text-dark">訂單總計</span>
                        <strong>
                          <span className="fs-7 text-primary-800">NT$</span>
                          <span className="fs-6 text-primary-800">
                            {totalPrice}
                          </span>
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between border-bottom-0">
                        <span className="text-dark">優惠券</span>
                        <span>-NT${discount}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span className="text-dark">運費</span>
                        <span className="text-primary-800">免運</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <strong className="text-dark">應付金額</strong>
                        <strong>
                          <span className="fs-5 text-primary-800">NT$</span>

                          <span className="fs-3 text-primary-800">
                            {finalPrice}
                          </span>
                        </strong>
                      </li>
                    </ul>
                    <button
                      className="btn btn-danger w-100 mt-3 custom-button"
                      type="button"
                      disabled={!carts.length}
                      onClick={handleCheckout}
                    >
                      確認訂單
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CouponModal modalRef={modalRef}
        coupons={coupons}
        closeCouponModal={closeCouponModal}
        setCouponCode={setCouponCode}/>
    </>
  );
}
