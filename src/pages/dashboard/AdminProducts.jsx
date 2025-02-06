import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import AdminProductModal from '../../components/dashboard/AdminProductModal';
import axios from 'axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('create'); // edit
  const [tempProduct, setTempProduct] = useState({});
  const getProducts = async () => {
    try {
      const res = await axios.get(`/products`);
      setProducts(res.data);
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const productModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    productModal.current = new Modal(modalRef.current, {
      backdrop: 'static'
    });
  }, []);

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  }

  const closeProductModal = () => {
    productModal.current.hide();
  }

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`/products/${productId}`);
      console.log(res.data);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AdminProductModal
        modalRef={modalRef}
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理商品</h2>
        <button className="btn btn-primary"
          onClick={() => openProductModal('create', {})}>
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
            {
              products.map(product => {
                return (
                  <tr key={product.title}>
                    <td>{product.category}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openProductModal('edit', product)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => deleteProduct(product.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </main>
    </>
  );
}
