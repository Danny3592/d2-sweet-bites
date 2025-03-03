import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slice/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];

    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await axios.post('/login', data);
      const { accessToken, user } = res.data;
      const userInfo = {
        userName: user.userName,
        imageUrl: user?.imageUrl,
        id: user.id,
        email: user.email
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      document.cookie = `dessertToken=${accessToken}; max-age=86400;`;

      dispatch(loginSuccess(userInfo));

      reset();
      navigate('/');
    } catch (error) {
      setErrorMessage('登入失敗，請檢查您的帳號密碼是否正確');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <Link to="/admin-login" className="top-right-link">
        我是管理者
      </Link>

      <div className="login-container">
        <h2 className="login-title text-center mb-4">登入會員</h2>

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
              {...register('email', {
                required: 'Email 欄位必填',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email 格式錯誤',
                },
              })}
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
              {...register('password', {
                required: '密碼欄位必填',
                minLength: { value: 6, message: '密碼長度至少為 6 個字元' },
              })}
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
            <Link to="/register" className="forgot-password-link">
              還不是幸享屋會員？立即註冊
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
