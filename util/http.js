export const getCart = async () => {
  setIsLoading(true);
  try {
    const res = await axios.get(`/users/${USER_ID}/carts?_expand=product`);
    setCartItems(res.data);
  } catch (error) {
    alertError('取得購物車失敗');
  } finally {
    setIsLoading(false);
  }
};

export const getCharityProducts = async () => {
  setIsLoading(true);
  try {
    const res = await axios.get(`/products?category=慈善`);
    setCharityProducts(res.data);
  } catch (error) {
    alertError('取得慈善商品失敗');
  } finally {
    setIsLoading(false);
  }
};
