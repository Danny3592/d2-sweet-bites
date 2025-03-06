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
export const selectProducts = (state) => {
  return state.product.products
}

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
