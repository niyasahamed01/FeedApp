// apiThunks.js
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../redux/apiSlice';
import { fetchDownloadStart, fetchDownloadSuccess, fetchDownloadFailure } from '../redux/downloadSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../redux/fetchData';
import { fetchDownloadData } from '../redux/fetchData';

export const fetchApiData = createAsyncThunk('api/fetchData', async (_, { dispatch }) => {
  try {
    dispatch(fetchDataStart());
    const data = await fetchData(); 
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
});


export const fetchDownloadApiData = createAsyncThunk('api/fetchDownloadData', async (_, { dispatch, getState }) => {
  const { page, limit, skip } = getState().download; // Adjust according to your state structure
  try {
    dispatch(fetchDownloadStart());
    const data = await fetchDownloadData(page, limit, skip); // Assuming fetchData takes parameters for pagination
    dispatch(fetchDownloadSuccess(data));
  } catch (error) {
    dispatch(fetchDownloadFailure(error.message));
  }
});