import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { alertDeleteConfirm, toastAlert, alertError } from '../../../util/sweetAlert';
import AdminProductModal from '../../components/dashboard/AdminProductModal';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import axios from 'axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('create'); // edit
  const [tempProduct, setTempProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/660/products?_page=${page}&_limit=10`);
      setTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 10));
      setProducts(res.data);
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

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

  const deleteProduct = async (product) => {
    const res = await alertDeleteConfirm(`確認刪除 ${product.title} 嗎?`);
    if (!res.isConfirmed) return;
    setIsLoading(true);
    try {
      await axios.delete(`/660/products/${product.id}`);
      toastAlert('商品刪除成功');
      getProducts(currentPage);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      { isLoading && <Loading type="spin" color="#D4A58E"/> }
      <AdminProductModal
        modalRef={modalRef}
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        currentPage={currentPage}
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
              <th className='px-5'>內容</th>
              <th>售價</th>
              <th>庫存</th>
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
                    <td className='px-5' width={400}>{product.content}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
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
                        onClick={() => deleteProduct(product)}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}
