import React from 'react';

const ProductImageList = () => {
  return (
    <>
      <div className="col-12 col-lg-6 position-relative">
        {/* ==============手機板product-img-list-START=========================== */}
        <div className="d-block d-lg-none">
          <div id="main-img" className="carousel slide" data-bs-ride="carousel">
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
    </>
  );
};

export default ProductImageList;
