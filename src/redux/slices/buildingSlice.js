import { createSlice } from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildingData: {
      name: '',
      type: '',
      area: '',
      address: '',
      thumbnail: '',
      thumbnailPreview: '',
      twoDModel: '',
      twoDModelPreview: '',
      twoDModelCoordinates: [],
      floorsCount: 1,
      position: [],
      floors: [], // ⬅️ keep floors here
    },
  },
  reducers: {
    setBuildingData: (state, action) => {
      Object.assign(state.buildingData, {
        ...state.buildingData,
        ...action.payload,
      });

      // if floors are included, overwrite floors
      if (action.payload.floors) {
        state.buildingData.floors = action.payload.floors;
      }
    },
    addOrUpdateFloor: (state, action) => {
      const { index, floor } = action.payload;
      state.buildingData.floors[index] = floor; // ⬅️ replace floor at index
    },
    removeBuildingData: (state) => {
      state.buildingData = {
        name: '',
        type: '',
        area: '',
        address: '',
        thumbnail: '',
        thumbnailPreview: '',
        twoDModel: '',
        twoDModelPreview: '',
        twoDModelCoordinates: [],
        floorsCount: 1,
        position: [],
        floors: [],
      };
    },
  },
});

export const { setBuildingData, removeBuildingData, addOrUpdateFloor } = buildingSlice.actions;
export default buildingSlice;
