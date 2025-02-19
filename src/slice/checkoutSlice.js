import { createSlice } from '@reduxjs/toolkit';

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutItem: null,
  },
  reducers: {
    setCheckoutItem(state, action) {
      state.checkoutItem = action.payload;
    },
    clearCheckoutItem(state) {
      state.checkoutItem = null;
    },
  },
});

export const { setCheckoutItem, clearCheckoutItem } = checkoutSlice.actions;
export default checkoutSlice.reducer;
