

export async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
      throw new Error(`取得商品列表失敗 ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error
  }
}