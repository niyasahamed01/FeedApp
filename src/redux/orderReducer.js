import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderList: [],
    loading: false, 
  },
  reducers: {
    addToOrderList: (state, action) => {
      state.orderList.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addToOrderList, setLoading } = orderSlice.actions;

export default orderSlice.reducer;