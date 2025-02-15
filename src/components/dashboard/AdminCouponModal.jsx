import { useState, useEffect } from "react";
import axios from "axios";
import { toastAlert, alertError } from "../../../util/sweetAlert";
import { checkInputFill } from "../../../util/tools";
export default function AdminCouponModal({ modalRef, closeCouponModal, getCoupons, type, tempCoupon, currentPage }) {
  const [tempData, setTempData] = useState({
    title: "", //優惠券名稱
    is_enabled: 1, // 是否啟用
    percent: 80,   // 折扣比率
    due_date: "", // 到期日
    code: "", // 折扣碼
  });

  const isInputFilled = checkInputFill(tempData, ['title', 'percent', 'due_date', 'code']);

  useEffect(() => {
    if(type === 'create') {
      setTempData({
        title: "", //優惠券名稱
        is_enabled: 1, // 是否啟用
        percent: 80,   // 折扣比率
        due_date: "", // 到期日
        code: "", // 折扣碼
      })
    } else if (type === 'edit') {
      setTempData(tempCoupon);
    }
  }, [type, tempCoupon])

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['percent'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: parseInt(value),
      })
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked,
      })
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      })
    }
  }

  const submit = async () => {
    let apiPath = '/660/coupons';
    let apiMethod = 'post';
    let message = '新增優惠券成功';
    if (type === 'edit') {
      apiPath = `/660/coupons/${tempData.id}`;
      apiMethod = 'put';
      message = '編輯優惠券成功';
    }
    try {
      await axios[apiMethod](apiPath, tempData);
      toastAlert(message);
      closeCouponModal();
      getCoupons(currentPage);
    } catch (error) {
      alertError(error.message);
    }
  }

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      ref={modalRef}
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新優惠券' : `編輯: ${tempData.title}` }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeCouponModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <div className='form-group'>
                  <label className='w-100 mb-3' htmlFor='title'>
                    名稱 <span className="text-danger">(必填)</span>
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入優惠券名稱'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
              </div>
              <div className='col-md-6 mb-2'>
                <div className='form-group'>
                  <label className='w-100 mb-3' htmlFor='code'>
                    折扣碼 <span className="text-danger">(必填)</span>
                    <input
                      type='text'
                      id='code'
                      name='code'
                      placeholder='請輸入折扣碼'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.code}
                    />
                  </label>
                </div>
              </div>
              <div className='col-md-6 mb-2'>
                <div className='form-group'>
                  <label className='w-100 mb-3' htmlFor='percent'>
                    折扣比率 <span className="text-danger">(必填)</span>
                    <input
                      type='number'
                      id='percent'
                      name='percent'
                      placeholder='請輸入優惠券折扣比率'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.percent}
                    />
                  </label>
                </div>
              </div>
              <div className='col-md-6 mb-2'>
                <div className='form-group'>
                  <label className='w-100 mb-3' htmlFor='due_date'>
                    到期日 <span className="text-danger">(必填)</span>
                    <input
                      type='date'
                      id='due_date'
                      name='due_date'
                      min={new Date().toISOString().split('T')[0]}
                      placeholder='請輸入優惠券到期日'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.due_date}
                    />
                  </label>
                </div>
              </div>
              <div className='form-group mb-2'>
                <div className='form-check'>
                  <label
                    className='w-100 form-check-label'
                    htmlFor='is_enabled'
                  >
                    是否啟用
                    <input
                      type='checkbox'
                      id='is_enabled'
                      name='is_enabled'
                      placeholder='請輸入產品說明內容'
                      className='form-check-input'
                      onChange={handleChange}
                      checked={tempData.is_enabled}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary py-2'
              onClick={closeCouponModal}>
              關閉
            </button>
            <button type='button'
              className='btn btn-primary py-2'
              disabled={!isInputFilled}
              onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}