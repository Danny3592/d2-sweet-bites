import { useEffect, useState } from "react";
import axios from "axios";
import { toastAlert, alertError } from "../../../util/sweetAlert";

export default function AdminUserModal({
  modalRef,
  closeUserModal,
  getUsers,
  currentPage,
  tempUser,
  type,
}) {
  const [userData, setUserData] = useState({
    username: "", //使用者名稱
    email: "", //Email
    role: ["user"], //權限
    is_enabled: 1, //狀態,是否啟用
  });

  useEffect(() => {
    if (type === "create") {
      setUserData({
        username: "",
        email: "",
        role: ["user"],
        is_enabled: 1,
      });
    } else if (type === "edit") {
      setUserData(tempUser);
    }
  }, [type, tempUser]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "is_enabled") {
      setUserData((prev) => ({
        ...prev,
        [name]: +checked,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submit = async () => {
    let apiPath = "/660/users";
    let apiMethod = "post";
    let message = "新增使用者成功";

    if (type === "edit") {
      apiPath = `/660/users/${userData.id}`;
      apiMethod = "put";
      message = "編輯使用者成功";
    }

    try {
      await axios[apiMethod](apiPath, userData);
      toastAlert(message);
      closeUserModal();
      getUsers(currentPage);
    } catch (error) {
      alertError(error.message);
    }
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {type === "edit" ? "編輯使用者" : "新增使用者"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeUserModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">使用者名稱</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userData.username}
                onChange={handleChange}
                placeholder="請輸入使用者名稱"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="請輸入 Email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">權限</label>
              <select
                className="form-select"
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="user">一般使用者</option>
                <option value="admin">管理員</option>
                <option value="vip">VIP 會員</option>
              </select>
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                className="form-check-input"
                checked={userData.is_enabled}
                onChange={handleChange}
              />
              <label className="form-check-label ms-2" htmlFor="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeUserModal}
            >
              取消
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              {type === "edit" ? "更新" : "新增"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
