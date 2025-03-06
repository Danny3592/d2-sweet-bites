import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';
import axios from 'axios';


export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    status: 'idle',
  },
  reducers: {
    setNews(state, action) {
      state.news = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getNews.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getNews.fulfilled,
      ),
      (state) => {
        state.status = 'success';
      },
    );
  },
});


// 取得購物車資料
export const getNews = createAsyncThunk(
  'cart/getNews',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get(`/news`);
      dispatch(setNews(res.data));
    } catch (error) {
      alertError(error);
    }
  },
);

export const selectNews = (state) => state.news.news;
export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;