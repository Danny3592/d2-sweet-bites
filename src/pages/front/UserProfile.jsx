import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { alertError, toastAlert } from '../../../util/sweetAlert';
import Loading from '@/components/Loading';
import { loginSuccess } from '@/slice/authSlice';
import userLogo from '@/assets/images/user/user-logo.svg';
export default function UserProfile() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useRef({});
  const [user, setUser] = useState({});
  const [tempData, setTempData] = useState({
    imageUrl: '',
    password: '',
  });
  const [isImageEdit, setIsImageEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);
  const imgUrl = user.imageUrl ? user.imageUrl : userLogo;
  const getUser = async (userId) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/600/users/${userId}`);
      setUser(res.data);
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTempDataChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };
  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const canSubmit =
    (isImageEdit && !tempData.imageUrl) ||
    (isPasswordEdit && !tempData.password);
  const submit = async () => {
    setIsLoading(true);
    try {
      let data = {
        userName: user.userName,
        gender: user.gender,
        imageUrl: tempData.imageUrl ? tempData.imageUrl : user.imageUrl,
        id: userInfo.current.id,
        email: userInfo.current.email
      };
      if (isPasswordEdit && tempData.password) {
        data = {
          ...data,
          password: tempData.password,
        };
      }
      await axios.patch(`/600/users/${userInfo.current.id}`, data);
      // 更新 localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      // 更新 Redux 狀態
      dispatch(loginSuccess(data));
      await getUser(userInfo.current.id);
      setTempData({ imageUrl: '', password: '' });
      setIsImageEdit(false);
      setIsPasswordEdit(false);
      toastAlert('會員資訊修改成功');
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo.current.id) {
      getUser(userInfo.current.id);
    }
  }, []);

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="fs-4 mb-8 noto-sans-tc mb-3">我的會員資訊</h1>
            <div className="p-5 bg-light">
              <div className="row align-items-center mb-6">
                <div className="col-xl-2 d-flex justify-content-center justify-content-lg-start mb-4 mb-xl-0">
                  <img
                    className="rounded-circle object-fit-cover"
                    src={imgUrl}
                    alt="會員照片"
                    style={{
                      width: '120px',
                      height: '120px',
                    }}
                  />
                </div>
                <div className="col-xl-10">
                  {!isImageEdit ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setIsImageEdit(true)}
                    >
                      修改圖片
                    </button>
                  ) : (
                    <div className="input-group w-lg-50 flex-nowrap">
                      <input
                        type="text"
                        className="form-control w-auto"
                        name="imageUrl"
                        placeholder="請輸入圖片網址"
                        onChange={(e) => handleTempDataChange(e)}
                      />
                      <button
                        className="btn btn-outline-secondary py-0"
                        type="button"
                        onClick={() => {
                          setTempData({
                            ...tempData,
                            imageUrl: '',
                          });
                          setIsImageEdit(false);
                        }}
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row align-items-center mb-6">
                <div className="col-xl-2">
                  <p className="fs-6 me-6">使用者名稱:</p>
                </div>
                <div className="col-xl-10">
                  <input
                    type="text"
                    className="form-control w-lg-50"
                    name="userName"
                    value={user.userName || ''}
                    onChange={(e) => handleInputUpdate(e)}
                    placeholder="請輸入使用者名稱"
                  />
                </div>
              </div>
              <div className="row align-items-center mb-6">
                <div className="col-xl-2">
                  <p className="fs-6 me-6">Email:</p>
                </div>
                <div className="col-xl-10">{user.email}</div>
              </div>
              <div className="row align-items-center mb-6">
                <div className="col-xl-2">
                  <p className="fs-6 me-6">密碼:</p>
                </div>
                <div className="col-xl-10">
                  {!isPasswordEdit ? (
                    <div className="d-flex align-items-center">
                      <p className="me-4">*******</p>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setIsPasswordEdit(true)}
                      >
                        修改密碼
                      </button>
                    </div>
                  ) : (
                    <div className="input-group w-lg-50 flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        onChange={(e) => handleTempDataChange(e)}
                        placeholder="請輸入新密碼"
                      />
                      <button
                        className="btn btn-outline-secondary py-0"
                        type="button"
                        onClick={() => {
                          setTempData({
                            ...tempData,
                            password: '',
                          });
                          setIsPasswordEdit(false);
                        }}
                      >
                        取消
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row align-items-center mb-6">
                <div className="col-xl-2">
                  <p className="fs-6 me-6">性別:</p>
                </div>
                <div className="col-xl-10">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      checked={user.gender === 'male'}
                      onChange={(e) => handleInputUpdate(e)}
                      value="male"
                    />
                    <label className="form-check-label" htmlFor="male">
                      男
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      checked={user.gender === 'female'}
                      onChange={(e) => handleInputUpdate(e)}
                      value="female"
                    />
                    <label className="form-check-label" htmlFor="female">
                      女
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={canSubmit}
                  onClick={submit}
                >
                  確認修改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
