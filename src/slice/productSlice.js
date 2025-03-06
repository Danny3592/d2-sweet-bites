import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';
import axios from 'axios';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    status: 'idle',
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getProducts.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getProducts.fulfilled,
      ),
      (state) => {
        state.status = 'success';
      },
    );
  },
});

// 取得商品資料
export const getProducts = createAsyncThunk(
  'cart/getProducts',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get(`/products`);
      dispatch(setProducts(res.data));
    } catch (error) {
      alertError(error);
    }
  },
);

// 隨機選取指定數量的甜點
export const selectRandomProducts = (state, num) => {
  const products = state.product.products;
  const desserts = products.filter(product => product.category !== '慈善');
  const result = new Set();
  if (desserts.length) {
    while (result.size < num) {
      const randomIndex = Math.floor(Math.random() * desserts.length);
      result.add(desserts[randomIndex]);
    }
  }
  return [...result];
}

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
