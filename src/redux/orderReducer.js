import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderList: [],
  },
  reducers: {
    addToOrderList: (state, action) => {
      state.orderList.push(action.payload);
    },
  },
});

export const { addToOrderList } = orderSlice.actions;

export default orderSlice.reducer;