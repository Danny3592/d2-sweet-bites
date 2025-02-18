import { createSlice, isAnyOf, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { alertError } from '../../util/sweetAlert';
const get_favorites = createAsyncThunk(
  'favorite/get_favorites',
  async (userID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await axios.get(
        `/600/users/${userID}/favorites?_expand=product`,
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error || '取得收藏列表失敗');
      return rejectWithValue(error || '取得收藏列表失敗');
    }
  },
);

const add_favorite = createAsyncThunk(
  'favorite/add_favorite',
  async (
    { userID, isFavorite, productId },
    { rejectWithValue, fulfillWithValue },
  ) => {
    try {
      const res = await axios.post(`/600/users/${userID}/favorites`, {
        isFavorite,
        productId,
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error || '新增收藏失敗');
      return rejectWithValue(error || '新增收藏失敗');
    }
  },
);

const remove_favorite = createAsyncThunk(
  'favorite/remove_favorite',
  async ({ userID, productId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await axios.delete(
        `/600/users/${userID}/favorites/${productId}`,
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error || '移除收藏失敗');
      return rejectWithValue(error || '移除收藏失敗');
    }
  },
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorites: [],
    status: '',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_favorites.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites = payload;
      })
      .addCase(add_favorite.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites.push(payload);
      })
      .addCase(remove_favorite.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites.filter((item) => item.productId !== payload);
      })
      .addMatcher(
        isAnyOf(
          get_favorites.pending,
          add_favorite.pending,
          remove_favorite.pending,
        ),
        (state) => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          get_favorites.rejected,
          add_favorite.rejected,
          remove_favorite.rejected,
        ),
        (state, action) => {
          state.status = 'error';
          state.error = action.payload;
        },
      );
  },
});

export default favoriteSlice.reducer;
