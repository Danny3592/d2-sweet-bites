import { Outlet, useNavigate } from "react-router-dom";
import mainLogo from '../../assets/images/user/main-logo.svg'
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/authSlice";
import { setCarts } from "../../slice/cartSlice";

export default function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('dessertToken='))
  ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCarts([])); // 清空購物車
    navigate('/')
  };

  return (
    <>
      <div className="position-fixed top-0 start-0 vh-100 bg-primary p-10">
        <img src={mainLogo} alt="main-logo" className="mb-15"/>
        <ul className="list-unstyled">
          <li className="my-5">
            <NavLink className="fs-6">
              我的訂單
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6">
              我的收藏
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6">
              查看優惠券
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6">
              查看捐款紀錄
            </NavLink>
          </li>
          <li className="my-5">
            <NavLink className="fs-6">
              編輯個人資訊
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="min-vh-100 bg-primary-50 p-15"
        style={{
        marginLeft: '240px',
      }}>
        <div className="d-flex justify-content-end mb-10">
          <button className="btn btn-primary py-3"
            onClick={handleLogout}>登出</button>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
