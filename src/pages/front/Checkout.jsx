import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

//Redux action
import { clearCheckoutItem, clearMsg } from '../../slice/checkoutSlice';
import { deleteAllCart, getCartList } from '../../slice/cartSlice';
import { makePayment } from '../../slice/checkoutSlice';

//Component
// import Loading from '../../components/Loading';
import continueshopping from '../../assets/images/icons/chevron-left.svg';
import axios from 'axios';

//Utilities
import { generateRandomID } from '../../../util/http';

const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfoId = useRef({});

  //判斷是否是從"直接購買"進入
  const isDirectPurchase = location.state?.type === 'direct';

  //接收訂單確認傳過來的折扣與價格
  const totalPrice = location.state?.totalPrice;
  const discount = location.state?.discount;
  const finalPrice = location.state?.finalPrice;
  const [orderId, setOrderId] = useState('');

  //取得redux狀態
  const { checkoutItem, successMsg } = useSelector((state) => state.checkout);
  const carts = useSelector((state) => state.cart.carts);

  //表單管理
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const paymentMethod = watch('paymentMethod'); // 監聽付款方式

  useEffect(() => {
    if (paymentMethod !== 'creditcard') {
      // 當付款方式不是信用卡時，清空信用卡相關欄位
      setValue('cardNumber', '');
      setValue('validDate', '');
      setValue('CVC', '');
    }
  }, [paymentMethod, setValue]);

  let token;
  useEffect(() => {
    if (!token) {
      token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('dessertToken='))
        ?.split('=')[1];
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  //取得購物車資訊 & 卻保有商品可以結帳
  useEffect(() => {
    userInfoId.current = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfoId.current?.id) {
      if (!isDirectPurchase && carts.length === 0) {
        dispatch(getCartList(userInfoId.current.id));
      }
    }

    if (checkoutItem.length < 1 && (isDirectPurchase || carts.length < 1)) {
      navigate('/cart');
    }
  }, [checkoutItem, navigate, dispatch, isDirectPurchase, carts.length]);

  //如果結帳成功，清除購物車
  useEffect(() => {
    async function checkout() {
      if (successMsg === 'make payment success') {
        dispatch(clearCheckoutItem());
        dispatch(deleteAllCart());
        dispatch(getCartList(userInfoId.current?.id)); // 重新獲取購物車數據
        await dispatch(clearMsg());

        navigate('/order-complete', {
          state: {
            orderId: orderId,
          },
        }); //前往完成付款頁面
      }
    }

    checkout();
  }, [successMsg, dispatch, navigate, orderId]);

  //提交結帳表單
  const onSubmit = async (userInfo) => {
    let displayOrderId, recentItems;
    try {
      if (!checkoutItem && carts.length < 1) return;
      if (isDirectPurchase && checkoutItem) {
        recentItems = checkoutItem.map((item) => {
          return {
            productId: item.productId,
            qty: item.qty,
            price: item.price,
          };
        });
      } else {
        recentItems = carts.map((item) => {
          return {
            productId: item.productId,
            qty: item.qty,
            price: item.product.price,
          };
        });
      }
      const totalAmount = finalPrice;

      userInfo.isPaid = userInfo.paymentMethod === 'credit-card' ? true : false;
      const dateFormat = new Date()
        .toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '/');

      setOrderId(() => {
        displayOrderId = generateRandomID('order', dateFormat);
        return displayOrderId;
      });

      const charityItems = await axios.get('/products?category=慈善');
      const charityId = await charityItems.data.map((item) => item.id);

      recentItems = recentItems.map((item) => {
        if (charityId.includes(item.productId)) {
          return {
            ...item,
            isCharity: true,
            charityContent: {
              id: generateRandomID('charity'),
              price: item.price * item.qty,
              donationDate: dateFormat,
              paymentStatus: userInfo.isPaid,
            },
          };
        }
        return { ...item, isCharity: false };
      });
      dispatch(
        makePayment({
          userId: userInfoId.current.id,
          displayOrderId,
          recentItems,
          totalAmount,
          userInfo: userInfo,
          date: dateFormat,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '') // 移除所有非數字
      .replace(/(\d{2})(\d{0,2})/, '$1/$2') // 前兩個數字後面加 "/"
      .trim(); // 避免最後有多餘空格
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value).slice(0, 5);
    setTimeout(() => {
      setValue('validDate', formattedValue);
    }, 0);
  };

  const handleCardNumberChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ''); // 移除非數字
    rawValue = rawValue.slice(0, 16); // 限制最多 16 位數（信用卡號）

    let formattedValue = rawValue.replace(/(\d{4})/g, '$1 ').trim(); // 每 4 位數加空格
    setTimeout(() => {
      setValue('cardNumber', formattedValue);
    }, 0);
  };

  return (
    <div className="checkout">
      {/* {status === 'loading' && <Loading type="spin" color="#D4A58E" />} */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Link
              to="/order-check"
              className="continue-shopping text-gray-600 text-decoration-none d-flex align-items-center w-25 my-4 my-md-19"
            >
              <img
                src={continueshopping}
                alt="Back"
                className="me-1 back-icon"
                width="16"
                height="16"
              />
              返回訂單確認
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="order-info bg-white mb-8">
                <h3 className="mb-10">填寫訂購資訊</h3>
                <div className="d-flex flex-column mb-6">
                  <label className="mb-5" htmlFor="name">
                    訂購人/收件人姓名
                  </label>
                  <input
                    className="input py-3 ps-3"
                    id="name"
                    type="text"
                    placeholder="名字"
                    {...register('name', { required: '名字不可留空' })}
                  />
                  {errors.name && (
                    <p style={{ color: 'red' }}>{errors.name.message}</p>
                  )}
                </div>

                <div className="d-flex flex-column mb-6">
                  <label className="mb-5" htmlFor="address">
                    寄送地址
                  </label>
                  <input
                    className="input py-3 ps-3"
                    id="address"
                    type="text"
                    placeholder="住址"
                    {...register('address', { required: '請填寫寄送地址' })}
                  />
                  {errors.address && (
                    <p style={{ color: 'red' }}>{errors.address.message}</p>
                  )}
                </div>

                <div className="d-flex flex-column mb-6">
                  <label className="mb-5" htmlFor="tel">
                    聯絡電話
                  </label>
                  <input
                    className="input py-3 ps-3"
                    id="tel"
                    type="number"
                    placeholder="聯絡電話"
                    {...register('tel', { required: '請提供聯絡電話' })}
                  />
                  {errors.tel && (
                    <p style={{ color: 'red' }}>{errors.tel.message}</p>
                  )}
                </div>

                <div className="d-flex flex-column mb-6">
                  <label className="mb-5" htmlFor="email">
                    電子郵件信箱
                  </label>
                  <input
                    className="input py-3 ps-3"
                    id="email"
                    type="email"
                    placeholder="電子郵件信箱"
                    {...register('email', { required: '請輸入電子郵件' })}
                  />
                  {errors.email && (
                    <p style={{ color: 'red' }}>{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="credit-card-info bg-white mb-8">
                <h3 className="mb-10">付款方式</h3>
                {errors.paymentMethod && (
                  <p style={{ color: 'red' }}>{errors.paymentMethod.message}</p>
                )}
                <div className="d-flex">
                  <div className="mb-5 d-flex align-items-center">
                    <input
                      type="radio"
                      id="is_creditcard"
                      className="input-radio"
                      {...register('paymentMethod', {
                        required: '請選擇付款方式',
                      })}
                      value="creditcard"
                    />
                    <label className="ms-5" htmlFor="is_creditcard">
                      信用卡付款
                    </label>
                  </div>

                  <div className="mb-5 d-flex align-items-center ms-5">
                    <input
                      type="radio"
                      id="is_cash"
                      className="input-radio"
                      {...register('paymentMethod', {
                        required: '請選擇付款方式',
                      })}
                      value="cash"
                    />
                    <label className="ms-5" htmlFor="is_cash">
                      貨到付款
                    </label>
                  </div>
                </div>

                {paymentMethod === 'creditcard' && (
                  <div className="d-flex gap-3">
                    <div className="d-flex flex-column mb-6 card-number">
                      <label className="mb-5" htmlFor="card-number">
                        信用卡卡號
                      </label>
                      <input
                        className="input py-3 ps-3 "
                        id="card-number"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        {...register('cardNumber', {
                          required:
                            paymentMethod === 'creditcard'
                              ? '請輸入有效的信用卡卡號'
                              : false,
                        })}
                        value={watch('cardNumber', '')}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                      />
                      {errors.cardNumber && (
                        <p style={{ color: 'red' }}>
                          {errors.cardNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="d-flex flex-column mb-6 valid-date">
                      <label className="mb-5" htmlFor="valid-date">
                        有效期限（月/年）
                      </label>
                      <input
                        className="input py-3 ps-3"
                        id="valid-date"
                        type="text"
                        placeholder="MM/YY"
                        {...register('validDate', {
                          required:
                            paymentMethod === 'creditcard'
                              ? '請輸入信用卡的有效期限'
                              : false,
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: '格式錯誤，請輸入 MM/YY，例如 04/25',
                          },
                        })}
                        value={watch('validDate', '')}
                        onChange={handleExpiryDateChange}
                        maxLength="5"
                      />
                      {errors.validDate && (
                        <p style={{ color: 'red' }}>
                          {errors.validDate.message}
                        </p>
                      )}
                    </div>

                    <div className="d-flex flex-column mb-6 CVC">
                      <label className="mb-5" htmlFor="CVC">
                        背面末3碼
                      </label>
                      <input
                        maxLength="3"
                        className="input py-3 ps-3"
                        id="CVC"
                        type="text"
                        placeholder="CVC"
                        {...register('CVC', {
                          required:
                            paymentMethod === 'creditcard'
                              ? '請輸入信用卡背面的安全碼（末三碼）'
                              : false,
                        })}
                      />
                      {errors.CVC && (
                        <p style={{ color: 'red' }}>{errors.CVC.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-6 mb-6">
                <button type="submit" className="btn btn-primary">
                  提交訂單
                </button>
              </div>
            </form>
          </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
