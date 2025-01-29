import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [isAuth, setIsAuth] = useState(false);

  const [account, setAccount] = useState({
    email: "example@test.com",
    password: "example",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    //console.log(e.target.value);
    //console.log(e.target.name);
    const { value, name } = e.target;

    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    //console.log(account);
    //console.log(import.meta.env.VITE_BASE_URL);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/login`, account)
      .then((res) => {
        const { accessToken, expired } = res.data;
        console.log(accessToken, expired);

        document.cookie = `accessToken=${accessToken}; expires=${new Date(
          expired
        )}`;

        setIsAuth(true);
        navigate("/dashboard");
      })
      .catch((error) => alert("登入失敗"));
  };

  return (
    <>
      {isAuth ? (
        <p>logged</p>
      ) : (
        <div className="container vh-100 d-flex flex-column justify-content-center">
          <div className="position-absolute top-0 end-0 p-3">
            <a href="#/admin-register" className="text-muted">
              還沒有帳號？立即註冊
            </a>
          </div>
          <div className="row justify-content-center w-100">
            <div className="col-md-4 col-10">
              <h2 className="text- mb-4">管理者後台登入</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    value={account.username}
                    onChange={handleInputChange}
                    id="username"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="example@test.com"
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
                    placeholder="example"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  登入
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default AdminLogin;
