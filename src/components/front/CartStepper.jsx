import PropTypes from 'prop-types';
export default function CartStepper({ active }) {
  const steps = [
    "1. 確認訂單",
    "2. 使用優惠券",
    "3. 填寫訂單資訊"
  ]
  return (
    <div className="row gx-3 d-none d-md-flex">
      { steps.map((step, index) => (
        <div className="col"
          key={step}>
          <div className={`alert ${active === index + 1 ? 'bg-primary-500 text-light' : 'alert-dark'}`}
            role="alert">
            { step }
          </div>
        </div>
      )) }
    </div>
  )
}

CartStepper.propTypes = {
  active: PropTypes.number,
}
