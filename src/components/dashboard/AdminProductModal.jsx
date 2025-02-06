import { useState, useEffect } from "react";
import axios from "axios";
import { toastAlert, alertError } from "../../../util/sweetAlert";
export default function AdminProductModal({ modalRef, closeProductModal, getProducts, type, tempProduct, currentPage }) {
  const [tempData, setTempData] = useState({
    title: "", //商品名稱
    category: "", //商品種類
    origin_price: 100, //原價
    price: 300, // 優惠價
    unit: "", // 商品單位
    description: "", //商品描述
    content: "", // 商品描述
    is_enabled: 1, // 是否啟用
    stock: 10,     // 庫存
    imageUrl: "", // 商品圖片網址
    imagesUrl: [''],
  });

  useEffect(() => {
    if(type === 'create') {
      setTempData({
        title: "", 
        category: "", 
        origin_price: 100,
        price: 300,
        unit: "",
        description: "",
        content: "",
        is_enabled: 1,
        stock: 10,
        imageUrl: "",
        imagesUrl: [''],
      })
    } else if (type === 'edit') {
      setTempData(tempProduct);
    }
  }, [type, tempProduct])

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['price', 'origin_price', 'stock'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: parseInt(value),
      })
    } else if (name === 'is_enabled') {
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

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...tempData.imagesUrl];
    newImages[index] = value;
    setTempData({
      ...tempData,
      imagesUrl: newImages,
    })
  }

  const handleAddImage = () => {
    const newImages = [...tempData.imagesUrl, ''];
    setTempData({
      ...tempData,
      imagesUrl: newImages,
    })
  }

  const handleRemoveImage = () => {
    const newImages = [...tempData.imagesUrl];
    newImages.pop();
    setTempData({
      ...tempData,
      imagesUrl: newImages,
    })
  }

  const submit = async () => {
    let apiPath = '/products';
    let apiMethod = 'post';
    let message = '新增產品成功';
    if (type === 'edit') {
      apiPath = `/products/${tempData.id}`;
      apiMethod = 'put';
      message = '編輯產品成功';
    }
    try {
      await axios[apiMethod](apiPath, tempData);
      toastAlert(message);
      closeProductModal();
      getProducts(currentPage);
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
              { type === 'create' ? '建立新商品' : `編輯: ${tempData.title}` }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.imageUrl}
                    />
                  </label>
                  {
                    tempData.imageUrl && (
                      <img src={tempData.imageUrl}
                        className="img-fluid"
                        alt="主圖" />
                    )
                  }
                </div>
                <div className="border border-2 p-3">
                  {
                    tempData.imagesUrl.map((image, index) => {
                      return (
                        <div className="mb-2"
                          key={image}>
                          <label htmlFor={`imageUrl:${index + 1}`}
                            className="form-label">
                            { `附圖 ${index + 1}` }
                          </label>
                          <input
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                            type="text"
                            id={`imageUrl:${index + 1}`}
                            className="form-control mb-2"
                            placeholder="請輸入圖片網址"/>
                          {
                            image && (
                              <img src={image}
                                alt={`附圖 ${image}`}
                                className="img-fluid mb-2" />
                            )
                          }
                        </div>
                      )
                    })
                  }
                  <div className="btn-group w-100">
                    {
                      tempData.imagesUrl.length < 5
                      && tempData.imagesUrl[tempData.imagesUrl.length - 1] !== ''
                      && (
                        <button className="btn btn-outline-primary btn-sm w-100"
                          onClick={handleAddImage} >
                          新增圖片
                        </button>
                      )
                    }
                    {
                      tempData.imagesUrl.length > 1
                      && (
                        <button className="btn btn-outline-danger btn-sm w-100"
                          onClick={handleRemoveImage}>
                          取消圖片
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='title'>
                    標題
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
                    <label className='w-100 mb-3' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100 mb-3' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100 mb-3' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        min={0}
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100 mb-3' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        min={0}
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100 mb-3' htmlFor='stock'>
                      庫存數量
                      <input
                        type='number'
                        id='stock'
                        name='stock'
                        placeholder='請輸入庫存數'
                        className='form-control'
                        min={0}
                        onChange={handleChange}
                        value={tempData.stock}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='description'>
                    產品描述
                    <textarea
                      rows="4"
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100 mb-3' htmlFor='content'>
                    說明內容
                    <textarea
                      rows="4"
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
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
                        checked={tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary py-2'
              onClick={closeProductModal}>
              關閉
            </button>
            <button type='button'
              className='btn btn-primary py-2'
              onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}