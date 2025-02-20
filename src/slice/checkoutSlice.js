import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';
import axios from 'axios';


//送出表單，取得所購商品資訊、購買人資訊、付款資訊
export const makePayment = createAsyncThunk(
  'checkout/makePayment',
  async ({ userId, ...payload }, { rejectWithValue, fulfillWithValue }) => {
    console.log('userId = ',userId);
    console.log('payload = ',payload);
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    try {
      const { data } = await axios.post(
        `/660/users/${userId}/payment`, //暫定api
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return fulfillWithValue(data);
    } catch (error) {
      alertError(error || '付款失敗');
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);



export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutItem: [],
    status: 'idle',
  },
  reducers: {
    setCheckoutItem(state, { payload }) {
      // console.log('payload = ', [...state.checkoutItem,payload]);
      state.checkoutItem = [...state.checkoutItem,payload];
    },
    clearCheckoutItem(state) {
      state.checkoutItem = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(makePayment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(makePayment.rejected, (state) => {
        state.status = 'error';
      });
  },
});



export const { setCheckoutItem, clearCheckoutItem } = checkoutSlice.actions;
export default checkoutSlice.reducer;
