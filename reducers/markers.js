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
    }
   
  },
});

export const {importMarkers} = myMarkersSlice.actions;
export default myMarkersSlice.reducer;