import React from 'react';

const Notification = ({text}) => {
  return (
    <>
    <div className="notification-desktop d-none d-lg-block">
      <div className="notification-box">
        <div className="circle">
          <div className="tick">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
        <div className="text">商品已保存至您的收藏清單</div>
      </div>
    </div>
    <div className="notification notification-phone d-block d-lg-none">
      <div className="notification-box">
        <div className="circle">
          <div className="tick">
            <i className="fa-solid fa-check fs-6"></i>
          </div>
        </div>
        <div className="text fs-6">{text}</div>
      </div>
    </div>
    </>
    
  );
};

export default Notification;
