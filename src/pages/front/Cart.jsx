import { useEffect, useState } from "react";
import axios from "axios";
import { alertError, alertDeleteConfirm } from "../../../util/sweetAlert";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from 'react-redux';
import { getCartList, addCart, updateCart, deleteCart, deleteAllCart } from '../../slice/cartSlice';

import continueshopping from "../../assets/images/icons/chevron-left.svg";
import shoppingCartIcon from "../../assets/images/icons/shopping-cart.svg";

export default function CartPage() {
  const [charityProducts, setCharityProducts] = useState([]); //慈善商品
  const [isLoading, setIsLoading] = useState(false);
  const carts = useSelector((state) => {
    return state.cart.carts;
  });
  const cartStatus = useSelector((state) => {
    return state.cart.status;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartList());
    getCharityProducts();

    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('dessertToken='))
    ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

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
  
  // 加入購物車
  const addCartItem = async (productId) => {
    let qty = 1;
    const cart = carts.find(cart => cart.productId === productId);
    if (cart) {
      qty += cart.qty;
      await dispatch(updateCart({ cartId: cart.id, productId, qty }))
    } else {
      await dispatch(addCart({ productId, qty: 1 }));
    }
    await dispatch(getCartList());
  }

  // 更新購物車
  const updateCartItem = async (cartId, type) => {
    const cart = carts.find(cart => cart.id === cartId);
    if (type === 'add') {
      await dispatch(updateCart({ cartId, productId: cart.product.id, qty: cart.qty + 1 }));
    } else if (type === 'minus') {
      await dispatch(updateCart({ cartId, productId: cart.product.id, qty: cart.qty - 1 }));
    }
    await dispatch(getCartList());
  }

  // 刪除購物車
  const deleteCartItem = async (cartId, productName) => {
    const res = await alertDeleteConfirm(`確認刪除 ${productName}`);
    if (res.isConfirmed) {
      await dispatch(deleteCart(cartId));
    }
    await dispatch(getCartList());
  }

  // 刪除全部購物車
  const deleteAllCartItems = async () => {
    const res = await alertDeleteConfirm(`確認刪除全部商品`);
    if (res.isConfirmed) {
      await dispatch(deleteAllCart());
    }
    await dispatch(getCartList());
  }

  const login = async () => {
    try {
      const res = await axios.post('/login', {
        email: 'Shin@gmail.com',
        password: '123456',
      });
      const { accessToken } = res.data;
      document.cookie = `dessertToken=${accessToken}; max-age=86400;`;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      { cartStatus === 'loading' && (<Loading type="spin" color="#D4A58E"/>)  }
      <div className="cart-page pb-md-33 pb-18">
        <div className="d-flex justify-content-center">
          <button type="button"
            onClick={login}>
            登入
          </button>
        </div>
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
                      {carts.length > 0 && (
                        <button
                          className="btn btn-outline-danger btn-sm custom-outlined-button"
                          onClick={deleteAllCartItems} // 清空購物車
                          type="button"
                        >
                          全部清空
                        </button>
                      )}
                    </div>
                    {carts.length === 0 ? (
                      <p>購物車是空的</p>
                    ) : (
                      carts.map((cart, index) => (
                        <div
                          key={cart.id}
                          className={`d-flex justify-content-between align-items-center py-3
                            ${index !== carts.length - 1 ? "border-bottom" : ""}`}
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={cart.product.imageUrl}
                              alt="圖片"
                              className="cart-item-image me-3"
                            />
                            <div>
                              <h6 className="mb-3 text-dark">{cart.product.title}</h6>
                              <div className="input-group input-group-sm">
                                <button
                                  type="button"
                                  className={`btn btn-outline-gray-400 ${
                                    cart.qty === 1
                                      ? "bg-gray-100 text-gray-400"
                                      : "text-dark"
                                  } quantity-btn`}
                                  disabled={cart.qty === 1}
                                  onClick={() => updateCartItem(cart.id, 'minus')}
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  value={cart.qty}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-gray-400 text-dark quantity-btn"
                                  onClick={() => updateCartItem(cart.id, 'add')}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-3 text-primary-800">
                              NT${cart.product.price}
                            </h6>
                            <button
                              className="btn btn-link text-danger btn-sm"
                              onClick={() => deleteCartItem(cart.id, cart.product.title)} // 刪除單一購物車品項
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
                            {carts.reduce(
                              (total, item) => total + item.product.price * item.qty,
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
                            {carts.reduce(
                              (total, item) => total + item.product.price * item.qty,
                              0
                            )}
                          </span>
                        </strong>
                      </li>
                    </ul>
                    <button
                      className="btn btn-danger w-100 mt-3 custom-button"
                      type="button"
                      disabled={!carts.length}
                    >
                      確認訂單
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
