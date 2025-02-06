import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AdminLogin() {
  const [isAuth, setIsAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      const { accessToken, expired } = res.data;
      document.cookie = `accessToken=${accessToken}; expires=${new Date(
        expired
      )}`;
      setIsAuth(true);
      navigate("/dashboard");
    } catch {
      setErrorMessage("登入失敗，請檢查您的帳號或密碼");
    }
  };

  return (
    <>
      {isAuth ? (
        <p>已成功登入</p>
      ) : (
        <div className="admin-login-container">
          <div className="position-fixed top-0 end-0 p-3 register-link">
            <a href="#/admin-register" className="text-muted">
              還沒有帳戶？立即註冊
            </a>
          </div>

          <div className="container">
            <h2 className="mb-4 text-center">管理者後台登入</h2>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email 欄位必填",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email 格式錯誤",
                    },
                  })}
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="請輸入您的郵件信箱"
                />
                {errors.email && (
                  <p className="text-danger my-2">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  密碼
                </label>
                <input
                  {...register("password", {
                    required: "密碼欄位必填",
                    minLength: {
                      value: 6,
                      message: "密碼長度至少為 6 個字元",
                    },
                  })}
                  id="password"
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="******************"
                />
                {errors.password && (
                  <p className="text-danger my-2">{errors.password.message}</p>
                )}
              </div>

              <button type="submit" className="btn btn-dark">
                登入
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="#/forgot-password" className="text-muted">
                忘記密碼？
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
