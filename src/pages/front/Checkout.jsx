import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//Redux action
import { clearCheckoutItem } from '../../slice/checkoutSlice';
import { getCartList } from '../../slice/cartSlice';
import { makePayment } from '../../slice/checkoutSlice';

//Component
import Loading from '../../components/Loading';

const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //判斷是否是從"直接購買"進入
  const isDirectPurchase = location.state?.type === 'direct';

  //取得redux狀態
  const { checkoutItem, status } = useSelector((state) => state.checkout);
  const carts = useSelector((state) => state.cart.carts);

  //表單管理
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  //取得購物車資訊 & 卻保有商品可以結帳
  useEffect(() => {
    if (!isDirectPurchase && carts.length === 0) {
      dispatch(getCartList());
    }
    if (checkoutItem.length < 1 && isDirectPurchase) {
      navigate('/cart');
    }
    if (checkoutItem.length < 1 && carts.length < 1) {
      navigate('/cart');
    }
  }, [checkoutItem, navigate, dispatch, isDirectPurchase, carts.length]);

  //提交結帳表單
  const onSubmit = async () => {
    if (!checkoutItem && carts.length < 1) return;
    let recentItem;
    if (isDirectPurchase && checkoutItem) {
      recentItem = checkoutItem.map((item) => {
        return {
          productId: item.productId,
          qty: item.qty,
          price: item.price,
        };
      });
    } else {
      recentItem = carts.map((item) => {
        return {
          productId: item.productId,
          qty: item.qty,
          price: item.product.price,
        };
      });
    }
    const totalAmount = recentItem.reduce(
      (acc, item) => acc + item.qty * item.price,
      0,
    );
    try {
      dispatch(
        makePayment({
          userId: 1,
          recentItem,
          totalAmount,
        }),
      );
      dispatch(clearCheckoutItem());
      // navigate('/complete-order') 前往完成付款頁面
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
    const formattedValue = formatExpiryDate(e.target.value);
    setValue('validDate', formattedValue); // ✅ 手動更新表單值
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setValue('cardNumber', formattedValue);
  };

  return (
    <div className="checkout">
      {status === 'loading' && <Loading />}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 col-md-7 order-info mb-8">
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
                type="text"
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
                type="text"
                placeholder="電子郵件信箱"
                {...register('email', { required: '請輸入電子郵件' })}
              />
              {errors.email && (
                <p style={{ color: 'red' }}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="col-12 col-md-7 credit-card-info mb-8">
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
                  {...register('paymentMethod', { required: '請選擇付款方式' })}
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
                  {...register('paymentMethod', { required: '請選擇付款方式' })}
                  value="cash"
                />
                <label className="ms-5" htmlFor="is_cash">
                  貨到付款
                </label>
              </div>
            </div>

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
                    required: '請輸入有效的信用卡卡號',
                  })}
                  value={watch('cardNumber', '')}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                />
                {errors.cardNumber && (
                  <p style={{ color: 'red' }}>{errors.cardNumber.message}</p>
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
                    required: '請輸入信用卡的有效期限',
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
                  <p style={{ color: 'red' }}>{errors.validDate.message}</p>
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
                    required: '請輸入信用卡背面的安全碼（末三碼）',
                  })}
                />
                {errors.email && (
                  <p style={{ color: 'red' }}>{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-6 mb-6">
            <button type="submit" className="btn btn-primary">
              提交訂單
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
