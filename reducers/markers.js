import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []

};

export const myMarkersSlice = createSlice({
  name: "mymarkers",
  initialState,
  reducers: {
   importMarkers: (state, action) => {
      state.value = action.payload
    },
    removeMarkers: (state, action) => {
      state.value = []
    }
   
  },
});

export const {importMarkers, removeMarkers} = myMarkersSlice.actions;
export default myMarkersSlice.reducer;