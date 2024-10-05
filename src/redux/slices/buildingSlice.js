import { createSlice } from "@reduxjs/toolkit";

const buildingSlice = createSlice({
  name: "building",
  initialState: {
    buildingData: {
      name: "",
      type: "",
      area: "",
      address: "",
      thumbnail: "",
      twoDModel: "",
      twoDModelPreview: "",
      position: "",
      floors: [],
    },
  },
  reducers: {
    setBuildingData: (state, action) => {
      state.buildingData.name = action.payload.name;
      state.buildingData.type = action.payload.type;
      state.buildingData.area = action.payload.area;
      state.buildingData.address = action.payload.address;
      state.buildingData.thumbnail = action.payload.thumbnail;
      state.buildingData.twoDModel = action.payload.twoDModel;
      state.buildingData.twoDModelPreview = action.payload.twoDModelPreview;
      state.buildingData.position = action.payload.position;
      state.buildingData.floors = state.buildingData.floors.concat(action?.payload?.floors);
    },
  },
});

export const { setBuildingData } = buildingSlice.actions;

export default buildingSlice;
