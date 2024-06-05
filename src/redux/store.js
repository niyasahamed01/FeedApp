import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../redux/apiSlice';
import searchSlice from './searchSlice';
import homeSlice from '../redux/homeSlice';
import orderReducer from '../redux/orderReducer';


export const store = configureStore({
    reducer: {
        api: apiReducer,
        search: searchSlice,
        home: homeSlice,
        orderList:orderReducer
      }
});