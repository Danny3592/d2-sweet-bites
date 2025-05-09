import axios from 'axios';
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';


export const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    status: 'idle',
  },
  reducers: {
    setCoupons(state, action) {
      state.coupons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getCouponList.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getCouponList.fulfilled,
      ),
      (state) => {
        state.status = 'success';
      },
    );
  },
});

// 取得優惠券資料
export const getCouponList = createAsyncThunk(
  'cart/getCouponList',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get(`/coupons`);
      const activeCoupons = res.data.filter(coupon => coupon.is_enabled);
      dispatch(setCoupons(activeCoupons));
    } catch (error) {
      alertError(error);
    }
  },
);

export const { setCoupons } = couponSlice.actions;
export default couponSlice.reducer;