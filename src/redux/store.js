import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../redux/apiSlice';
import downloadSlice from '../redux/downloadSlice';


export const store = configureStore({
    reducer: {
        api: apiReducer,
        download: downloadSlice
      }
});