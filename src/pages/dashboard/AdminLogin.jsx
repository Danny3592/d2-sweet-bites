import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";

export default function AdminLogin() {
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/login", data);
      const { accessToken } = res.data;

      document.cookie = `dessertToken=${accessToken}; max-age=86400;`;
      reset();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("登入失敗，請檢查您的帳號密碼是否正確");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <a href="#/admin-register" className="top-right-link">
        還沒有帳戶？立即註冊
      </a>

      <div className="login-container">
        <h2 className="login-title text-center mb-4">管理者後台登入</h2>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="form">
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
                minLength: { value: 6, message: "密碼長度至少為 6 個字元" },
              })}
              id="password"
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="******************"
            />
            {errors.password && (
              <p className="text-danger my-2">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2 btn-login"
            disabled={isLoading}
          >
            登入
            {isLoading && (
              <ReactLoading
                type="spin"
                color="#fff"
                height="1.5rem"
                width="1.5rem"
              />
            )}
          </button>

          <div className="d-flex justify-content-start mt-2">
            <a href="#/forgot-password" className="forgot-password-link">
              忘記密碼？
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
