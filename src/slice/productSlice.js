import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { alertError } from '../../util/sweetAlert';
import axios from 'axios';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productsByPage: [],
    productsTotalPages: 1,
    status: 'idle',
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProductsByPage(state, action) {
      state.productsByPage = action.payload;
    },
    setProductsTotalPages(state, action) {
      state.productsTotalPages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getProducts.pending,
        getProductsByPage.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getProducts.fulfilled,
        getProductsByPage.fulfilled,
      ),
      (state) => {
        state.status = 'success';
      },
    );
  },
});

// 取得商品資料(全部)
export const getProducts = createAsyncThunk(
  'cart/getProducts',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get(`/products`);
      dispatch(setProducts(res.data));
    } catch (error) {
      alertError(error);
    }
  },
);

// 取得商品資料(有分頁)
export const getProductsByPage = createAsyncThunk(
  'cart/getProductsByPage',
  async ({ page, category, searchText, pageLimit } , { dispatch }) => {
    let url = `/products?_page=${page}&_limit=${pageLimit}`;
    if (category) {
      url += `&category=${category}`;
    }
    if (searchText) {
      url = `/products?title_like=${searchText}`;
    }
    try {
      const res = await axios.get(url);
      dispatch(setProductsByPage(res.data));
      dispatch(setProductsTotalPages(Math.ceil(res.headers.get("X-Total-Count") / 6)));
    } catch (error) {
      alertError(error);
    }
  },
);


export const selectProducts = (state) => {
  return state.product.products;
}

export const selectProductsByPage = (state) => {
  return state.product.productsByPage;
}

export const selectProductsTotalPages = (state) => {
  return state.product.productsTotalPages;
}

export const selectProductStatus = (state) => {
  return state.product.status;
}

export const {
  setProducts,
  setProductsByPage,
  setProductsTotalPages,
} = productSlice.actions;
export default productSlice.reducer;
