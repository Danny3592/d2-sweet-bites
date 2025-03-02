import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import {
  alertDeleteConfirm,
  toastAlert,
  alertError,
} from "../../../util/sweetAlert";
import AdminUserModal from "../../components/dashboard/AdminUserModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("create"); // edit
  const [tempUser, setTempUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/660/users?_page=${page}&_limit=10`);
      setTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 10));
      setUsers(res.data);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const userModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    userModal.current = new Modal(modalRef.current, {
      backdrop: "static",
    });
  }, []);

  const openUserModal = (type, user) => {
    setType(type);
    setTempUser(user);
    userModal.current.show();
  };

  const closeUserModal = () => {
    userModal.current.hide();
  };

  const deleteUser = async (user) => {
    const res = await alertDeleteConfirm(`確認刪除 ${user.name} 嗎?`);
    if (!res.isConfirmed) return;
    setIsLoading(true);
    try {
      await axios.delete(`/660/users/${user.id}`);
      toastAlert("使用者刪除成功");
      getUsers(currentPage);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <AdminUserModal
        modalRef={modalRef}
        closeUserModal={closeUserModal}
        getUsers={getUsers}
        currentPage={currentPage}
        tempUser={tempUser}
        type={type}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理使用者</h2>
        <button
          className="btn btn-primary d-none"
          onClick={() => openUserModal("create", {})}
        >
          新增使用者
        </button>
      </div>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th>使用者 ID</th>
              <th>使用者名稱</th>
              <th className="px-5">Email</th>
              <th>權限</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td className="px-5" width={400}>
                    {user.email}
                  </td>
                  <td>{user.role}</td>
                  <td>{user.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openUserModal("edit", user)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => deleteUser(user)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}
