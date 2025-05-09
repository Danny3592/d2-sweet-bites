import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { alertError } from '../../../util/sweetAlert';

export default function AdminOrderModal({
  modalRef,
  closeOrderModal,
  order,
}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios('/products')
      .then((res) => {
        if (order.recentItems) {
          const matchProducts = res.data.filter((item)=>{
            return order.recentItems.some((recentItem)=>recentItem.productId===item.id)
          })
          // 遍歷 products，篩選出 productId 符合 recentItems 的項目
          const matchedProducts = matchProducts.map((product) => {
            // 在 order.recentItems 中找出與該 product.id 相符的 recentItem
            const matchedRecentItem = order.recentItems.find(
              (recentItem) => recentItem.productId === product.id,
            );
            // 如果有找到對應的 recentItem，則合併它的資料
            if (matchedRecentItem) {
              return { ...product, recentItem: matchedRecentItem };
            }
            // 否則返回原本的 product
            return product;
          });
          setProducts(matchedProducts);
        }
      })
      .catch((error) => {
        alertError(error);
      });
  }, [order.recentItems]);

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              查看訂單
              <span style={{ fontWeight: 'bold' }} className="mx-3">
                {`"${order.displayOrderId}"`}
              </span>
              詳情
            </h1>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeOrderModal}
            />
          </div>
          <div
            className="modal-body"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <div className="row">
              <div className="order-content">
                <p className="fs-5">訂單日期:{order.date}</p>
                <p className="fs-5 mt-5">訂單內容:</p>
                <ul className="">
                  {products?.map((item) => {
                    return (
                      <li key={item.id} className="mt-10">
                        <div className="d-flex gap-10">
                          <div className="d-flex gap-6 flex-column">
                            <p className="fs-5">商品名稱:{item.title}</p>
                            <p className="fs-5">成分:{item.ingredient}</p>
                            <p className="fs-6">分類:{item.category}</p>
                            <p className="fs-6">單價:{item.price}</p>
                            <p className="fs-6">數量:{item.recentItem.qty}</p>
                            <p className="fs-6">總價:{item.recentItem.price * item.recentItem.qty}</p>
                          </div>
                          <div
                            style={{
                              width: '300px',
                              height: '300px',
                              objectFit: 'cover',
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              style={{ width: '100%', height: '100%' }}
                              alt="productImage"
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary py-2"
                  onClick={closeOrderModal}
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminOrderModal.propTypes = {
  modalRef: PropTypes.object,
  closeOrderModal: PropTypes.func,
  order: PropTypes.array
}