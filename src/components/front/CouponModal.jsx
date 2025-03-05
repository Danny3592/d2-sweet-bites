import { useState } from "react"

export default function CouponModal({ modalRef, coupons, closeCouponModal, setCouponCode }) {
  const [selectCoupon, setSelectCoupon] = useState('');
  const applyCoupon = () => {
    setCouponCode(selectCoupon);
    closeCouponModal();
  }
  return (
    <div className="modal fade" tabIndex="-1"
      ref={modalRef}>
      <div className="modal-dialog">
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
              <div className="form-check d-flex align-items-center"
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
                  <div className="card mb-3">
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
