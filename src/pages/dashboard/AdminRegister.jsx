import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAccount({
      ...account,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // 驗證密碼
    if (account.password !== account.confirmPassword) {
      alert("密碼與確認密碼不相符");
      return;
    }

    // 驗證是否勾選條款
    if (!account.agreeTerms) {
      alert("請先同意隱私政策與條款");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/register`, {
        username: account.username,
        email: account.email,
        password: account.password,
        role: ["admin"],
      })
      .then(() => {
        alert("註冊成功！請登入");
        navigate("/admin-login");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data || "註冊失敗，請檢查輸入資訊");
        } else {
          alert("伺服器錯誤，請稍後再試");
        }
      });
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center">
      <div className="position-absolute top-0 end-0 p-3">
        <a href="#/admin-login" className="text-muted">
          已經有帳戶？點此登入
        </a>
      </div>
      <div className="row justify-content-center w-100">
        <div className="col-md-4 col-10">
          <h2 className="text-center mb-4 text-start">創建您的管理者帳戶</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                用戶名
              </label>
              <input
                value={account.username}
                onChange={handleInputChange}
                id="username"
                name="username"
                type="text"
                className="form-control"
                placeholder="請輸入用戶名"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={account.email}
                onChange={handleInputChange}
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="請輸入您的郵件信箱"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                密碼
              </label>
              <input
                value={account.password}
                onChange={handleInputChange}
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="************"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                確認密碼
              </label>
              <input
                value={account.confirmPassword}
                onChange={handleInputChange}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="************"
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              註冊
            </button>
            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeTerms"
                name="agreeTerms"
                checked={account.agreeTerms}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                我同意 <a href="#/privacy-policy">隱私政策與條款</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
