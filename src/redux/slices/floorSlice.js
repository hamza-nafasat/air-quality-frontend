import { createSlice } from "@reduxjs/toolkit";

const floorSlice = createSlice({
  name: "floor",
  initialState: {
    floorsData: [],
  },
  reducers: {
    setFloorsData: (state, action) => {
      state.floorsData = action.payload;
    },
  },
});

export const { setBuildingData } = floorSlice.actions;

export default floorSlice;
