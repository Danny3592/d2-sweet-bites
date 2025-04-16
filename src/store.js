import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slice/newsSlice';
import productReducer from './slice/productSlice';
import cartReducer from './slice/cartSlice';
import couponReducer from './slice/couponSlice';
import favoriteReducer from './slice/favoriteSlice';
import checkoutReducer from './slice/checkoutSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    // 必要加入 reducer
    product: productReducer,
    cart: cartReducer,
    coupon: couponReducer,
    favorite: favoriteReducer,
    checkout: checkoutReducer,
    auth: authReducer,
    news: newsReducer,
  },
});
