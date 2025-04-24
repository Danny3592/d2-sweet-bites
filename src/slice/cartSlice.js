import axios from 'axios';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    status: 'idle',
  },
  reducers: {
    setCarts(state, action) {
      state.carts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getCartList.pending,
        addCart.pending,
        updateCart.pending,
        deleteCart.pending,
        deleteAllCart.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getCartList.fulfilled,
        addCart.fulfilled,
        updateCart.fulfilled,
        deleteCart.fulfilled,
        deleteAllCart.fulfilled,
      ),
      (state) => {
        state.status = 'success';
      },
    );
  },
});

// 取得購物車資料
export const getCartList = createAsyncThunk(
  'cart/getCartList',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get(`/users/${payload}/carts?_expand=product`);
      dispatch(setCarts(res.data));
    } catch (error) {
      alertError(error);
    }
  },
);

// 加入購物車
export const addCart = createAsyncThunk(
  'cart/addCart',
  async ({ userId, cart }) => {
    try {
      await axios.post(`/600/users/${userId}/carts`, cart);
    } catch (error) {
      alertError(error);
    }
  },
);

// 更新購物車
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ cartId, productId, qty }) => {
    try {
      await axios.patch(`/600/carts/${cartId}`, { productId, qty });
    } catch (error) {
      alertError(error);
    }
  },
);

// 刪除單一購物車
export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (payload) => {
    try {
      await axios.delete(`/600/carts/${payload}`);
    } catch (error) {
      alertError(error);
    }
  },
);

// 刪除全部購物車
export const deleteAllCart = createAsyncThunk(
  'cart/deleteCart',
  async (_, { getState }) => {
    try {
      const { carts } = getState().cart;
      const deleteRequests = carts.map((item) =>
        axios.delete(`/600/carts/${item.id}`),
      );
      await Promise.all(deleteRequests);
    } catch (error) {
      alertError(error);
    }
  },
);

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
