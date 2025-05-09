import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { alertError } from "../../../util/sweetAlert";
import Loading from "@/components/Loading";
import NewsSwiper from "@/components/NewsSwiper";
import Breadcrumb from "@/components/front/Breadcrumb";
import buttonIconBrown from '@/assets/images/icons/button-arrow-brown.png';
import arrowWhite from "@/assets/images/news-list/arrow_right_white.svg";

export default function NewsList() {
  // breadcrumb 路徑
  const breadcrumbPath = [
    {
      path: "/news-list",
      name: "最新消息",
    },
  ];

  // 搜尋
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [searchNewsList, setSearchNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //carousel
  const [carouselData, setCarouselData] = useState([]);

  //取得carousel的資料getCarouselNews
  const getCarouselNews = async () => {
    setIsLoading(true); //
    try {
      let url = `/news?_page=1&_limit=6`;
      const res = await axios.get(url);
      const filteredData = res.data
        .filter((news) => news.isPublic === 1)
        .map(({ id, image, description }) => ({
          id,
          image,
          description,
        }));

      setCarouselData(filteredData);
    } catch {
      alertError("無法載入最新消息");
    } finally {
      setIsLoading(false);
    }
  };

  // 搜尋最新消息
  const searchNews = () => {
    getNews({ page: 1, searchText });
  };

  // 取得最新消息列表getNews
  const getNews = async ({ page, searchText }) => {
    setIsLoading(true);
    try {
      let url = `/news?_page=${page}&_limit=6`;
      if (searchText) {
        url = `/news?title_like=${searchText}`;
      }
      const res = await axios.get(url);
      // 只保留 `isPublic: true` 的新聞
      const publicNews = res.data.filter((news) => Number(news.isPublic) === 1);
      if (searchText) {
        setSearchNewsList(publicNews);
      } else {
        setNewsList(publicNews);
      }
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedNewsByDateTop3 = newsList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
    .slice(0, 3);
  const sortedNewsByDate = newsList.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
  const [isMoreNewsOpen, setIsMoreNewsOpen] = useState(false);
  let displayNews = [];
  if (searchText) {
    displayNews = searchNewsList;
  } else if (isMoreNewsOpen) {
    displayNews = sortedNewsByDate;
  } else if (!isMoreNewsOpen) {
    displayNews = sortedNewsByDateTop3;
  }

  useEffect(() => {
    getCarouselNews();
    getNews({ page: 1, searchText });
  }, [searchText]);

  return (
    <>
      {isLoading && <Loading type="spin" color="#D4A58E" />}
      <div className="news-section">
        <div className=" bg-primary-50">
          <div className="container py-4 py-md-15">
            {/* Breadcrumb */}
            {!isSearchOpen && (
              <div className="row align-items-center justify-content-between">
                <div className="col-auto col-md-9">
                  <Breadcrumb breadcrumbPath={breadcrumbPath} />
                </div>
                <div className="col-auto col-md-3">
                  {/* 手機版搜尋按鈕 */}
                  <button
                    type="button"
                    className="btn p-0 d-md-none"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                      style={{ width: "20px", height: "20px" }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* 桌面版搜尋框 */}
                  <input
                    type="text"
                    className="form-control rounded-0 d-none d-md-block search-input"
                    placeholder="搜尋"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value.trim())}
                    onKeyDown={(e) => e.key === "Enter" && searchNews()}
                  />
                </div>
              </div>
            )}

            {/* 手機版搜尋框 (點擊按鈕後顯示) */}
            {isSearchOpen && (
              <input
                type="text"
                className="form-control rounded-0 d-md-none"
                placeholder="搜尋"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.trim())}
                onKeyDown={(e) => e.key === "Enter" && searchNews()}
              />
            )}
          </div>

          <div className="container d-none d-md-block">
            <hr className="news-divider my-0" />
          </div>

          {/* 焦點新聞 */}
          <div className="container d-none d-md-block text-center py-18">
            <h2 className="fs-5 text-dark text-start">焦點新聞</h2>
          </div>
          {/* 文章輪播區域 */}

          {!isLoading && carouselData.length > 0 ? (
            <NewsSwiper carouselData={carouselData} />
          ) : (
            <Loading type="spin" color="#D4A58E" />
          )}

          {/* 新聞區塊*/}

          <div className="container py-18 py-md-36">
            {!searchNewsList.length && searchText ? (
              <p className="text-center fs-4">您搜尋的新聞不存在</p>
            ) : (
              <>
                {displayNews.map((news, index) => (
                  <div key={news.id}
                    className="position-relative news-card">
                    <div className="row">
                      {/* 左側圖片 */}
                      <div className="col-12 col-md-4">
                        <div className="news-img-container overflow-hidden">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="news-img rounded-0 w-100 object-fit-cover mb-2 mb-md-0"
                          />
                        </div>
                      </div>

                      {/* 右側內容區塊 */}
                      <div
                        className="col-12 col-md-8 d-flex flex-column justify-content-between">
                        <div className="align-self-start">
                          <p className="text-gray-700 fs-md-7 fs-8 mb-2 mb-md-6">
                            {news.create_at}
                          </p>
                          <h3 className="fs-md-3 fs-6 text-dark mb-2 mb-md-6">
                            {news.title}
                          </h3>
                          <p className="text-gray-700 fs-md-7 fs-8">
                            {news.description}
                          </p>
                        </div>
                        <div className="d-flex d-none d-md-block align-self-md-start text-md-start">
                          <Link to={`/news-detail/${news.id}`}
                            className="btn btn-arrow text-primary-600 text-primary-700-hover py-3 px-0 stretched-link">
                            <span className="me-4">了解更多</span>
                            <img className="arrow-icon"
                              src={buttonIconBrown}
                              alt="buttonIconWhie" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {index !== newsList.length - 1 && (
                      <hr className="news-divider my-6 my-md-12" />
                    )}
                  </div>
                ))}
              </>
            )}

            {/* 閱讀更多按鈕 */}
            {(newsList.length > 0 && !isMoreNewsOpen) && (
              <div className="d-flex justify-content-end mt-18 mt-md-36">
                <button
                  className="btn btn-primary-600 text-white fs-7 px-10 py-5 read-more-btn"
                  type="button"
                  onClick={() => setIsMoreNewsOpen(true)}
                >
                  <span className="me-4">閱讀更多</span>
                  <img
                    src={arrowWhite}
                    alt="閱讀更多按鈕連結"
                    style={{
                      width: "48px",
                      height: "8px",
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
