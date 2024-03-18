// apiThunks.js
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../redux/apiSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../redux/fetchData';

export const fetchApiData = createAsyncThunk('api/fetchData', async (_, { dispatch }) => {
  try {
    dispatch(fetchDataStart());
    const data = await fetchData(); 
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
});