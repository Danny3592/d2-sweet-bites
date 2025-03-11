import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  // 取出 token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("dessertToken="))
    ?.split("=")[1];
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // 沒有 token，跳回登入頁
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    }
  }, [token, navigate]);

  const logOut = () => {
    document.cookie = "dessertToken=; path=/;";
    navigate("/admin-login");
  }

  return (
    <>
      <div className="admin__container">
        <aside className="admin__sidebar">
          <h2 className="m-dec-left mb-10">幸享屋</h2>
          <ul className="ps-0">
            <li className="active0">
              <NavLink to="/dashboard/order" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">管理訂單</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">管理商品</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/users" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">管理使用者</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/coupon" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">管理優惠券</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/news" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">管理最新消息</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/donate" className="border-0">
                <div className="menu-item">
                  <svg
                    enableBackground="new 0 0 64 64"
                    height="64"
                    viewBox="0 0 64 64"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="menu-icon"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeMiterlimit="10"
                      strokeWidth="2"
                    >
                      <path d="m1 16h52v40h-52z" />
                      <path d="m10 14v-6h53v40h-8" />
                      <path d="m1 46 14-14 14 16 10-6 14 12" />
                      <circle cx="40" cy="29" r="5" />
                    </g>
                  </svg>
                  <span className="menu-text">查看捐款</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className="admin__box">
          <header className="admin__header">
            <div className="logout-box">
              <button className="btn-logout"
                onClick={logOut}
                type="button">
                登出
              </button>
            </div>
          </header>
          <main className="admin__content">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
