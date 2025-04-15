import { useState, useEffect } from "react";
import axios from "axios";
import { toastAlert, alertError } from "../../../util/sweetAlert";
import { getToday, checkInputFill } from '../../../util/tools';
import PropTypes from 'prop-types';
export default function AdminNewsModal({ modalRef, closeNewsModal, getNews, type, tempNews, currentPage }) {
  const [tempData, setTempData] = useState({
    title: "", // 文章名稱
    description: "", // 文章描述
    content: "", // 文章內容
    image: "", // 文章圖片
    tag: [], // 文章標籤
    create_at: "", // 文章日期
    author: "", // 文章作者
    isPublic: 1, // 是否啟用
  });

  useEffect(() => {
    if(type === 'create') {
      setTempData({
        title: "", // 文章名稱
        description: "", // 文章描述
        content: "", // 文章內容
        image: "", // 文章圖片
        tag: [], // 文章標籤
        create_at: getToday(), // 文章日期
        author: "", // 文章作者
        isPublic: 1, // 是否啟用
      })
    } else if (type === 'edit') {
      setTempData(tempNews);
    }
  }, [type, tempNews]);

  const isInputFilled = checkInputFill(tempData, [
    'title',
    'description',
    'image',
    'author',
    'content'
  ]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked,
      })
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      })
    }
  }

  const tags = ['甜點', '慈善', '環保', '寵物']
  
  const hendleCheckList = (e) => {
    if (e.target.checked) {
      setTempData({
        ...tempData,
        tag: [...tempData.tag, e.target.value],
      })
    } else {
      setTempData({
        ...tempData,
        tag: tempData.tag.filter((item) => item !== e.target.value),
      })
    }
  }
   
  const submit = async () => {
    let apiPath = '/660/news';
    let apiMethod = 'post';
    let message = '新增最新消息成功';
    if (type === 'edit') {
      apiPath = `/660/news/${tempData.id}`;
      apiMethod = 'put';
      message = '編輯最新消息成功';
    }
    try {
      await axios[apiMethod](apiPath, tempData);
      toastAlert(message);
      closeNewsModal();
      getNews(currentPage);
    } catch (error) {
      alertError(error.message);
    }
  }

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      ref={modalRef}
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新消息' : `編輯: ${tempData.title}` }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeNewsModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='image'>
                    輸入圖片網址 <span className="text-danger">(必填)</span>
                    <input
                      type='text'
                      name='image'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.image}
                    />
                  </label>
                  {
                    tempData.image && (
                      <img src={tempData.image}
                        className="img-fluid"
                        alt="主圖" />
                    )
                  }
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='title'>
                    標題 <span className="text-danger">(必填)</span>
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100 mb-3' htmlFor='author'>
                      作者 <span className="text-danger">(必填)</span>
                      <input
                        type='text'
                        id='author'
                        name='author'
                        placeholder='請輸入作者'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.author}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <div className='w-100 mb-3' htmlFor='tag'>
                      文章標籤
                    </div>
                    {
                      tags.map(tag => (
                        <div className="form-check form-check-inline"
                          key={tag}>
                          <input className="form-check-input"
                            type="checkbox"
                            value={tag}
                            id={tag}
                            onChange={hendleCheckList}/>
                          <label className="form-check-label" htmlFor={tag}>
                            {tag}
                          </label>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='description'>
                    最新消息內容簡介 <span className="text-danger">(必填)</span>
                    <textarea
                      rows="4"
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入最新消息內容簡介'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='content'>
                    最新消息內容 <span className="text-danger">(必填)</span>
                    <textarea
                      rows="4"
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入最新消息內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={tempData.isPublic}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary py-2'
              onClick={closeNewsModal}>
              關閉
            </button>
            <button type='button'
              className='btn btn-primary py-2'
              disabled={!isInputFilled}
              onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminNewsModal.propTypes = {
  modalRef: PropTypes.object,
  closeNewsModal: PropTypes.func,
  getNews: PropTypes.func,
  type: PropTypes.string,
  tempNews: PropTypes.object,
  currentPage: PropTypes.number
}