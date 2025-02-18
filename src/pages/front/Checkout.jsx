import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const Checkout = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/我該去哪裡勒~', {
        data,
      });
      console.log(res);
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
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 col-md-7 order-info mb-8">
            <h3 className="mb-10">填寫訂購資訊</h3>
            <div className="d-flex flex-column mb-6">
              <label className="mb-5" htmlFor="name">
                訂購人/收件人姓名
              </label>
              <input
                className="py-3 ps-3"
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
                className="py-3 ps-3"
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
                className="py-3 ps-3"
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
                className="py-3 ps-3"
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
            <div className="d-flex gap-3">
              <div className="d-flex flex-column mb-6 card-number">
                <label className="mb-5" htmlFor="card-number">
                  信用卡卡號
                </label>
                <input
                  className="py-3 ps-3"
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
                  className="py-3 ps-3"
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
                  className="py-3 ps-3"
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
