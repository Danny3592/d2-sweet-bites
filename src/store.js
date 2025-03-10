import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import favoriteReducer from './slice/favoriteSlice';
import checkoutReducer from './slice/checkoutSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    // 必要加入 reducer
    cart: cartReducer,
    favorite: favoriteReducer,
    checkout: checkoutReducer,
    auth: authReducer,
  },
});
