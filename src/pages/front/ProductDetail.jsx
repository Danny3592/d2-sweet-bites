import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FiHeart } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import CharityCard from '../../components/front/product-detail/CharityCard';
import Notification from '../../components/front/product-detail/Notification';
import {
  mainProdImgStyle,
  similarProdsImgStyle,
} from '../../components/front/product-detail/product-detail-style';
import { alertError } from '../../../util/sweetAlert';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, getCartList, updateCart } from '../../slice/cartSlice';
import { login } from '../../../util/http';
import {
  getFavorites,
  removeFavorite,
  addFavorite,
} from '../../slice/favoriteSlice';

const ProductDetail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { status: cartStatus, carts } = useSelector((state) => state.cart);
  const {
    favorites,
    error,
    status: favoriteStatus,
  } = useSelector((state) => state.favorite);

  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState({});
  const [charityProducts, setCharityProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [charitySet, setCharitySet] = useState([]);

  const [order, setOrder] = useState({
    productId: '',
    productQty: 1,
  });

  const USER_ID = localStorage.getItem('userId') || 1;

  const [notification, setNotification] = useState(null);
  const imgListRef = useRef(null);
  const [position, setPosition] = useState(-20);

  //============負責處理類似商品區的輪播效果 START============

  const handleSlideImg = (direction, length) => {
    const moveRange = 330;
    let limit = (length - 4) * 330; // 最右邊界
    if (window.innerWidth <= 1362) {
      limit = (length - 3) * 330;
    }
    if (window.innerWidth <= 970) {
      limit = (length - 2.2) * 330;
    }

    setPosition((prev) => {
      if (direction === 'right') return prev > -limit ? prev - moveRange : -20;
      if (direction === 'left') return prev < -20 ? prev + moveRange : -20;
      return prev;
    });
  };

  useEffect(() => {
    if (imgListRef.current) {
      imgListRef.current.style.left = `${position}px`;
    }
  }, [position]);

  //============負責處理類似商品區的輪播效果 END============

  useEffect(() => {
    if (favorites.length > 0 && productDetails.id) {
      const currentFavorite = favorites.some(
        (item) => item.productId === productDetails.id,
      );
      setIsFavorite(currentFavorite);
    }
  }, [favorites, productId]);

  useEffect(() => {
    login();
    dispatch(getCartList());
    dispatch(getFavorites(USER_ID));
    getProductDetails(productId);

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [USER_ID, productId]);

  const getCharityProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/products?category=慈善`);
      setCharityProducts(res.data);
    } catch (error) {
      alertError('取得慈善商品失敗');
    } finally {
      setIsLoading(false);
    }
  };
  const getProductDetails = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get('/products');
      const data = res.data;
      const product = data.find((item) => item.id === +id);
      const similarProducts = data.filter(
        (item) => item.category === product.category,
      );
      setSimilarProducts(similarProducts);
      setProductDetails(product);
      setOrder({
        productId: product.id,
        productQty: 1,
      });
    } catch (error) {
      console.error('error = ', error);
    } finally {
      setIsLoading(false);
    }
  };
  const updateCartItem = (cartId, productId, newQty) => {
    const obj = {
      cartId,
      productId,
      qty: newQty,
    };

    if (newQty < 1) return; // 防止數量小於 1

    dispatch(updateCart(obj));
    dispatch(getCartList());
  };

  const addCartItem = async (productId, newQty) => {
    try {
      await dispatch(getCartList());
      const res = await axios.get(`/products/${productId}`);
      const product = res.data;
      const currentItem = carts.find((item) => {
        return item.title === product.title;
      });
      console.log('carts = ', carts);
      console.log('currentItem = ', currentItem);
      if (currentItem) {
        await updateCartItem(
          currentItem.id,
          currentItem.productId,
          newQty ? currentItem.qty + newQty : currentItem.qty + 1,
        );
        await dispatch(getCartList());
      } else {
        dispatch(
          addCart({
            productId: product.id,
            title: product.title,
            price: product.price,
            qty: newQty || 1,
            imageUrl: product.imageUrl,
          }),
        );
        await dispatch(getCartList());
      }
    } catch (error) {
      alertError(`加入購物車失敗: ${error.message}`);
    }
  };

  const handleAddCart = async (id, qty) => {
    setIsLoading(true);
    try {
      if (charitySet && charitySet.length > 0) {
        await Promise.all(
          charitySet.map((item) => {
            console.log('🛒 加入慈善商品: ', item);
            return addCartItem(item, 1);
          }),
        );
      }
      await addCartItem(id, qty);
    } catch (error) {
      alertError(error);
    } finally {
      setIsLoading(false);
      navigate('/cart')
    }
  };

  useEffect(() => {
    getCharityProducts();
  }, []);

  function handleCheckout() {
    //待串接中
  }

  async function handleToggleFavorite(id) {
    const obj = { userId: USER_ID, productId: id };
    const currentFavorite = favorites.find((item) => item.productId === id);
    if (currentFavorite) {
      await dispatch(removeFavorite(obj));
      setIsFavorite(false);
      setNotification('商品已從您的收藏清單移除');
    } else {
      await dispatch(addFavorite(obj));
      setIsFavorite(true);
      setNotification('商品已保存至您的收藏清單');
    }
    dispatch(getFavorites(USER_ID));
  }

  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  }, [notification]);

  function handleCount(countState) {
    setOrder((prevOrder) => ({
      ...prevOrder,
      productQty: Math.min(
        Math.max(prevOrder.productQty + countState, 1),
        productDetails.stock,
      ),
    }));
  }

  return (
    <>
      <div className="product-details">
        {notification !== null && (
          <Notification text={notification} key={notification} />
        )}
        <div className="container  p-0 ">
          <div className="row d-flex gx-lg-12 gx-0">
            <div className="product-img-list col-12 col-lg-6 position-relative ">
              {/* ==============手機板product-img-list-START=========================== */}
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
                    {productDetails?.imagesUrl?.map((img) => {
                      return (
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
                      );
                    })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#main-img"
                    data-bs-slide="prev"
                  >
                    <IoIosArrowBack className="d-block d-lg-none arrow arrow-left position-absolute fs-3 top-50 start-0 fs-3" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#main-img"
                    data-bs-slide="next"
                  >
                    <IoIosArrowForward className="d-block d-lg-none arrow arrow-right position-absolute fs-3 top-50 end-0 fs-3" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              {/* ==============手機板product-img-list-END=========================== */}
              {/* ==============電腦板product-img-list-START=========================== */}
              <div className="d-none d-lg-block">
                <div>
                  <img
                    src={productDetails.imageUrl}
                    alt=""
                    style={mainProdImgStyle()}
                  />
                </div>
                <ul className="d-none d-lg-grid p-0 mt-4 products-imgs">
                  {productDetails?.imagesUrl?.map((img) => {
                    return (
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
                    );
                  })}
                </ul>
              </div>
              {/* ==============電腦板product-img-list-END=========================== */}
            </div>
            <div className="col-12 col-lg-6 px-lg-8 px-3 py-lg-0 py-6 position-relative">
              {isFavorite ? (
                <FaHeart
                  className="d-block d-lg-none position-absolute heart "
                  onClick={() => handleToggleFavorite(productDetails.id)}
                />
              ) : (
                <FiHeart
                  className="d-block d-lg-none position-absolute heart "
                  onClick={() => handleToggleFavorite(productDetails.id)}
                />
              )}

              <h3 className="text-primary fw-medium mb-6 fs-2">
                {productDetails.title}
              </h3>
              <p className="mb-8">成分:麵粉、可可粉、糖</p>
              <p className="mb-8">{productDetails.description}</p>
              <p className="fs-2 price">
                <span>NT$</span>
                {productDetails.price}
              </p>
              <p className="mt-12 mb-3">數量</p>

              <div className="d-flex mb-12  count-container">
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
                  disabled={order.productQty === productDetails.stock}
                >
                  +
                </button>
              </div>

              <div className="charity-container">
                <div className="charity-title d-flex ailgn-items-center">
                  <span className="charity-icon fs-6 mx-3 ">+</span>
                  <span className="fs-7 bg-">加購公益專案</span>
                </div>
                <ul className="d-flex flex-column p-0">
                  {charityProducts.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="d-flex list-unstyled py-3 align-items-center gap-4 border px-4"
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
                    );
                  })}
                </ul>
              </div>

              <div className="mt-18 d-flex gap-4 mb-33">
                <button
                  className="d-none d-lg-flex btn btn-action-1 py-4 px-10"
                  onClick={() => handleToggleFavorite(productDetails.id)}
                  disabled={favoriteStatus === 'loading'}
                >
                  {isFavorite ? '移除收藏' : '收藏'}
                </button>

                <button
                  className="btn btn-action-2 py-4 "
                  onClick={() => {
                    handleAddCart(productDetails.id, order.productQty);
                  }}
                  disabled={isLoading === 'loading'}
                >
                  加入購物車
                </button>
                <button
                  className="btn btn-action-3 py-4 "
                  onClick={handleCheckout}
                >
                  直接購買
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="similar-items">
          <div className="container">
            <div className="row pt-18">
              <div className="col-12">
                <p className="title fs-5 mb-12">類似商品</p>

                {/* ========手機版similar-products-list-START====== */}
                <div className="d-block d-md-none text-center ">
                  <Swiper
                    spaceBetween={25}
                    slidesPerView={window.innerWidth > 450 ? 2 : 1}
                    loop={window.innerWidth > 450}
                  >
                    {similarProducts?.map((item) => {
                      return (
                        <SwiperSlide
                          key={item.id}
                          className="d-flex justify-content-center align-items-center flex-column"
                        >
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              height: '300px',
                              width: '300px',
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt=""
                              style={mainProdImgStyle('100%', '100%')}
                            />
                          </div>
                          <h3 className="fs-6 mt-4 mb-3">{item.title}</h3>
                          <p className="fs-7 mb-32">{item.description}</p>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                {/* ========手機版similar-products-list-END====== */}

                {/* ========電腦版similar-products-list-START====== */}
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
                    {similarProducts?.map((product) => {
                      return (
                        <li className="position-relative" key={product.id}>
                          <img src={product.imageUrl} alt="" />
                          <p className="mt-4 mb-3 text-dark">{product.title}</p>
                          <p>{product.description}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* ========電腦版similar-products-list-END====== */}

                {/* ============== */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
