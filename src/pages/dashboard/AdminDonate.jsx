
import Pagination from '../../components/Pagination';
import { useState, useEffect, useMemo } from 'react';
import { alertError } from '../../../util/sweetAlert';
import C3PieChart from '../../components/C3PieChart';
import axios from 'axios';
export default function AdminDonate() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const itemsPerPage = 10;

  const getOrders = async () => {
    try {
      const res = await axios.get('/660/orders');
      setOrders(res.data);
    } catch(error) {
      alertError(error);
    }
  }

  const donateOrders = useMemo(() => {
    const orderData = orders.map(order => {
      return order.recentItems.map(item => {
        const productName = products.find(product => product.id === item.productId).title;
        return {
          ...item,
          productName,
          name: order.useInfo.name,
        }
      })
    }).flat();
    const data = orderData.filter(product => product.isCharity === true)
      .map((order, index) => ({ id: index + 1, ...order }));
    setTotalPages(Math.ceil(data.length / itemsPerPage));
    return data
  }, [orders, products]);

  const c3Data = useMemo(() => {
    const donateByCategory = donateOrders.reduce((count, order) => {
      if (!count[order.productName]) {
        count[order.productName] = order.price;
      } else {
        count[order.productName] += order.price;
      }
      return count;
    }, {});
    return Object.entries(donateByCategory);
  }, [donateOrders]);

  // 計算目前頁面的資料
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = donateOrders.slice(startIndex, startIndex + itemsPerPage);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/660/products`);
      setProducts(res.data);
    } catch(error) {
      alertError(error);
    }
  }
  
  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>捐款ID</th>
            <th className='px-5'>捐款人</th>
            <th>捐款金額</th>
            <th>捐款日期</th>
            <th>狀態</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {
            currentOrders.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.charityContent.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.charityContent.donationDate}</td>
                  <td>{item.charityContent.paymentStatus ? '已完成' : '待確認'}</td>
                  <td>{item.productName}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      { c3Data.length ? (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
          <p className='text-center mt-5'>各捐款方案金額佔比</p>
          <div className="pt-5 pb-10 w-100">
            <C3PieChart data={c3Data}/>
          </div>
        </>
      ) : (
        <p className='text-primary text-center fs-5'>目前無捐款紀錄</p>
      )}
    </>
  )
}
