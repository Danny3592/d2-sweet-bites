import axios from 'axios';
import { createSlice, isAnyOf, createAsyncThunk } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';

export const getFavorites = createAsyncThunk(
  'favorite/getFavorites',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];

    try {
      const res = await axios.get(`/600/users/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error || '取得收藏列表失敗');
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async ({ userId, productId }, { rejectWithValue, fulfillWithValue }) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];
    try {
      await axios.post(
        `/660/users/${userId}/favorites?_expand=product`,
        {
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const res = await axios.get(`/600/users/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error || '新增收藏失敗');
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'favorite/removeFavorite',
  async ({ userId, productId }, { rejectWithValue, fulfillWithValue }) => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('dessertToken='))
      ?.split('=')[1];

    if (!userId || !productId) {
      alertError('userId 或 productId無效');
      return rejectWithValue('userId 或 productId無效');
    }

    const res = await axios.get(`/600/users/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const favoriteItem = res.data.find((item) => {
      return item.productId === productId;
    });

    if (!favoriteItem) {
      alertError('❌ 收藏商品不存在');
      return rejectWithValue('收藏商品不存在');
    }

    try {
      const res = await axios.delete(`/600/favorites/${favoriteItem.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      alertError(error.response?.data?.message || '付款失敗');
      return rejectWithValue(error.response?.data || error.message);
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
      .addCase(getFavorites.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites = payload;
      })
      .addCase(addFavorite.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites.push(payload);
      })
      .addCase(removeFavorite.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.favorites.filter((item) => item.productId !== payload);
      })
      .addMatcher(
        isAnyOf(
          getFavorites.pending,
          addFavorite.pending,
          removeFavorite.pending,
        ),
        (state) => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        isAnyOf(
          getFavorites.rejected,
          addFavorite.rejected,
          removeFavorite.rejected,
        ),
        (state, action) => {
          state.status = 'error';
          state.error = action.payload;
        },
      );
  },
});

export default favoriteSlice.reducer;
