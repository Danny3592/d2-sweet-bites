import PropTypes from 'prop-types';
import { useState } from "react"
import { compareDateExpired } from "../../../util/tools";

export default function CouponModal({ modalRef, coupons, closeCouponModal, setCouponCode }) {
  const [selectCoupon, setSelectCoupon] = useState('');
  const applyCoupon = () => {
    setCouponCode(selectCoupon);
    closeCouponModal();
  }
  return (
    <div className="modal fade" tabIndex="-1"
      ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title fs-5 noto-sans-tc">
              幸享屋優惠券
            </h3>
            <button type="button"
              className="btn-close"
              onClick={closeCouponModal}
              aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            { coupons.map(coupon => (
              <div className="form-check d-flex align-items-center position-relative mb-3"
                key={coupon.id}>
                <input className="form-check-input me-3"
                  type="radio"
                  name={coupon.code}
                  value={coupon.code}
                  id={coupon.code}
                  checked={selectCoupon === coupon.code}
                  onChange={(e) => setSelectCoupon(e.target.value)}/>
                <label className="form-check-label flex-grow-1 d-block cursor-pointer"
                  htmlFor={coupon.code}>
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-4">
                        <div className="p-5 d-flex flex-column justify-content-center align-items-center bg-primary text-light h-100">
                          <p className='mb-2'>{ coupon.title }</p>
                          <p>{ coupon.percent / 10 } 折</p>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="card-body">  
                          <p className="card-text mb-2">適用所有商品</p>
                          <p className="card-text">
                            有效期限: {coupon.due_date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
                { compareDateExpired(coupon.due_date) && (
                  <div className="position-absolute top-0 start-0 bottom-0 end-0 d-flex justify-content-center align-items-center"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                      }}>
                    <p className="text-light fs-6">已過期</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="button"
              className="btn btn-primary py-2"
              disabled={!selectCoupon}
              onClick={applyCoupon}>
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

CouponModal.propTypes = {
  modalRef: PropTypes.object,
  coupons: PropTypes.object,
  closeCouponModal: PropTypes.func,
  setCouponCode: PropTypes.func
}
