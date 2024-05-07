// downloadSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchDownloadApiData } from '../redux/fetchApiData';

export const downloadSlice = createSlice({
  name: 'download',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    skip: 0,
    hasMore: true,
  },
  reducers: {
    fetchDownloadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDownloadSuccess: (state, action) => {
      state.loading = false;
      state.products = [...state.products, ...action.payload.products];
      state.hasMore = action.payload.hasMore;
      state.page += 1;
      state.skip += state.limit;
    },
    fetchDownloadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDownloadStart, fetchDownloadSuccess, fetchDownloadFailure } = downloadSlice.actions;

export const fetchNextPage = () => async (dispatch, getState) => {
  const { page, limit, skip } = getState().download;
  dispatch(fetchDownloadApiData({ page, limit, skip }));
};

export default downloadSlice.reducer;