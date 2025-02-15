import { TiTick } from 'react-icons/ti';

const CharityCard = ({ title, price, img, setOrder, order, id }) => {
  function handleOrder(planId) {
    let newPlan;
    const planIsPicked = order.charityPlan.find((item) => planId === item);
    if (planIsPicked) {
      newPlan = order.charityPlan.filter((item) => item !== planIsPicked);
    } else {
      newPlan = [...order.charityPlan, planId];
    }
    setOrder(() => {
      return { ...order, charityPlan: newPlan };
    });
  }
  return (
    <>
      <div
        className="check-box position-relative d-none d-sm-block"
        onClick={() => handleOrder(id)}
        style={{ cursor: 'pointer' }}
      >
        {order.charityPlan.find((item) => id === item) && (
          <TiTick
            className="position-absolute"
            style={{
              color: 'red',
              fontSize: '40px',
              top: '-10px',
              left: '-8px',
            }}
          />
        )}
      </div>

      
        <div style={{ height: '100px', width: '150px' }}>
          <img src={img} alt="" className="charity-img" />
        </div>
        <div className="h-100 d-flex flex-column justify-content-between">
          <p className="text-dark mb-6 fs-6">{title}</p>
          <p className="text-primary fs-6">
            <span className="fs-7 me-1">NT$</span>
            {price}
          </p>
        </div>
        <div
          className="check-box position-relative d-block d-sm-none m-0"
          onClick={() => handleOrder(id)}
          style={{ cursor: 'pointer' }}
        >
          {order.charityPlan.find((item) => id === item) && (
            <TiTick
              className="position-absolute"
              style={{
                color: 'red',
                fontSize: '40px',
                top: '-10px',
                left: '-8px',
              }}
            />
          )}
        </div>
      
    </>
  );
};

export default CharityCard;
