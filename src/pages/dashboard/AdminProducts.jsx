export default function AdminProducts() {
  return (
    <>
      <main className="admin__content">
          <table>
            <thead>
              <tr>
                <th>分類</th>
                <th>名稱</th>
                <th>內容</th>
                <th>售價</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>蛋糕</td>
                <td>莓好時光</td>
                <td>主打草莓與混合莓口味的甜點，傳遞甜蜜與美好。</td>
                <td>NT$150</td>
                <td>上架中</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>派</td>
                <td>蜜桃初戀</td>
                <td>適合蜜桃或水果風味的甜點，柔和而帶點浪漫。</td>
                <td>NT$200</td>
                <td>上架中</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>蛋糕</td>
                <td>棗心如意</td>
                <td>棗果與咖啡或巧克力的搭配，濃郁又帶一絲溫暖的驚喜。</td>
                <td>NT$180</td>
                <td>上架中</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>派</td>
                <td>檸檬舞律</td>
                <td>適合清新檸檬類，均衡的酸甜搭配，清爽又愉悅。</td>
                <td>NT$170</td>
                <td>上架中</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>蛋糕</td>
                <td>抹茶心語</td>
                <td>採用日本宇治抹茶製成，微苦甘甜，宛如細語入心。</td>
                <td>NT$210</td>
                <td>上架中</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>餅乾</td>
                <td>杏仁微光</td>
                <td>精選杏仁片，搭配巧妙香料，口感層次豐富。</td>
                <td>NT$120</td>
                <td>下架</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>馬卡龍</td>
                <td>幻彩柔情</td>
                <td>五種繽紛口味馬卡龍，每一口帶來愛與情意。</td>
                <td>NT$220</td>
                <td>即將推出</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
              <tr>
                <td>蛋捲</td>
                <td>焦糖能量</td>
                <td>在傳統蛋捲基底上加入焦糖層次，帶來全新味覺享受。</td>
                <td>NT$140</td>
                <td>告罄</td>
                <td>
                  <button className="btn edit-btn btn-dark">編輯</button>
                  <button className="btn delete-btn">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
    </>
  );
}
