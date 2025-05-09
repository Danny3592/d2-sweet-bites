import axios from 'axios';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import mainLogo from '@/assets/images/user/main-logo.svg';
import TheHeader from '@/components/TheHeader.jsx';
import { useDispatch } from 'react-redux';
import { logout } from '@/slice/authSlice';
import { setCarts } from '@/slice/cartSlice';

export default function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('dessertToken='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCarts([])); // 清空購物車
    navigate('/');
  };

  return (
    <>
      <div className="d-lg-none">
        <TheHeader />
      </div>
      <div className="position-fixed top-0 start-0 vh-100 bg-primary p-10 d-none d-lg-block">
        <NavLink className="fs-6" to="/">
          <img src={mainLogo} alt="main-logo" className="mb-15" />
        </NavLink>
        <ul className="list-unstyled">
          <li className="my-5">
            <NavLink className="fs-6"
              to="/user/orders">
              我的訂單
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6" to="/user/favorite">
              我的收藏
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6" to="/user/coupon">
              查看優惠券
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6" to="/user/charity">
              查看捐款紀錄
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6" to="/user/profile">
              編輯個人資訊
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className="user-layout min-vh-100 bg-primary-50 py-4 px-3 p-lg-15"
      >
        <div className="d-flex justify-content-end mb-10">
          <button className="btn btn-primary py-3" onClick={handleLogout}>
            登出
          </button>
        </div>
        <div className="container mb-8">
          <h2 className='fs-6 mb-4 text-primary fw-bold d-lg-none'>會員中心</h2>
          <ul className='list-unstyled row d-lg-none'>
            <li className='col-12 my-2'>
              <NavLink to="/user/orders"
                className="link-text">
                我的訂單
              </NavLink>
            </li>
            <li className='col-12 my-2'>
              <NavLink to="/user/favorite"
                className="link-text">
                我的收藏
              </NavLink>
            </li>
            <li className='col-12 my-2'>
              <NavLink to="/user/coupon"
                className="link-text">
                我的優惠券
              </NavLink>
            </li>
            <li className='col-12 my-2'>
              <NavLink to="/user/charity"
                className="link-text">
                捐款紀錄
              </NavLink>
            </li>
            <li className='col-12 my-2'>
              <NavLink to="/user/profile"
                className="link-text">
                編輯個人資訊
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
