import chevronLeft from "../../src/assets/images/news-list/chevron-left.svg";
import chevronRight from "../../src/assets/images/news-list/chevron-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function NewsSwiper({ carouselData }) {
  return (
    <div className="news-section">
      <div className="container px-0 px-sm-3">
        <Swiper
          loop={true}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mySwiper "
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
        >
          {carouselData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="slide-container">
                <img
                  src={item.image}
                  alt={`Slide ${item.id}`}
                  className="slide-image"
                />
                <div className="overlay"></div>
                <h1 className="slide-title position-absolute text-start fw-bold ps-3 ps-md-12 fs-5 fs-md-2 text-white">
                  {item.description}
                </h1>

                {/* 導航按鈕緊貼圖片內側 */}
                <div className="custom-swiper-button-prev d-flex top-50 position-absolute rounded-0 align-items-center justify-content-center">
                  <img src={chevronLeft} alt="Previous" />
                </div>
                <div className="custom-swiper-button-next d-flex top-50 position-absolute rounded-0 align-items-center justify-content-center">
                  <img src={chevronRight} alt="Next" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* pagination 位置調整 */}
        <div className="swiper-pagination my-0 my-md-18 d-none d-md-block text-md-center position-relative"></div>
      </div>
    </div>
  );
}
