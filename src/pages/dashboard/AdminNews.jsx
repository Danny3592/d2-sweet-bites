import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { alertDeleteConfirm, toastAlert, alertError } from '../../../util/sweetAlert';
import AdminNewsModal from '@/components/dashboard/AdminNewsModal';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';

export default function AdminProducts() {
  const [news, setNews] = useState([]);
  const [type, setType] = useState('create'); // edit
  const [tempNews, setTempNews] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const getNews = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/660/news?_page=${page}&_limit=10`);
      setTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 10));
      setNews(res.data);
    } catch(error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getNews(currentPage);
  }, [currentPage]);

  const newsModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    newsModal.current = new Modal(modalRef.current, {
      backdrop: 'static'
    });
  }, []);

  const openNewsModal = (type, news) => {
    setType(type);
    setTempNews(news);
    newsModal.current.show();
  }

  const closeNewsModal = () => {
    newsModal.current.hide();
  }

  const deleteNews = async (news) => {
    const res = await alertDeleteConfirm(`確認刪除 ${news.title} 嗎?`);
    if (!res.isConfirmed) return;
    setIsLoading(true);
    try {
      await axios.delete(`/660/news/${news.id}`);
      toastAlert('最新消息刪除成功');
      getNews(currentPage);
    } catch (error) {
      alertError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      { isLoading && <Loading type="spin" color="#D4A58E"/> }
      <AdminNewsModal
        modalRef={modalRef}
        closeNewsModal={closeNewsModal}
        getNews={getNews}
        currentPage={currentPage}
        tempNews={tempNews}
        type={type}
      />
      <div className="d-flex justify-content-between align-items-center px-20">
        <h2>管理最新消息</h2>
        <button className="btn btn-primary"
          onClick={() => openNewsModal('create', {})}>
          建立新消息
        </button>
      </div>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th>標題</th>
              <th className='px-5'>作者</th>
              <th>標籤</th>
              <th>建立日期</th>
              <th>啟用狀態</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {
              news.map(item => {
                return (
                  <tr key={item.title}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.tag.map(tag =>
                      (<span
                        className='badge rounded-pill bg-danger mx-1'
                        key={tag}>
                          {tag}
                       </span>)
                    )}</td>
                    <td>{item.create_at}</td>
                    <td>{item.isPublic ? '公開' : '非公開'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openNewsModal('edit', item)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => deleteNews(item)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </>
  );
}
