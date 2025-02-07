import { useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "藍莓雲夢",
      price: 200,
      quantity: 1,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1738597207087-8a77ef0062dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D/80",
    },
    {
      id: 2,
      name: "燕香濃意",
      price: 200,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1738463783712-131ad5b53dc9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D/80",
    },
  ]);

  const [suggestedItems] = useState([
    {
      id: 1,
      name: "甜蜜助學計畫",
      price: 5,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1738667379581-a02dd0f0bfe5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0M3x8fGVufDB8fHx8fA%3D%3D/80",
    },
    {
      id: 2,
      name: "幸福愛戴行動",
      price: 10,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1738522477288-82f5db85cfc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0N3x8fGVufDB8fHx8fA%3D%3D/80",
    },
    {
      id: 3,
      name: "綠色希望專案",
      price: 15,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1737100593814-8ceb04f29cca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NHx8fGVufDB8fHx8fA%3D%3D/80",
    },
  ]);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Cart Section */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">我的購物車</h5>
                <button className="btn btn-outline-secondary btn-sm">
                  清空購物車
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between border-bottom py-3"
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ flex: 1 }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="me-3"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <div
                        className="input-group input-group-sm mt-1"
                        style={{ width: "100px" }}
                      >
                        <button className="btn btn-outline-secondary">-</button>
                        <input
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          readOnly
                        />
                        <button className="btn btn-outline-secondary">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <h6 className="mb-0">NT${item.price * item.quantity}</h6>
                    <button className="btn btn-link text-danger btn-sm">
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="col-lg-4">
          <div className="cart-summary p-3 border rounded">
            <h5>訂單明細</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>訂單總計</span>
                <strong>
                  NT$
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>優惠券</span>
                <span>-</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>運費</span>
                <span>免運</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>應付金額</strong>
                <strong>
                  NT$
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </strong>
              </li>
            </ul>
            <button className="btn btn-dark w-100 mt-3">確認訂單</button>
          </div>
        </div>
      </div>

      {/* Donation Section */}
      <div
        className="mt-5 p-3 bg-light rounded"
        style={{ maxWidth: "66.666%" }}
      >
        <h5>甜蜜訂單，邀您一起暖心加購</h5>
        <div>
          {suggestedItems.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-between border-bottom py-3"
            >
              <div className="d-flex align-items-center" style={{ flex: 1 }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="me-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <div>
                  <h6 className="mb-0">{item.name}</h6>
                  <div
                    className="input-group input-group-sm mt-1"
                    style={{ width: "100px" }}
                  >
                    <button className="btn btn-outline-secondary">-</button>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      readOnly
                    />
                    <button className="btn btn-outline-secondary">+</button>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <h6 className="mb-0">NT${item.price}</h6>
                <button className="btn btn-outline-secondary btn-sm">
                  加入購物車
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
