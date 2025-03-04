import strawberryImg from '../../assets/images/index-recommend/cake01_berry.png';
import peachImg from '../../assets/images/index-recommend/cake02_peach.png';
import chocolateImg from '../../assets/images/index-recommend/cake03_chocolate.png';
import lemonImg from '../../assets/images/index-recommend/cake04_lemon.png';

import newsImages1 from '../../assets/images/index-news/news01_cakes.png';
import newsImages2 from '../../assets/images/index-news/news02_pets.png';
import newsImages3 from '../../assets/images/index-news/news03_trees.png';

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

export default function Home() {
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
                <button className="btn btn--main bg-primary-600 me-sm-5 px-sm-11">
                  開啟幸福之旅
                  <img
                    src={buttonIconWhite}
                    alt="buttonIconWhie"
                    className="ms-4 btn--main-img"
                  />
                </button>
                <button className="btn  btn--sub border border-primary px-sm-11 ">
                  一起改變世界
                  <img src={buttonIconWhite} alt="buttonIconWhie" className='btn--sub-img' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index-recommend">
        <div className="container ">
          <div className="row recommend-row-title">
            <div className="col-12 recommend-col">
              <h2 className="recommend-main-title">
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

              <p className="recommend-sub-title d-block d-md-none">
                <span className="d-block">嚴選美味，專屬您的甜點時光！</span>
                <span className="d-block">
                  每一款都是我們的用心之作，帶來甜蜜的驚喜與幸福。
                </span>
                <span className="d-block">
                  讓這些精緻甜點為您的每一天增添更多美好。
                </span>
              </p>

              <p className="recommend-sub-title d-none d-md-block">
                <span className="d-block">
                  嚴選美味，專屬您的甜點時光！每一款都是我們的用心之作，帶來甜蜜的驚喜與幸福。
                </span>
                <span className="d-block">
                  讓這些精緻甜點為您的每一天增添更多美好。
                </span>
              </p>
            </div>
          </div>

          <div className="row recommend-row-image">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="recommend-product-card">
                <div className="image-wrapper">
                  <img src={strawberryImg} alt="莓好時光" />
                  <button className="recommend-btn-cart">加入購物車</button>
                </div>
                <div className="recommend-product-info">
                  <h3 className="recommend-product-name">莓好時光</h3>
                  <p className="recommend-product-description">
                    主打草莓搭配綿密口感的鮮奶油，傳遞甜蜜美好。
                  </p>
                  <div className="recommend-product-price">
                    <span className="recommend-currency">NT$</span>
                    <span className="recommend-amount">600</span>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-lg-3 col-md-6 col-12">
              <div className="recommend-product-card">
                <div className="image-wrapper">
                  <img src={peachImg} alt="蜜桃初戀" />
                  <button className="recommend-btn-cart">加入購物車</button>
                </div>
                <div className="recommend-product-info">
                  <h3 className="recommend-product-name">蜜桃初戀</h3>
                  <p className="recommend-product-description">
                    適合喜歡果味或果粒口感的甜點，柔美而帶點驚喜。
                  </p>
                  <div className="recommend-product-price">
                    <span className="recommend-currency">NT$</span>
                    <span className="recommend-amount">560</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="recommend-product-card">
                <div className="image-wrapper">
                  <img src={chocolateImg} alt="榛心醇意" />
                  <button className="recommend-btn-cart">加入購物車</button>
                </div>
                <div className="recommend-product-info">
                  <h3 className="recommend-product-name">榛心醇意</h3>
                  <p className="recommend-product-description">
                    榛果與濃郁純巧克力的搭配，濃郁又帶一點微醺的香氣。
                  </p>
                  <div className="recommend-product-price">
                    <span className="recommend-currency">NT$</span>
                    <span className="recommend-amount">800</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="recommend-product-card">
                <div className="image-wrapper">
                  <img src={lemonImg} alt="檸檬輕舞" />
                  <button className="recommend-btn-cart">加入購物車</button>
                </div>
                <div className="recommend-product-info mb-6">
                  <h3 className="recommend-product-name">檸檬輕舞</h3>
                  <p className="recommend-product-description">
                    適合清新系甜點，如檸檬塔或檸檬蛋糕，清爽又怡人。
                  </p>
                  <div className="recommend-product-price">
                    <span className="recommend-currency">NT$</span>
                    <span className="recommend-amount">500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="index-news py-18 py-lg-36">
        <div className="container">
          <h2 className="fs-3 fs-lg-2 mb-4 text-primary-800">最新消息</h2>
          <p className="mb-12 mb-lg-32">
            探索最新公益成果，與我們一起改變世界。
          </p>
          <div className="row mb-12">
            <div className="col-md-6 mb-6 mb-md-0">
              <div className="index-news__card position-relative pb-6 pb-md-0 border-bottom border-gray-400 border-bottom-md-0">
                <img
                  className="object-fit-cover w-100 mb-2 mb-lg-3 h-xl-472px"
                  src={newsImages1}
                  alt="newsImages1"
                />
                <p className="text-gray-700 fs-8 mb-2 mb-lg-3">
                  2024 年 12 月 24 日
                </p>
                <h3 className="fs-6 fs-lg-4 mb-2 mb-lg-3">
                  一起分享幸福，送出500份溫暖餐點！
                </h3>
                <a
                  href="#"
                  className="text-gray-700 fs-8 fs-lg-7 stretched-link"
                >
                  您的甜點，正在改變世界。
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="index-news__card position-relative pb-6 border-bottom border-gray-400">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="object-fit-cover w-100 mb-2 mb-md-0"
                      src={newsImages2}
                      alt="newsImages1"
                    />
                  </div>
                  <div className="col ps-lg-1">
                    <p className="text-gray-700 fs-8 mb-2">
                      2024 年 9 月 28 日
                    </p>
                    <h3 className="fs-6 fs-md-7 fs-lg-6 mb-2">
                      小甜點，大愛心，為毛孩帶來滿滿能量！
                    </h3>
                    <a href="#" className="text-gray-700 fs-8 stretched-link">
                      和幸享屋一起，讓流浪毛孩不再挨餓！
                    </a>
                  </div>
                </div>
              </div>
              <div className="index-news__card position-relative pt-6">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      className="object-fit-cover w-100 mb-2 mb-md-0"
                      src={newsImages3}
                      alt="newsImages1"
                    />
                  </div>
                  <div className="col ps-lg-1">
                    <p className="text-gray-700 fs-8 mb-2">
                      2024 年 3 月 21 日
                    </p>
                    <h3 className="fs-6 fs-md-7 fs-lg-6 mb-2">
                      甜點與地球同行，種下100棵新希望！
                    </h3>
                    <a href="#" className="text-gray-700 fs-8 stretched-link">
                      甜點與綠意同行，我們和地球都感謝您！
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-md-end">
            <a href="#" className="btn text-primary-600 pe-lg-0">
              <span className="me-4">全部消息</span>
              <img src={buttonIconBrown} alt="buttonIconWhie" />
            </a>
          </div>
        </div>
      </section>
      <section className="index-charity">
        <div className="index-charity-title pt-6 pt-md-12">
          <div className="container text-center position-relative">
            <h2 className="fs-3 fs-lg-2 mb-4 text-primary-800">幸福共享專案</h2>
            <p className="text-gray-800 mb-4 mb-md-0">
              購買甜點，選擇捐款方案，讓幸福也可以共享。
            </p>
            <picture className="mb-2 mb-md-0">
              <source srcSet={charityHeart} media="(min-width: 796px)" />
              <img src={charityHeartSmall} />
            </picture>
            <img
              src={charityCorner}
              alt="corner"
              className="position-absolute top-100 start-50 translate-middle-x"
            />
          </div>
        </div>
        <ul className="index-charity-plans d-flex flex-column flex-md-row justify-content-center pt-md-24 list-unstyled px-0">
          <li className="index-charity-plan position-relative mt-12 mt-md-0 mb-2 mb-md-0 me-md-2">
            <Link to='/charity/甜蜜助學計畫'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanKid}
                alt=""
              />
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charitySchoolIcon} alt="" />
                <h3>甜蜜助學計畫</h3>
                <p>捐助營養餐</p>
              </div>
            </Link>
          </li>
          <li className="index-charity-plan position-relative mb-2 mb-md-0 me-md-2">
            <Link to='/charity/幸福愛寵行動'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanPet}
                alt=""
              />
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charityDogIcon} alt="" />
                <h3>幸福愛寵行動</h3>
                <p>捐助罐罐</p>
              </div>
            </Link>
          </li>
          <li className="index-charity-plan position-relative">
            <Link to='/charity/綠色希望專案'>
              <img
                className="w-100 h-100 object-fit-cover"
                src={charityPlanTrees}
                alt=""
              />
              <div className="index-charity-plan-content position-absolute top-50 start-50 translate-middle text-white text-center z-1">
                <img src={charityPlantIcon} alt="" />
                <h3>綠色希望專案</h3>
                <p>保護環境永續</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
      <section className="index-thanks">
        <div className="index-thanks-title container text-white pt-18 pt-lg-36">
          <h2 className="fs-3 fs-lg-2 mb-6 mb-lg-4">感謝有您</h2>
          <p className="fs-8 fs-lg-7 mb-2">
            您的每一次捐款，都是一個幸福的故事。
          </p>
          <p className="fs-8 fs-lg-7">
            在這裡，我們記錄每一份善意，分享每一個改變的瞬間。
          </p>
        </div>
        <div className="container">
          <ul className="list-unstyled row flex-column g-4 align-items-center align-items-md-start ps-0 flex-md-row mt-12 mt-lg-20">
            <li className="col text-center text-black position-relative mt-md-50">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">
                  <span className="fs-2 text-primary-800">300</span>多隻
                </p>
                <p>流浪動物得到溫暖</p>
              </div>
            </li>
            <li className="col text-center text-black position-relative">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">已募集愛心</p>
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
                <p>弱勢兒童得到營養</p>
              </div>
            </li>
            <li className="col text-center text-black position-relative">
              <img src={thanksAchievement} alt="" />
              <div className="fs-6 position-absolute top-50 start-50 translate-middle">
                <p className="mb-6">
                  <span className="fs-2 text-primary-800">200</span>顆
                </p>
                <p>新種植的樹木</p>
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
