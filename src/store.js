import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import favoriteSlice from './slice/favoriteSlice';

export const store = configureStore({
  reducer: {// 必要加入 reducer
    cart: cartReducer,
    favorite: favoriteSlice,
  },
});
