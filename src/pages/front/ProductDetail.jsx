import { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// React Icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Components & Styles
import CharityCard from '../../components/front/product-detail/CharityCard';
import Notification from '../../components/front/product-detail/Notification';
import {
  mainProdImgStyle,
  similarProdsImgStyle,
} from '../../components/front/product-detail/product-detail-style';
import Loading from '../../components/Loading';

// Redux Actions
import { addCart, getCartList, updateCart } from '../../slice/cartSlice';
import {
  getFavorites,
  removeFavorite,
  addFavorite,
} from '../../slice/favoriteSlice';
import { setCheckoutItem } from '../../slice/checkoutSlice';

// Utils
import { alertError } from '../../../util/sweetAlert';

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const userInfo = useRef({});

  // Redux 狀態
  const { status: cartStatus, carts } = useSelector((state) => state.cart);
  const { favorites, status: favoriteStatus } = useSelector(
    (state) => state.favorite,
  );

  // 商品 & 慈善 & 相似商品
  const [productDetails, setProductDetails] = useState({});
  const [charityProducts, setCharityProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  // 收藏狀態
  const [isFavorite, setIsFavorite] = useState(false);

  // 數量、loading、notification
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // 加購商品的 id 清單
  const [charitySet, setCharitySet] = useState([]);

  // 商品數量
  const [order, setOrder] = useState({
    productId: '',
    productQty: 1,
  });

  // 控制相似商品輪播用
  const imgListRef = useRef(null);
  const [position, setPosition] = useState(-20);

  /* =====================
   *  初始化載入資料
   * ===================== */
  useEffect(() => {
    // 登入 + 取得購物車 + 取得收藏

    userInfo.current = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo?.current?.id) {
      dispatch(getCartList(userInfo?.current?.id));
      dispatch(getFavorites(userInfo?.current?.id));
    }

    // 從 Cookie 抓 token 後統一設置 axios header
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 同步抓「商品資料」+「慈善商品」並設定 state
    setIsLoading(true);
    const productRequest = axios.get('/products');
    const charityRequest = axios.get('/products?category=慈善');

    Promise.all([productRequest, charityRequest])
      .then(([resProducts, resCharities]) => {
        if (resProducts?.data) {
          const allProducts = resProducts.data;
          const currentProduct = allProducts.find(
            (item) => +item.id === +productId,
          );
          const similar = allProducts.filter(
            (item) => item.category === currentProduct?.category,
          );

          setProductDetails(currentProduct || {});
          setSimilarProducts(similar);

          // 初始化 order
          if (currentProduct) {
            setOrder({ productId: currentProduct.id, productQty: 1 });
          }
        }
        if (resCharities?.data) {
          setCharityProducts(resCharities.data);
        }
      })
      .catch((error) => {
        console.error(error);
        alertError('取得商品資料失敗');
      })
      .finally(() => setIsLoading(false));
  }, [productId, dispatch]);

  /* =====================
   *  每當收藏或商品更新時，判斷當前商品是否在收藏清單內
   * ===================== */
  useEffect(() => {
    if (favorites.length > 0 && productDetails?.id) {
      setIsFavorite(
        favorites.some((item) => item.productId === +productDetails.id),
      );
    } else {
      setIsFavorite(false);
    }
  }, [favorites, productDetails]);

  /* =====================
   *  Notification 顯示後，自動移除
   * ===================== */
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 1000);
    return () => clearTimeout(timer);
  }, [notification]);

  /* =====================
   *  相似商品輪播
   * ===================== */
  const handleSlideImg = useCallback((direction, length) => {
    const moveRange = 330;
    let limit = (length - 4) * 330; // default: 4 個為一屏
    if (window.innerWidth <= 1362) {
      limit = (length - 3) * 330;
    }
    if (window.innerWidth <= 970) {
      limit = (length - 2.2) * 330;
    }
    setPosition((prev) => {
      if (direction === 'right') {
        return prev > -limit ? prev - moveRange : -20;
      }
      if (direction === 'left') {
        return prev < -20 ? prev + moveRange : -20;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (imgListRef.current) {
      imgListRef.current.style.left = `${position}px`;
    }
  }, [position]);

  /* =====================
   *  加入或更新購物車
   * ===================== */
  const updateCartItem = async (cartId, productId, newQty) => {
    if (newQty < 1) return; // 防止數量小於 1
    await dispatch(updateCart({ cartId, productId, qty: newQty }));
    dispatch(getCartList(userInfo.current.id));
  };

  const addCartItem = useCallback(
    async (prodId, newQty = 1) => {
      try {
        // 如果 slice 狀態最新，實際上可以不用再 getCartList，但保險起見可保留
        const { data: product } = await axios.get(`/products/${prodId}`);

        const foundItem = carts.find((item) => item.productId === +prodId);
        if (foundItem) {
          // 如果已在購物車內，更新數量
          await updateCartItem(
            foundItem.id,
            foundItem.productId,
            foundItem.qty + newQty,
          );
        } else {
          // 否則直接加入購物車
          await dispatch(
            addCart({
              userId: userInfo.current.id,
              cart: {
                productId: product.id,
                title: product.title,
                price: product.price,
                qty: newQty,
                imageUrl: product.imageUrl,
              },
            }),
          );
          dispatch(getCartList(userInfo.current.id));
        }
      } catch (error) {
        console.error(error);
        alertError(`加入購物車失敗: ${error.message}`);
      }
    },
    [dispatch, carts],
  );

  const handleAddCart = async (id, qty) => {
    setIsLoading(true);
    try {
      // 若有勾選慈善商品，一次加入購物車
      if (charitySet.length > 0) {
        await Promise.all(
          charitySet.map((charityId) => addCartItem(charityId, 1)),
        );
      }
      // 再加入主商品
      await addCartItem(id, qty);
      // 前往購物車
      navigate('/cart');
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* =====================
   *  立即結帳
   * ===================== */
  const handleCheckout = async () => {
    const { id, title, price, imageUrl } = productDetails;

    if (charitySet.length > 1) {
      charitySet.forEach((charityId) => {
        const charityItem = charityProducts.find(
          (item) => item.id === charityId,
        );
        if (charityItem) {
          dispatch(
            setCheckoutItem({
              productId: charityItem.id,
              title: charityItem.title,
              price: charityItem.price,
              qty: 1,
              imageUrl: charityItem.imageUrl,
            }),
          );
        }
      });
    }

    dispatch(
      setCheckoutItem({
        productId: id,
        title,
        price,
        qty: order.productQty,
        imageUrl,
      }),
    );

    navigate('/checkout', { state: { type: 'direct' } });
  };

  /* =====================
   *  收藏 / 移除收藏
   * ===================== */
  const handleToggleFavorite = async (id) => {
    if (!userInfo?.current?.id) {
      navigate('/login');
    }

    const obj = { userId: userInfo.current.id, productId: id };
    const existItem = favorites.find((item) => item.productId === id);

    try {
      if (existItem) {
        await dispatch(removeFavorite(obj));
        setIsFavorite(false);
        setNotification('商品已從您的收藏清單移除');
      } else {
        await dispatch(addFavorite(obj));
        setIsFavorite(true);
        setNotification('商品已保存至您的收藏清單');
      }
      dispatch(getFavorites(userInfo.current.id));
    } catch (error) {
      console.error(error);
      alertError('操作收藏清單失敗');
    }
  };

  /* =====================
   *  數量加減
   * ===================== */
  const handleCount = (delta) => {
    setOrder((prev) => ({
      ...prev,
      productQty: Math.min(
        Math.max(prev.productQty + delta, 1),
        productDetails?.stock || 9999,
      ),
    }));
  };

  return (
    <>
      {(isLoading || cartStatus === 'loading') && (
        <Loading type="spin" color="#D4A58E" />
      )}
      {notification && <Notification text={notification} key={notification} />}

      <div className="product-details">
        <div className="container p-0">
          <div className="row d-flex gx-lg-12 gx-0">
            {/* ===================== 左區：圖片列表 ===================== */}
            <div className="product-img-list col-12 col-lg-6 position-relative">
              {/* 手機板輪播 */}
              <div className="d-block d-lg-none">
                <div
                  id="main-img"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div
                    className="carousel-inner d-flex align-items-center w-100"
                    style={{ height: '635px' }}
                  >
                    <div className="carousel-item active">
                      <img
                        src={productDetails?.imageUrl}
                        className="d-block w-100"
                        alt="..."
                        style={mainProdImgStyle()}
                      />
                    </div>
                    {productDetails?.imagesUrl?.map((img) => (
                      <div
                        className="carousel-item"
                        key={img}
                        style={mainProdImgStyle()}
                      >
                        <img
                          src={img}
                          className="d-block"
                          alt="..."
                          style={mainProdImgStyle()}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#main-img"
                    data-bs-slide="prev"
                  >
                    <IoIosArrowBack className="d-block d-lg-none arrow arrow-left position-absolute fs-3 top-50 start-0" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#main-img"
                    data-bs-slide="next"
                  >
                    <IoIosArrowForward className="d-block d-lg-none arrow arrow-right position-absolute fs-3 top-50 end-0" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              {/* 電腦板圖片區 */}
              <div className="d-none d-lg-block">
                <div>
                  <img
                    src={productDetails.imageUrl}
                    alt=""
                    style={mainProdImgStyle()}
                  />
                </div>
                <ul className="d-none d-lg-grid p-0 mt-4 products-imgs">
                  {productDetails?.imagesUrl?.map((img) => (
                    <li
                      key={img}
                      className="d-flex justify-content-center align-items-center overflow-hidden"
                      style={{ width: '100px', height: '100px' }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ===================== 右區：商品內容 ===================== */}
            <div className="col-12 col-lg-6 px-lg-8 px-3 py-lg-0 py-6 position-relative">
              {/* 手機板收藏按鈕 */}
              {isFavorite ? (
                <FaHeart
                  className="d-block d-lg-none position-absolute heart"
                  onClick={() => handleToggleFavorite(productDetails.id)}
                />
              ) : (
                <FiHeart
                  className="d-block d-lg-none position-absolute heart"
                  onClick={() => handleToggleFavorite(productDetails.id)}
                />
              )}

              <h3 className="text-primary fw-medium mb-6 fs-2">
                {productDetails?.title}
              </h3>
              <p className="mb-8">成分: {productDetails.ingredient}</p>
              <p className="mb-8">{productDetails?.description}</p>
              <p className="fs-2 price">
                <span>NT$</span>
                {productDetails?.price}
              </p>

              <p className="mt-12 mb-3">數量</p>
              <div className="d-flex mb-12 count-container">
                <button
                  className="btn-count"
                  onClick={() => handleCount(-1)}
                  disabled={order.productQty === 1}
                >
                  -
                </button>
                <div className="count w-100 text-center h-100 d-flex justify-content-center align-items-center">
                  {order.productQty}
                </div>
                <button
                  className="btn-count"
                  onClick={() => handleCount(1)}
                  disabled={order.productQty === productDetails?.stock}
                >
                  +
                </button>
              </div>

              {/* 加購慈善商品區 */}
              <div className="charity-container">
                <div className="charity-title d-flex align-items-center">
                  <span className="charity-icon fs-6 mx-3">+</span>
                  <span className="fs-7">加購公益專案</span>
                </div>
                <ul className="d-flex flex-column p-0">
                  {charityProducts.map((item) => (
                    <li
                      key={item.id}
                      className="charity-item d-flex list-unstyled py-3 align-items-center gap-4 border px-4"
                    >
                      <CharityCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        img={item.imageUrl}
                        setCharitySet={setCharitySet}
                        charitySet={charitySet}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 操作按鈕 */}
              <div className="mt-18 d-flex gap-4 mb-33">
                {/* 電腦板收藏按鈕 */}
                <button
                  className="d-none d-lg-flex btn btn-action-1 py-4 px-10"
                  onClick={() => handleToggleFavorite(productDetails.id)}
                  disabled={favoriteStatus === 'loading'}
                >
                  {isFavorite ? '移除收藏' : '收藏'}
                </button>

                <button
                  className="btn btn-action-2 py-4"
                  onClick={() =>
                    handleAddCart(productDetails.id, order.productQty)
                  }
                  disabled={isLoading}
                >
                  加入購物車
                </button>

                <button
                  className="btn btn-action-3 py-4"
                  onClick={handleCheckout}
                >
                  直接購買
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== 類似商品 ===================== */}
        <div className="similar-items">
          <div className="container">
            <div className="row pt-18">
              <div className="col-12">
                <p className="title fs-5 mb-12">類似商品</p>

                {/* 手機板 Swiper */}
                <div className="d-block d-md-none text-center">
                  <Swiper
                    spaceBetween={25}
                    slidesPerView={window.innerWidth > 450 ? 2 : 1}
                    loop={window.innerWidth > 450}
                  >
                    {similarProducts.map((product) => {
                      return (
                        <Link
                          to={`/product-details/${product.id}`}
                          key={product.id}
                          style={{ cursor: 'pointer', color: 'black' }}
                        >
                          <SwiperSlide
                            key={product.id}
                            className="d-flex justify-content-center align-items-center flex-column"
                          >
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: '300px', width: '300px' }}
                            >
                              <img
                                src={product.imageUrl}
                                alt=""
                                style={mainProdImgStyle('100%', '100%')}
                              />
                            </div>
                            <h3 className="fs-6 mt-4 mb-3">{product.title}</h3>
                            <p className="fs-7 mb-32">{product.description}</p>
                          </SwiperSlide>
                        </Link>
                      );
                    })}
                  </Swiper>
                </div>

                {/* 電腦板相似商品 */}
                <div className="d-none d-md-block text-center similar-container">
                  <IoIosArrowBack
                    className="d-none d-md-block arrow arrow-left fs-3"
                    onClick={() =>
                      handleSlideImg('left', similarProducts.length)
                    }
                  />
                  <IoIosArrowForward
                    className="d-none d-md-block arrow arrow-right fs-3"
                    onClick={() =>
                      handleSlideImg('right', similarProducts.length)
                    }
                  />
                  <ul
                    className="similar-products-imgs mb-32 position-relative get-slide"
                    style={similarProdsImgStyle(similarProducts.length)}
                    ref={imgListRef}
                  >
                    {similarProducts.map((product) => {
                      return (
                        <Link
                          to={`/product-details/${product.id}`}
                          key={product.id}
                          style={{ cursor: 'pointer', color: 'black' }}
                        >
                          <li className="position-relative similar-item">
                            <div className="similar-item-box">
                              <img src={product.imageUrl} alt="" />
                            </div>

                            <p className="mt-4 mb-3 text-dark">
                              {product.title}
                            </p>
                            <p>{product.description}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
                {/* ============ */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
