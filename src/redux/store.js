import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../redux/apiSlice';


export const store = configureStore({
    reducer: {
        api: apiReducer
      }
});