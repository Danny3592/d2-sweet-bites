import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FiHeart } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// function productScroll() {
//   // const img =
// }

const ProductDetail = () => {
  return (
    <div className="product-details">
      <div className="container mt-4 p-0 ">
        <div className="row d-flex gx-lg-12 gx-0">
          <div className="col-12 col-lg-6 position-relative">
            <div className="d-block d-lg-none">
              <div
                id="main-img"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
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
            {/* ///////========================================================= */}

            <div className="d-none d-lg-block">
              <div>
                <img
                  src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                  alt=""
                  className="main-img"
                />
              </div>

              <ul className=" d-none d-lg-flex d-flex flex-row justify-content-between gap-4 p-0 mt-4">
                <li>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
                <li>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
                <li>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
                <li className="product-detail__img-sub">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
                <li className="product-detail__img-sub">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
                <li>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/b9a3/0c56/bec15389674facc9299147bb67d56f35?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=EQXLJAn1eKVc2atyQR1YtyT-tN9wVfwmIjp03UDQ85i-NX0WofiQIxWT4RLYYqBSuSwn0uaEYdEzlRisCo601CMxNxSEv3tFgbT3L9vE9ypQ9Jf3wUr8KzqFu2-~wVnOcpHUkmJBXqNdpTLSHt225yZfMUQfIPd1NjfqiP9jK9ar-00digEhX0YHdvQwYDPJNfSIbA1NkFeWvzHwblyVRk2F61rKjJ-S8vusEtDe4K6m92yu3qK857~kqC1XMtLE60lfpUQXN25Iw34sVeCAzuu9kFL0z7AdG8Szo860y0dl4xA6Sz8zhZj-F1rsl3lztvuPO0SkKcdE6bQ0MRxvEw__"
                    alt=""
                    className="sub-img"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6 px-lg-8 px-11 py-lg-0 py-6 position-relative">
            <FiHeart className="d-block d-lg-none position-absolute heart " />
            <h3 className="text-primary fw-medium mb-6 fs-2">幸福農可</h3>
            <p className="mb-8">成分:麵粉、可可粉、糖</p>
            <p className="mb-8">
              沉醉於極致濃郁的巧克力風味中，感受如絲般細膩的綿密口感。
              「幸福濃可」
              採用嚴選可可豆與頂級原料，經由幸享屋匠心打造，為您帶來難忘的甜蜜享受。
            </p>
            <p className="fs-2 price">
              <span>NT$</span>140
            </p>
            <p className="mt-12 mb-3">數量</p>

            <form>
              <div className="d-flex mb-12  count-container">
                <button className="btn-count">+</button>
                <div className="count w-100 text-center h-100 d-flex justify-content-center align-items-center">
                  <input type="hidden" name="quantity" value={1} />1
                </div>
                <button className="btn-count">-</button>
              </div>

              <div className="charity-container">
                <div className="charity-title d-flex ailgn-items-center">
                  <span className="charity-icon fs-6 mx-3 ">+</span>
                  <span className="fs-7 ">加購公益專案</span>
                </div>
                <ul className="d-flex flex-column p-0">
                  <li className="d-flex list-unstyled py-3 align-items-center gap-4 border px-4">
                    <div className="check-box"></div>
                    <div>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/2b72/8475/c08b44adcbb00a58114f5f74f67a7f16?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YeMlQVLKY9Q3y13XU7hjCsnR77rT5cVPeBSSWdKh67T3lsQZYKIhYi9AfyUSBeUj44fTDBwvgGj~bS6nXmL2h~aZhQn6vSpHCdVe6LBTrNMa2UH8pQ3ZNDSx8apn660oz3tz5PRt~seAmXepEs1GOvVN6NV9S-2Gg4hUkZDkzwKCQ3gR8hfZg0-Fbxfj05my~AkMZyoH52ai926mrdd-wcGgA8mj1A22dLlG-2Y2TCn2Xc4sj3lY~EoVBTW7LuCj8S6CY9ySaDp7vbSRKcEkYniibFRwRS88CImuG-4q~oBdtPrI7Itvxl-16uF7wMlBy432vGpjNjjDe0PZMgGrDw__"
                        alt=""
                        className="charity-img"
                      />
                    </div>
                    <div className="h-100 d-flex flex-column justify-content-between">
                      <p className="text-dark mb-6 fs-6">甜蜜助學專案</p>
                      <p className="text-primary fs-6">
                        <span className="fs-7 me-1">NT$</span>50
                      </p>
                    </div>
                  </li>
                  <li className="d-flex list-unstyled py-3 align-items-center gap-4 border px-4">
                    <div className="check-box"></div>
                    <div>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/2b72/8475/c08b44adcbb00a58114f5f74f67a7f16?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YeMlQVLKY9Q3y13XU7hjCsnR77rT5cVPeBSSWdKh67T3lsQZYKIhYi9AfyUSBeUj44fTDBwvgGj~bS6nXmL2h~aZhQn6vSpHCdVe6LBTrNMa2UH8pQ3ZNDSx8apn660oz3tz5PRt~seAmXepEs1GOvVN6NV9S-2Gg4hUkZDkzwKCQ3gR8hfZg0-Fbxfj05my~AkMZyoH52ai926mrdd-wcGgA8mj1A22dLlG-2Y2TCn2Xc4sj3lY~EoVBTW7LuCj8S6CY9ySaDp7vbSRKcEkYniibFRwRS88CImuG-4q~oBdtPrI7Itvxl-16uF7wMlBy432vGpjNjjDe0PZMgGrDw__"
                        alt=""
                        className="charity-img"
                      />
                    </div>
                    <div className="h-100 d-flex flex-column justify-content-between">
                      <p className="text-dark mb-6">甜蜜助學專案</p>
                      <p className="text-primary">
                        <span>NT$</span>50
                      </p>
                    </div>
                  </li>
                  <li className="d-flex list-unstyled py-3 align-items-center gap-4 border px-4">
                    <div className="check-box"></div>
                    <div>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/2b72/8475/c08b44adcbb00a58114f5f74f67a7f16?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YeMlQVLKY9Q3y13XU7hjCsnR77rT5cVPeBSSWdKh67T3lsQZYKIhYi9AfyUSBeUj44fTDBwvgGj~bS6nXmL2h~aZhQn6vSpHCdVe6LBTrNMa2UH8pQ3ZNDSx8apn660oz3tz5PRt~seAmXepEs1GOvVN6NV9S-2Gg4hUkZDkzwKCQ3gR8hfZg0-Fbxfj05my~AkMZyoH52ai926mrdd-wcGgA8mj1A22dLlG-2Y2TCn2Xc4sj3lY~EoVBTW7LuCj8S6CY9ySaDp7vbSRKcEkYniibFRwRS88CImuG-4q~oBdtPrI7Itvxl-16uF7wMlBy432vGpjNjjDe0PZMgGrDw__"
                        alt=""
                        className="charity-img"
                      />
                    </div>
                    <div className="h-100 d-flex flex-column justify-content-between">
                      <p className="text-dark mb-6 fs-6">甜蜜助學專案</p>
                      <p className="text-primary">
                        <span>NT$</span>50
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-18 d-flex gap-4 mb-33">
                <button className="d-none d-lg-flex btn btn-action-1 py-4 px-10">
                  收藏
                </button>
                <button className="btn btn-action-2 py-4 ">加入購物車</button>
                <button className="btn btn-action-3 py-4 ">直接購買</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="similar-items">
        <div className="container">
          <div className="row pt-18">
            <div className="col-12">
              {/* ========================= */}
              <div className="d-block d-lg-none text-center">
                <Swiper
                  spaceBetween={25}
                  slidesPerView={1.5}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide>
                    <div>
                      <div>
                        <img
                          className="w-100"
                          src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                          alt=""
                        />
                      </div>
                      <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                      <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <div>
                        <img
                          className="w-100"
                          src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                          alt=""
                        />
                      </div>
                      <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                      <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <div>
                        <img
                          className="w-100"
                          src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                          alt=""
                        />
                      </div>
                      <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                      <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <div>
                        <img
                          className="w-100"
                          src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                          alt=""
                        />
                      </div>
                      <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                      <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              {/* ========================= */}

              {/* ////////////////////////////////////////////////////////////////////////// */}
              <div className="d-none d-lg-block">
                <p className="title fs-5 mb-12">類似商品</p>
                <div className="d-flex gap-6 text-center">
                  <div>
                    <div>
                      <img
                        className="w-100"
                        src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                        alt=""
                      />
                    </div>
                    <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                    <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                  </div>

                  <div>
                    <div>
                      <img
                        className="w-100"
                        src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                        alt=""
                      />
                    </div>
                    <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                    <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                  </div>
                  <div>
                    <div>
                      <img
                        className="w-100"
                        src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                        alt=""
                      />
                    </div>
                    <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                    <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                  </div>
                  <div>
                    <div>
                      <img
                        className="w-100"
                        src="https://s3-alpha-sig.figma.com/img/cbfa/aa47/ffee798ed3f5084201659516374801ab?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j6-eHYt8LXW0dLyU-GiFETLjOPbxJlGuPfNPeUoisRZQenGefDaScYKd5u1dNfHel0Fe817rWGFQKux63QF4tQVVkWDpNEu5wMBItM4lhfpF1m1L6GHf15xkNYClPepUUSR0od6q6e0NOegkHeZDkUzDynEaqI5dWEZ978f8LR~9FRb-9OaYj-LwRSAKxOjhPqp54lv9Sq~kJo-qSQT~mppgeih1ZQsd~u0xAoQ0X-0W69Klh-Mun6wud4Gxra3YrIqULtFarDCHcaDSD91e~hbHcIFak3oW3UJBzFaI3DKfx4z7Tv7fqvcLtgBXyKwl-cWvSo69A34jWmnwLQB9dg__"
                        alt=""
                      />
                    </div>
                    <h3 className="fs-6 mt-4 mb-3">莓舞輕雲</h3>
                    <p className="fs-7 mb-32">棉花糖的輕盈與莓果的跳躍感</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
