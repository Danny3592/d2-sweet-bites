import { createSlice } from '@reduxjs/toolkit';

export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    // user:[],
    cart: [],
    // recentOrder
  },
  reducers: {
    // check_request: (state, action) => {
    //   state.order = action.payload;
    // },
    add_to_cart: (state, action) => {
      state.order = action.payload;
    },
  },
});

export default cartReducer.reducer;
