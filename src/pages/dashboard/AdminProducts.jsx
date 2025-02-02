import { getProducts } from '../../../util/http-products';
import { useNavigation, useLoaderData } from 'react-router-dom';

export default function AdminProducts() {
  // const { products } = useLoaderData();
  // const navigation = useNavigation();

  if (navigation.state === 'error') {
    return <p>Error: 無法載入產品數據。</p>;
  }

  return (
    <>
      <main className="admin__content">
        <table>
          <thead>
            <tr>
              <th className='py-3'>分類</th>
              <th className='py-3'>名稱</th>
              <th className='py-3'>內容</th>
              <th className='py-3'>售價</th>
              <th className='py-3'>狀態</th>
              <th className='py-3'>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.title}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{`NT$${product.price}`}</td>
                  <td>{product.status}</td>
                  <td>
                    <button className="btn edit-btn btn-dark">編輯</button>
                    <button className="btn delete-btn">刪除</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export async function loader() {
  try {
    const products = await getProducts(); // 獲取產品資料
    return { products };
  } catch (error) {
    throw new Response('Failed to fetch products', { status: 500 });
  }
}
