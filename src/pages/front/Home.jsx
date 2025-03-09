import charityHeart from '../../assets/images/index-charity/heart.png';
import charityHeartSmall from '../../assets/images/index-charity/heart_mobile.png';
import charityCorner from '../../assets/images/index-charity/corner.png';
import charityPlanKid from '../../assets/images/index-charity/donation01_kids.png';
import charityPlanPet from '../../assets/images/index-charity/donation02_pets.png';
import charityPlanTrees from '../../assets/images/index-charity/donation03_trees.png';
import charitySchoolIcon from '../../assets/images/index-charity/school.png';
import charityDogIcon from '../../assets/images/index-charity/dog.png';
import charityPlantIcon from '../../assets/images/index-charity/plant.png';

import thanksAchievement from '../../assets/images/index-charity/achievement_background.svg';
import thanksJoin from '../../assets/images/index-charity/join_background.svg';

import buttonIconBrown from '../../assets/images/icons/button-arrow-brown.png';
import buttonIconWhite from '../../assets/images/icons/button-arrow-white.png';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts, selectProducts } from '../../slice/productSlice';
import { getNews, selectNews } from '../../slice/newsSlice';
import { useEffect } from 'react';
import CardProduct from '../../components/front/CardProduct';
import { getRandomProducts } from '../../../util/tools';
import AOS from 'aos';
import 'aos/dist/aos.css'; // 引入 AOS 樣式

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const randomProducts = getRandomProducts(products, 4);
  const news = useSelector(selectNews);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNews());
    AOS.init({
      duration: 1000, // 動畫持續時間 (毫秒)
      once: true, // 滑動回到頂部時不會再次觸發
      easing: 'ease-in', // 動畫效果
    });
  }, []);
  return (
    <main>
      <section className="index-banner d-flex justify-content-center flex-column  w-100">
        <div className="container banner-container">
          <div className="row">
            <div className="col-10 col-sm-12">
              <h1 className="heading fs-lg-1 fs-3">
                <span>甜點，</span>幸福的起點
              </h1>
              <h4 className="sub-heading mt-6 fs-7">
                讓每一份甜點，成為傳遞幸福的橋樑 ——— 幸福，也可以共享
              </h4>
              <div className="mt-18 mt-8 btn-container">
                <Link to="/product-list">
                  <button className="btn btn--main bg-primary-600 me-sm-5 px-sm-11">
                    開啟幸福之旅
                    <img
                      src={buttonIconWhite}
                      alt="buttonIconWhie"
                      className="ms-4 btn--main-img"
                    />
                  </button>
                </Link>
                <Link to="/product-list">
                  <button className="btn  btn--sub border border-primary px-sm-11 ">
                    一起改變世界
                    <img
                      src={buttonIconWhite}
                      alt="buttonIconWhie"
                      className="btn--sub-img"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index-recommend pb-18 pb-lg-53">
        <div className="container">
          <div className="row recommend-row-title">
            <div className="col-12 recommend-col">
              <h2 className="recommend-main-title"
                data-aos="fade-up">
                {/* 手機版顯示三行 */}
                <span className="d-block d-md-none">
                  <span className="recommend-line1 fw-medium">甜蜜推薦</span>
                  <span className="recommend-comma fw-medium">，</span>
                  <span className="recommend-line2 fw-medium">
                    讓心動更靠近
                  </span>
                </span>

                {/* 桌面版顯示單行 */}
                <span className="d-none d-md-block fw-medium">
                  甜蜜推薦，讓心動更靠近!
                </span>
              </h2>

              <p className="recommend-sub-title d-block d-md-none"
                data-aos="fade-up">
                <span className="d-block">嚴選美味，專屬您的甜點時光！</span>
                <span className="d-block">
                  每一款都是我們的用心之作，帶來甜蜜的驚喜與幸福。
                </span>
                <span className="d-block">
                  讓這些精緻甜點為您的每一天增添更多美好。
                </span>
              </p>

              <p className="recommend-sub-title d-none d-md-block"
                data-aos="fade-up">
                <span className="d-block">
                  嚴選美味，專屬您的甜點時光！每一款都是我們的用心之作，帶來甜蜜的驚喜與幸福。
                </span>
                <span className="d-block">
                  讓這些精緻甜點為您的每一天增添更多美好。
                </span>
              </p>
            </div>
          </div>
          <div className="row gy-12">
            { randomProducts.map((product, index) => (
              <div className="col-lg-3 col-md-6 col-12"
                key={product.id}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}>
                <CardProduct product={product}>
                  <p className='py-3 px-4 text-center'>
                    {product.description}
                  </p>
                </CardProduct>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="index-news py-18 py-lg-36">
        <div className="container">
          <h2 className="fs-3 fs-lg-2 mb-4 text-primary-800"
            data-aos="fade-up">
            最新消息
          </h2>
          <p className="mb-12 mb-lg-32"
            data-aos="fade-up">
            探索最新公益成果，與我們一起改變世界。
          </p>
          { news.length > 0 && (
            <div className="row mb-12">
              <div className="col-md-6 mb-6 mb-md-0"
                data-aos="fade-up">
                <div className="index-news__card position-relative pb-6 pb-md-0 border-bottom border-gray-400 border-bottom-md-0">
                  <div className="img-container overflow-hidden h-xl-472px mb-2 mb-lg-3">
                    <img
                      className="object-fit-cover w-100 h-100"
                      src={news[0].image}
                      alt="newsImages1"
                    />
                  </div>
                  <p className="text-gray-700 fs-8 mb-2 mb-lg-3">
                    { news[0].create_at }
                  </p>
                  <h3 className="fs-6 fs-lg-4 text-dark mb-2 mb-lg-3">
                    { news[0].title }
                  </h3>
                  <Link
                    to={`/news-detail/${news[0].id}`}
                    className="text-gray-700 fs-8 fs-lg-7 stretched-link"
                  >
                    { news[0].description }
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="index-news__card position-relative pb-6 border-bottom border-gray-400">
                  <div className="row"
                    data-aos="fade-up"
                    data-aos-delay={100}>
                    <div className="col-md-6">
                      <div className="img-container overflow-hidden">
                        <img
                          className="object-fit-cover w-100 h-100 mb-2 mb-md-0"
                          src={news[1].image}
                          alt="newsImages1"
                        />
                      </div>
                    </div>
                    <div className="col ps-lg-1">
                      <p className="text-gray-700 fs-8 mb-2">
                        { news[1].create_at }
                      </p>
                      <h3 className="fs-6 fs-md-7 text-dark fs-lg-6 mb-2">
                        { news[1].title }
                      </h3>
                      <Link to={`/news-detail/${news[1].id}`}
                        className="text-gray-700 fs-8 stretched-link">
                        { news[1].description }
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="index-news__card position-relative pt-6">
                  <div className="row"
                    data-aos="fade-up"
                    data-aos-delay={150}>
                    <div className="col-md-6">
                      <div className="img-container overflow-hidden">
                        <img
                          className="object-fit-cover w-100 h-100 mb-2 mb-md-0"
                          src={ news[2].image }
                          alt="newsImages1"
                        />
                      </div>
                    </div>
                    <div className="col ps-lg-1">
                      <p className="text-gray-700 fs-8 mb-2">
                        { news[2].create_at }
                      </p>
                      <h3 className="fs-6 fs-md-7 fs-lg-6 text-dark mb-2">
                        { news[2].title }
                      </h3>
                      <Link to={`/news-detail/${news[2].id}`}
                        className="text-gray-700 fs-8 stretched-link">
                        { news[2].description }
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center justify-content-md-end">
            <Link to="news-list"
              className="btn btn-arrow text-primary-600 text-primary-700-hover pe-lg-0">
              <span className="me-4">全部消息</span>
              <img className="arrow-icon"
                src={buttonIconBrown}
                alt="buttonIconWhie" />
            </Link>
          </div>
        </div>
      </section>
      <section className="index-charity">
        <div className="index-charity-title pt-6 pt-md-12">
          <div className="container text-center position-relative">
            <h2 className="fs-3 fs-lg-2 mb-4 text-primary-800"
              data-aos="fade-up">
              幸福共享專案
            </h2>
            <p className="text-gray-800 mb-4 mb-md-0"
              data-aos="fade-up">
              購買甜點，選擇捐款方案，讓幸福也可以共享。
            </p>
            <picture className="heart-icon mb-2 mb-md-0">
              <source srcSet={charityHeart} media="(min-width: 796px)" />
              <img src={charityHeartSmall} />
            </picture>
            <img
              src={charityCorner}
              alt="corner"
              className="position-absolute start-50 translate-middle-x"
              style={{
                top: '97%',
              }}
            />
          </div>
        </div>
        <ul className="index-charity-plans d-flex flex-column flex-md-row justify-content-center pt-md-24 list-unstyled px-0">
          <li className="index-charity-plan position-relative mt-12 mt-md-0 mb-2 mb-md-0 me-md-2"
            data-aos="fade-up">
            <Link to="/charity/甜蜜助學計畫"
             className='stretched-link'>
              <div className="w-100 h-100 overflow-hidden">
                <img
                  className="main-img w-100 h-100 object-fit-cover"
                  src={charityPlanKid}
                  alt=""
                />
              </div>
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <div className="text-content">
                  <img src={charitySchoolIcon} alt="" />
                  <h3>甜蜜助學計畫</h3>
                  <p>捐助營養餐</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="index-charity-plan position-relative mb-2 mb-md-0 me-md-2"
            data-aos="fade-up"
            data-aos-delay={100}
            >
            <Link to="/charity/幸福愛寵行動"
              className='stretched-link'>
              <div className="w-100 h-100 overflow-hidden">
                <img
                  className="main-img w-100 h-100 object-fit-cover"
                  src={charityPlanPet}
                  alt=""
                />
              </div>
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <div className="text-content">
                  <img src={charityDogIcon} alt="" />
                  <h3>幸福愛寵行動</h3>
                  <p>捐助罐罐</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="index-charity-plan position-relative"
            data-aos="fade-up"
            data-aos-delay={150}>
            <Link to="/charity/綠色希望專案"
              className='stretched-link'>
              <div className="w-100 h-100 overflow-hidden">
                <img
                  className="main-img w-100 h-100 object-fit-cover"
                  src={charityPlanTrees}
                  alt=""
                />
              </div>
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <div className="text-content">
                  <img src={charityPlantIcon} alt="" />
                  <h3>綠色希望專案</h3>
                  <p>保護環境永續</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <section className="index-thanks">
        <div className="index-thanks-title container text-white pt-18 pt-lg-36">
          <h2 className="fs-3 fs-lg-2 mb-6 mb-lg-4"
            data-aos="fade-up">
            感謝有您
          </h2>
          <p className="fs-8 fs-lg-7 mb-2"
            data-aos="fade-up">
            您的每一次捐款，都是一個幸福的故事。
          </p>
          <p className="fs-8 fs-lg-7"
            data-aos="fade-up">
            在這裡，我們記錄每一份善意，分享每一個改變的瞬間。
          </p>
        </div>
        <div className="container">
          <ul className="list-unstyled row flex-column g-4 align-items-center align-items-md-start ps-0 flex-md-row mt-12 mt-lg-20 noto-serif-tc"
            data-aos="fade-up">
            <li className="col text-center text-black position-relative mt-md-50">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">
                  <span className="fs-2 text-primary-800">300</span>多隻
                </p>
                <p className='fw-medium'>流浪動物得到溫暖</p>
              </div>
            </li>
            <li className="col text-center text-black position-relative">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6 fw-medium">已募集愛心</p>
                <p>
                  <span className="fs-2 text-primary-800">800,000</span>元
                </p>
              </div>
            </li>
            <li className="col text-center text-black position-relative mt-md-50">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">
                  <span className="fs-2 text-primary-800">500</span>位
                </p>
                <p className='fw-medium'>弱勢兒童得到營養</p>
              </div>
            </li>
            <li className="col text-center text-black position-relative">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">
                  <span className="fs-2 text-primary-800">200</span>顆
                </p>
                <p className='fw-medium'>新種植的樹木</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div className="index-thanks-join position-relative">
        <img
          className="position-absolute top-0 start-50 translate-middle"
          src={thanksJoin}
          alt=""
        />
        <div className="w-100 text-white text-center position-absolute top-0 start-50 translate-middle">
          <p className="mb-3">想要加入愛心行列嗎？</p>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <p>現在就</p>
            <Link
              className="text-decoration-underline btn btn-primary-500 text-white p-2 rounded-pill"
              to="/product-list"
            >
              購買甜點
            </Link>
            <p>、</p>
            <Link
              className="text-decoration-underline btn btn-primary-500 text-white p-2 rounded-pill"
              to="/charity"
            >
              選擇共享方案
            </Link>
          </div>
          <p>一起分享幸福！</p>
        </div>
      </div>
    </main>
  );
}
