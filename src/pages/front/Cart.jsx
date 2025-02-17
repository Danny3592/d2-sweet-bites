import { useEffect, useState } from "react";
import axios from "axios";
import { alertError } from "../../../util/sweetAlert";
import Loading from "../../components/Loading";

import continueshopping from "../../assets/images/icons/chevron-left.svg";
import shoppingCartIcon from "../../assets/images/icons/shopping-cart.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [charityProducts, setCharityProducts] = useState([]); //慈善商品
  const [isLoading, setIsLoading] = useState(false);
  // 取得當前登入者 ID
  const USER_ID = localStorage.getItem("userId");

  useEffect(() => {
    if (!USER_ID) {
      navigate("/login");
      return; // 如果沒登入，就不請求 API
    }
    getCart();
    getCharityProducts();
  }, [USER_ID]);

  // 取得購物車列表
  const getCart = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/users/${USER_ID}/carts?_expand=product`);

      setCartItems(res.data);
    } catch (error) {
      alertError("取得購物車失敗");
    } finally {
      setIsLoading(false);
    }
  };

  //取得所有慈善商品
  const getCharityProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/products?category=慈善`);
      setCharityProducts(res.data);
    } catch (error) {
      alertError("取得慈善商品失敗");
    } finally {
      setIsLoading(false);
    }
  };

  // 新增至購物車
  const addCartItem = async (productId) => {
    setIsLoading(true);

    try {
      const res = await axios.get(`/products/${productId}`);
      const product = res.data;

      const currentItem = cartItems.find(
        (item) => item.title === product.title
      );

      if (currentItem) {
        await updateCartItem(
          currentItem.id,
          currentItem.productId,
          currentItem.qty + 1
        );
      } else {
        await axios.post(`/users/${USER_ID}/carts`, {
          productId: product.id,
          title: product.title,
          price: product.price,
          qty: 1,
          imageUrl: product.imageUrl,
        });

        await getCart(); // 確保購物車刷新完成
      }
    } catch (error) {
      alertError(`加入購物車失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  //清空全部購物車
  const removeCart = async () => {
    setIsLoading(true);
    try {
      // 逐一刪除購物車內的每個商品
      for (const item of cartItems) {
        await axios.delete(`/carts/${item.id}`);
      }
      setCartItems([]); // 清空前端狀態
      alertError("購物車已清空");
    } catch (error) {
      alertError(`清空購物車失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  //清空單一購物車
  const removeCartItem = async (cartId) => {
    setIsLoading(true);
    try {
      // 發送正確的 DELETE 請求
      await axios.delete(`/carts/${cartId}`);

      // 移除前端狀態中對應的項目
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== cartId)
      );
      alertError("刪除購物車品項成功");
    } catch (error) {
      alertError(`刪除購物車品項失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新購物車數量
  const updateCartItem = async (cartId, productId, newQty) => {
    if (newQty < 1) return; // 防止數量小於 1

    setIsLoading(true);

    try {
      await axios.patch(`/carts/${cartId}`, {
        productId: String(productId),
        qty: newQty,
      });

      await getCart();
    } catch (error) {
      alertError(`更新購物車失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cart-page pb-md-33 pb-18">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <a
              href="/product-list"
              className="continue-shopping text-gray-600 text-decoration-none d-flex align-items-center my-4 my-md-19"
            >
              <img
                src={continueshopping}
                alt="Back"
                className="me-1 back-icon"
                width="16"
                height="16"
              />
              繼續購物
            </a>
          </div>
        </div>

        <div className="row ">
          {/* 購物車列表 */}
          <div className="col-12 col-md-7">
            <div className="cart-section mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-dark fs-5">我的購物車</h5>
                    {cartItems.length > 0 && (
                      <button
                        className="btn btn-outline-danger btn-sm custom-outlined-button"
                        onClick={removeCart} // 清空購物車
                        type="button"
                      >
                        全部清空
                      </button>
                    )}
                  </div>
                  {cartItems.length === 0 ? (
                    <p>購物車是空的</p>
                  ) : (
                    cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`d-flex justify-content-between align-items-center py-3 ${
                          index !== cartItems.length - 1 ? "border-bottom" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="cart-item-image me-3"
                          />
                          <div>
                            <h6 className="mb-3 text-dark">{item.title}</h6>
                            <div className="input-group input-group-sm">
                              <button
                                type="button"
                                className={`btn btn-outline-gray-400 ${
                                  item.qty === 1
                                    ? "bg-gray-100 text-gray-400"
                                    : "text-dark"
                                } quantity-btn`}
                                onClick={() =>
                                  updateCartItem(
                                    item.id,
                                    item.productId,
                                    item.qty - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                className="form-control text-center"
                                value={item.qty}
                                readOnly
                              />
                              <button
                                type="button"
                                className="btn btn-outline-gray-400 text-dark quantity-btn"
                                onClick={() =>
                                  updateCartItem(
                                    item.id,
                                    item.productId,
                                    item.qty + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <h6 className="mb-3 text-primary-800">
                            NT${item.price * item.qty}
                          </h6>
                          <button
                            className="btn btn-link text-danger btn-sm"
                            onClick={() => removeCartItem(item.id)} // 刪除單一購物車品項
                            type="button"
                          >
                            刪除
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 慈善產品區塊 */}
            <div className="donation-section mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3 text-dark fs-5">
                    甜蜜訂單，邀您一起暖心加購
                  </h5>
                  {charityProducts.map((item, index) => (
                    //移除最後一個商品的下底線
                    <div
                      key={item.id}
                      className={`d-flex justify-content-between align-items-center py-3 ${
                        index !== charityProducts.length - 1
                          ? "border-bottom"
                          : ""
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="donation-item-image me-3"
                        />
                        <div>
                          <h6 className="mb-3 text-dark">{item.title}</h6>
                          <p className="text-primary-800 fs-8">數量: 1</p>
                        </div>
                      </div>
                      <div className="text-end">
                        <h6 className="mb-3 text-primary-800">
                          NT${item.price}
                        </h6>
                        <button
                          type="button"
                          className="btn btn-outline-danger custom-outlined-button d-flex align-items-center justify-content-center btn-sm"
                          onClick={() => addCartItem(item.id)}
                          disabled={isLoading}
                        >
                          <img
                            src={shoppingCartIcon}
                            alt="購物車"
                            className="me-2 red-icon"
                          />
                          放入購物車
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 訂單摘要 */}
          <div className="col-12 col-md-5">
            <div className="cart-summary mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="mb-3 text-dark fs-5">訂單明細</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between border-bottom-0">
                      <span className="text-dark">訂單總計</span>
                      <strong>
                        <span className="fs-7 text-primary-800">NT$</span>
                        <span className="fs-6 text-primary-800">
                          {cartItems.reduce(
                            (total, item) => total + item.price * item.qty,
                            0
                          )}
                        </span>
                      </strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between border-bottom-0">
                      <span className="text-dark">優惠券</span>
                      <span>-</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span className="text-dark">運費</span>
                      <span className="text-primary-800">免運</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong className="text-dark">應付金額</strong>
                      <strong>
                        <span className="fs-5 text-primary-800">NT$</span>

                        <span className="fs-3 text-primary-800">
                          {cartItems.reduce(
                            (total, item) => total + item.price * item.qty,
                            0
                          )}
                        </span>
                      </strong>
                    </li>
                  </ul>
                  <button
                    className="btn btn-danger w-100 mt-3 custom-button"
                    type="button"
                  >
                    確認訂單
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Loading type="spin" color="#D4A58E" />}
      </div>
    </div>
  );
}
