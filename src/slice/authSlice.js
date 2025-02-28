import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
};

const getTokenFromCookies = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('dessertToken='))
    ?.split('=')[1] || null;
};

const initialState = {
  isLogin: !!getTokenFromCookies(),
  userInfo: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      document.cookie = 'dessertToken=; max-age=0;'; // 清除 token
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;