import PropTypes from 'prop-types';

const NotificationBox = ({ iconClass, textClass, text }) => {
  return (
    <div className="notification-box">
      <div className="circle">
        <div className="tick">
          <i className={`fa-solid fa-check ${iconClass}`} />
        </div>
      </div>
      <div className={`text ${textClass}`}>{text}</div>
    </div>
  );
};

const Notification = ({ text }) => {
  return (
    <>
      {/* 桌機版通知 */}
      <div className="notification-desktop d-none d-lg-block">
        <NotificationBox 
          iconClass=""   // 桌機的 icon 不需要加大字體
          textClass=""   // 桌機的字體大小維持預設
          text={text}
        />
      </div>

      {/* 手機版通知 */}
      <div className="notification notification-phone d-block d-lg-none">
        <NotificationBox 
          iconClass="fs-6"   // 手機 icon 字體要小一點
          textClass="fs-6"   // 手機文字也要小一點
          text={text}
        />
      </div>
    </>
  );
};

export default Notification;

NotificationBox.propTypes = {
  iconClass: PropTypes.string,
  textClass: PropTypes.string,
  text: PropTypes.string,
}

Notification.propTypes = {
  text: PropTypes.string
}
