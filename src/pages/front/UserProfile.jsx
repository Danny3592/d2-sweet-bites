
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { alertError } from "../../../util/sweetAlert";
export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [isImageEdit, setIsImageEdit] = useState(false);

  const getUser = async (userId) => {
    try {
      const res = await axios.get(`/600/users/${userId}`);
      setUser(res.data);
    } catch(error) {
      alertError(error);
    }
  }
  const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    })
  }
  useEffect(() => {
    getUser(userId);
  }, [userId]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <h1 className="fs-4 mb-8 noto-sans-tc mb-3">我的會員資訊</h1>
          <div className="p-5 bg-light">
            <div className="d-flex align-items-center mb-6">
              <img className="rounded-circle me-10 flex-shrink-0"
                style={{
                  height: '120px',
                }}
                src={user.imageUrl}
                alt="會員照片"
                width={120}/>
              <input type="text"
                className="form-control w-auto"
                name="imageUrl"
                value={user.imageUrl}
                placeholder="請輸入圖片網址"
                onChange={(e) => handleInputUpdate(e)}/>
            </div>
            <div className="row align-items-center mb-6">
              <div className="col-2">
                <p className="fs-6 me-6">
                  使用者名稱:
                </p>
              </div>
              <div className="col-8">
                <input type="text"
                  className="form-control w-auto"
                  name="userName"
                  value={user.userName}
                  onChange={(e) => handleInputUpdate(e)}
                  placeholder="請輸入使用者名稱"/>
              </div>
            </div>
            <div className="row align-items-center mb-6">
              <div className="col-2">
                <p className="fs-6 me-6">
                  Email:
                </p>
              </div>
              <div className="col-8">
                 abc@yahoo.com
              </div>
            </div>
            <div className="row align-items-center mb-6">
              <div className="col-2">
                <p className="fs-6 me-6">
                  密碼:
                </p>
              </div>
              <div className="col-10">
                <input type="text"
                  className="form-control w-auto"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleInputUpdate(e)}
                  placeholder="請輸入新密碼"/>
              </div>
            </div>
            <div className="row align-items-center mb-12">
              <div className="col-2">
                <p className="fs-6 me-6">
                  性別:
                </p>
              </div>
              <div className="col-10">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    男
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    女
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="button"
                className="btn btn-primary">
                確認修改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
