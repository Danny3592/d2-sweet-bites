import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import AdminProductModal from '../../components/dashboard/AdminProductModal';

export default function AdminProducts() {
  const productModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    productModal.current = new Modal(modalRef.current, {
      backdrop: 'static'
    });
  });

  const openProductModal = () => {
    productModal.current.show();
  }

  const closeProductModal = () => {
    productModal.current.hide();
  }

  return (
    <>
      <AdminProductModal
        modalRef={modalRef}
        closeProductModal={closeProductModal}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理商品</h2>
        <button className="btn btn-primary"
          onClick={openProductModal}>
          建立新商品
        </button>
      </div>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th>分類</th>
              <th>名稱</th>
              <th>售價</th>
              <th>啟用狀態</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
