import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { alertError } from "../../../util/sweetAlert";
import Loading from "@/components/Loading";
import Breadcrumb from "@/components/front/Breadcrumb";

export default function NewsDetail() {
  const { id } = useParams(); // 取得 URL 參數中的新聞 ID
  const navigate = useNavigate();

  // Breadcrumb 路徑
  const breadcrumbPath = [
    { path: "/news-list", name: "最新消息" },
    { path: `/news-detail/${id}`, name: "新聞內容" },
  ];

  // 搜尋
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 搜尋最新消息
  const searchNews = () => {};

  useEffect(() => {
    // 取得單一新聞內容getNewsDetail
    const getNewsDetail = async ({ id }) => {
      setIsLoading(true);
      try {
        let url = `/news/${id}`; // API 請求單一新聞

        if (searchText) {
          url = `/news?name_like=${searchText}`;
        }

        const res = await axios.get(url);
        setNewsData(res.data);
      } catch (error) {
        alertError("無法取得新聞內容");
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      getNewsDetail({ id });
    }
  }, [id, searchText]);

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

          {/* 新聞細節內容區塊 */}
          <div className="container py-6 py-md-18">
            <div className="row justify-content-center text-dark">
              <div className="col-12 col-md-6 px-3 px-md-0">
                {id ? (
                  newsData ? (
                    <>
                      {/* 顯示新聞內容 */}
                      <h2 className="text-dark text-start fs-5 fs-md-2 mb-4">
                        {newsData.title}
                      </h2>
                      <p className="text-gray-700 text-start d-inline-block mb-6 mb-md-12 fs-8 ">
                        <span className="badge bg-dark text-white me-2 py-1 px-2">
                          {newsData.tag?.join(" . ")}
                        </span>
                        &middot;
                        <span>{newsData.create_at}</span>
                      </p>
                      <img
                        src={newsData.image}
                        className="img-fluid rounded-0 mb-6 mb-md-12"
                        alt={newsData.title}
                      />
                      <h4 className="text-primary-700 fs-5 mb-6">
                        {newsData.description}
                      </h4>
                      <p className="text-dark mb-18 mb-md-33">
                        {newsData.content}
                      </p>
                      <div className="mb-18 mb-md-33">
                        <button
                          className="btn btn-link px-0 py-2 text-primary-600"
                          type="button"
                          onClick={() => navigate(-1)}
                        >
                          <img
                            src="../../src/assets/images/news-list/arrow-uturn-left.svg"
                            alt="返回按鈕"
                            style={{ width: "20px", height: "20px" }}
                            className="me-2"
                          />
                          <span className=" d-inline-block align-middle fs-7">
                            返回最新消息列表
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    error && <p className="text-danger">{error}</p>
                  )
                ) : (
                  <p className="text-muted">載入中...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
