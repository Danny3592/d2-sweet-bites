import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactLoading from "react-loading";

export default function AdminRegister() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password"); //檢查密碼

  const handleRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("兩次輸入密碼不一致");
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // 清空之前的錯誤訊息

    const { confirmPassword, ...requestData } = data; // 移除確認密碼

    try {
      await axios.post("/register", {
        ...requestData,
        role: ["admin"],
      });
      setIsRegistered(true);
      reset();
      setTimeout(() => {
        navigate("/admin-login");
      }, 2000);

    } catch (error) {
      setErrorMessage("註冊失敗，請檢查您的資料是否正確");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center vh-100">
      <a href="#/admin-login" className="top-right-link">
        已經有帳戶？點此登入
      </a>

      <div className="register-container">
        <h2 className="register-title text-center mb-4">創建您的管理者帳戶</h2>

        {isRegistered && (
          <p className="success-message text-center">
            註冊成功！即將跳轉到登入頁面...
          </p>
        )}

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {!isRegistered && (
          <form onSubmit={handleSubmit(handleRegister)} className="form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                用戶名
              </label>
              <input
                {...register("name", {
                  required: "用戶名欄位必填",
                  minLength: { value: 2, message: "用戶名至少需要 2 個字元" },
                })}
                id="name"
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="請輸入用戶名"
              />
              {errors.name && (
                <p className="text-danger my-2">{errors.name.message}</p>
              )}
            </div>

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
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                } custom-form`}
                placeholder="******************"
              />
              {errors.password && (
                <p className="text-danger my-2">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                確認密碼
              </label>
              <input
                {...register("confirmPassword", {
                  required: "請再次輸入密碼",
                  validate: (value) =>
                    value === password || "兩次輸入的密碼不一致",
                })}
                id="confirmPassword"
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="再次輸入密碼"
              />
              {errors.confirmPassword && (
                <p className="text-danger my-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mb-3 form-check">
              <input
                {...register("terms", {
                  required: "請勾選以同意隱私政策與條款",
                })}
                type="checkbox"
                className="form-check-input"
                id="terms"
              />
              <label htmlFor="terms" className="form-check-label">
                我同意 隱私政策與條款
              </label>
              {errors.terms && (
                <p className="text-danger my-2">{errors.terms.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 d-flex justify-content-center align-items-center gap-2 btn-register"
              disabled={isLoading}
            >
              註冊
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
        )}
      </div>
    </div>
  );
}
