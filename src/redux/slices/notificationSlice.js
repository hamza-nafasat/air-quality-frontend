// store/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    count: 0, // 🔢 only store count
  },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    clearCount: (state) => {
      state.count = 0;
    },
  },
});

export const { setCount, clearCount } = notificationSlice.actions;
export default notificationSlice;
