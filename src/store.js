import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
  reducer: { // 必要加入 reducer
    cart: cartReducer,
    favorite:
  }
});