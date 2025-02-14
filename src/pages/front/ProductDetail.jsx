import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CharityCard from '../../components/front/product-detail/CharityCard';
import { CHARITY_DATA } from '../../../util/charityData';
import Notification from '../../components/front/product-detail/Notification';
// import {
//   mainProdImgStyle,
//   similarProdsImgStyle,
// } from '../../components/front/product-detail/product-detail-style';



const mainProdImgStyle = (width, height, isCover = true) => {
  return {
    width: width ? width : '100%',
    maxHeight: height ? height : '635px',
    objectFit: isCover ? 'cover' : undefined,
  };
};

const similarProdsImgStyle = (productLength) => {
  return {
    left: '0px',
    display: 'grid',
    gridTemplateColumns: `repeat(${productLength}, 306px)`,
    columnGap: '24px',
    whiteSpace: 'nowrap',
    transitionDuration: '0.5s',
  };
};

//============負責處理類似商品區的輪播效果============

const handleSlideImg = (direction, length) => {
  const moveRange = 400;
  const imgList = document.querySelector('.get-slide');
  const limit = (length - 4) * 330; //滾動極限位置 (一次會顯示四組商品所以減4)

  if (imgList) {
    const currentLeft = parseInt(imgList.style.left || '0');

    if (direction === 'right') {
      if (Math.abs(currentLeft) > limit) {
        //若到達極限位置回到起始點
        imgList.style.left = `${0}px`;
      } else {
        imgList.style.left = `${currentLeft - moveRange}px`;
      }
      return;
    }
    if (direction === 'left') {
      if (Math.abs(currentLeft) <= 0) {
        imgList.style.left = `${0}px`;
      } else {
        imgList.style.left = `${currentLeft + moveRange}px`;
      }
      return;
    }
  }
};

//============負責處理類似商品區的輪播效果============
const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [order, setOrder] = useState({
    id: '',
    productQty: 1,
    charityPlan: [],
  });
  const [isNotification,setIsNotification] = useState(null)

  useEffect(() => {
    async function getProductDetails(id) {
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
          id: product.id,
          productQty: 1,
          charityPlan: [],
        });
      } catch (error) {
        console.error('error = ', error);
      }
    }
    getProductDetails(productId);
  }, [productId]);

  function handleCheckout() {
    console.log(order)
  }
  function handleAddToCart() {
    console.log(order)
    setIsNotification('商品已加入購物車')
    setTimeout(() => {
      setIsNotification(null)
    }, 1500);
  }
  function handleAddToFavorite() {
    console.log(productDetails.id)
    setIsNotification('商品已保存至您的收藏清單')
    setTimeout(() => {
      setIsNotification(null)
    }, 1500);
  }

  function handleCount(countState) {
    setOrder((prevOrder) => ({
      ...prevOrder,
      productQty: Math.min(
        Math.max(prevOrder.productQty + countState, 1),
        productDetails.stock
      ),
    }));
  }

  return (
    <div className="product-details">
      {isNotification!==null && <Notification />}

      <div className="container mt-4 p-0 ">
        <div className="row d-flex gx-lg-12 gx-0">
          <div className="col-12 col-lg-6 position-relative">
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
                      onClick={() => {
                        setMainImage(img);
                      }}
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
          <div className="col-12 col-lg-6 px-lg-8 px-11 py-lg-0 py-6 position-relative">
            <FiHeart className="d-block d-lg-none position-absolute heart " />
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
                onClick={() => handleCount(1)}
                disabled={order.productQty === productDetails.stock}
              >
                +
              </button>
              <div className="count w-100 text-center h-100 d-flex justify-content-center align-items-center">
                {order.productQty}
              </div>
              <button
                className="btn-count"
                onClick={() => handleCount(-1)}
                disabled={order.productQty === 1}
              >
                -
              </button>
            </div>

            <div className="charity-container">
              <div className="charity-title d-flex ailgn-items-center">
                <span className="charity-icon fs-6 mx-3 ">+</span>
                <span className="fs-7 ">加購公益專案</span>
              </div>
              <ul className="d-flex flex-column p-0">
                {CHARITY_DATA.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="d-flex list-unstyled py-3 align-items-center gap-4 border px-4"
                    >
                      <CharityCard
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        img={item.img}
                        setOrder={setOrder}
                        order={order}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-18 d-flex gap-4 mb-33">
              <button className="d-none d-lg-flex btn btn-action-1 py-4 px-10" onClick={handleAddToFavorite}>
                收藏
              </button>
              <button
                className="btn btn-action-2 py-4 "
                onClick={handleAddToCart}
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
              <div className="d-block d-lg-none text-center ">
                <Swiper spaceBetween={25} slidesPerView={1}>
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
              <div className="d-none d-lg-block text-center similar-container">
                <IoIosArrowBack
                  className="d-none d-lg-block arrow arrow-left fs-3"
                  onClick={() => handleSlideImg('left', similarProducts.length)}
                />
                <IoIosArrowForward
                  className="d-none d-lg-block arrow arrow-right fs-3"
                  onClick={() =>
                    handleSlideImg('right', similarProducts.length)
                  }
                />
                <ul
                  className="similar-products-imgs mb-32 position-relative get-slide"
                  style={similarProdsImgStyle(similarProducts.length)}
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
  );
};

export default ProductDetail;
