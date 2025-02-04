import strawberryImg from "../../assets/images/index-recommend/cake01_berry.png";
import peachImg from "../../assets/images/index-recommend/cake02_peach.png";
import chocolateImg from "../../assets/images/index-recommend/cake03_chocolate.png";
import lemonImg from "../../assets/images/index-recommend/cake04_lemon.png";

export default function Home() {
  return (
    <main>
      <section className="index-banner"></section>

      <section className="index-recommend">
        <div className="container ">
          <div class="row recommend-row-title">
            <div class="col-12 recommend-col">
              <h1 className="recommend-main-title">
                {/* 手機版顯示三行 */}
                <span className="d-block d-md-none">
                  <span className="recommend-line1">甜蜜推薦</span>
                  <span className="recommend-comma">，</span>
                  <span className="recommend-line2">讓心動更靠近</span>
                </span>

                {/* 桌面版顯示單行 */}
                <span className="d-none d-md-block">
                  甜蜜推薦，讓心動更靠近!
                </span>
              </h1>

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
                  <div className="recommend-product-name">莓好時光</div>
                  <div className="recommend-product-description">
                    主打草莓搭配綿密口感的鮮奶油，傳遞甜蜜美好。
                  </div>
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
                  <div className="recommend-product-name">蜜桃初戀</div>
                  <div className="recommend-product-description">
                    適合喜歡果味或果粒口感的甜點，柔美而帶點驚喜。
                  </div>
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
                  <div className="recommend-product-name">榛心醇意</div>
                  <div className="recommend-product-description">
                    榛果與濃郁純巧克力的搭配，濃郁又帶一點微醺的香氣。
                  </div>
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
                  <div className="recommend-product-name">檸檬輕舞</div>
                  <div className="recommend-product-description">
                    適合清新系甜點，如檸檬塔或檸檬蛋糕，清爽又怡人。
                  </div>
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

      <section className="index-charity"></section>

      <section className="index-banner-font"></section>
    </main>
  );
}
