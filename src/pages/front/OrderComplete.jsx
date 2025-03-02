import { useLocation, Link } from 'react-router-dom';
import background from '../../assets/images/index-charity/section04_background.png';

export default function OrderComplete() {
  const location = useLocation();
  //取得傳入的訂單編號
  const orderId = location.state?.orderId;

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '1200px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="container pt-40">
          <div className="row justify-content-center align-items-center">
            <div className="col bg-white d-flex flex-column justify-content-center align-items-center rounded-4 py-20">
              <h2 className="text-black">感謝選擇我們，幸福即將送達!</h2>
              <h3 className="text-black pt-12">訂單編號: {orderId}</h3>
              <p className='text-center pt-12 w-75'>
                您的訂單已成功完成，我們已收到您的付款！每一份甜點都承載著我們的用心與對幸福的詮釋。感謝您信任我們的美味，我們將精心準備，讓這份甜蜜儘快送到您的手中。訂單詳情與確認信已發送至您的電子郵件，請留意查收。如有任何問題，歡迎隨時聯繫我們的客服團隊。我們期待再次為您帶來更多美好滋味！
              </p>
              <Link className='btn btn-primary text-white rounded-3 mt-12' to="/">回到首頁</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
