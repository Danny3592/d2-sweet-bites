import { NavLink } from "react-router-dom"
export default function UserFavorite() {
  return (
    <>
      <h1 className="fs-4 mb-8 noto-sans-tc">我的收藏</h1>
      <div className="table-responsive">
        <table className="table bg-transparent">
          <thead className="bg-transparent">
            <tr>
              <th scope="col" className="ps-10">商品類別</th>
              <th scope="col" className="p-3">商品名稱</th>
              <th scope="col" className="p-3">售價</th>
              <th scope="col" className="p-3">管理狀態</th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            <tr>
              <th scope="row" className="p-3 ps-10">蛋糕</th>
              <td className="p-3">莓舞輕雲</td>
              <td className="p-3">420</td>
              <td className="p-3">
                <NavLink to="/" className="btn btn-sm btn-outline-primary me-4">
                  立即訂購
                </NavLink>
                <button type="button" className="btn btn-sm btn-primary">
                  移除收藏
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
