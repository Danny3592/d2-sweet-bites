import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';

//送出表單，取得所購商品資訊、購買人資訊、付款資訊
export const makePayment = createAsyncThunk(
  'checkout/makePayment',
  async ({ userId, ...payload }, { rejectWithValue, fulfillWithValue }) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
      
    try {
      const { data } = await axios.post(
        `/660/users/${userId}/orders`,
        { userId, ...payload },
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

export const getPaymentForOneUser = createAsyncThunk(
  'checkout/getPaymentForOneUser',
  async ({ userId }, { rejectWithValue, fulfillWithValue }) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    try {
      const { data: payments } = await axios.get(
        `/660/orders?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return fulfillWithValue(payments);
    } catch (error) {
      alertError(error.response?.data?.message || '取得付款列表失敗');
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutItem: [],
    payments: [],
    successMsg: '',
    errorMsg: '',
    loader: '',
  },
  reducers: {
    setCheckoutItem(state, { payload }) {
      state.checkoutItem = [...state.checkoutItem, payload];
    },
    clearCheckoutItem(state) {
      state.checkoutItem = [];
    },
    clearMsg(state) {
      state.successMsg = '';
      state.errorMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.fulfilled, (state) => {
        state.successMsg = 'make payment success';
        state.checkoutItem = [];
        state.loader = false;
      })
      .addCase(makePayment.pending, (state) => {
        state.loader = true;
      })
      .addCase(makePayment.rejected, (state) => {
        state.errorMsg = 'make payment error';
        state.loader = false;
      })
      .addCase(getPaymentForOneUser.fulfilled, (state, { payload }) => {
        state.successMsg = 'get payment success';
        state.payments = payload;
        state.loader = false;
      })
      .addCase(getPaymentForOneUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(getPaymentForOneUser.rejected, (state) => {
        state.errorMsg = 'get payment error';
        state.loader = false;
      });
  },
});

export const { setCheckoutItem, clearCheckoutItem,clearMsg } = checkoutSlice.actions;
export default checkoutSlice.reducer;
