import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.user = null;
    },
  },
});

export const { userExists, userNotExist } = authSlice.actions;

export default authSlice;
