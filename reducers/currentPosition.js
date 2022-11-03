import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []

};

export const currentPositionSlice = createSlice({
  name: "currentposition",
  initialState,
  reducers: {
   importPosition: (state, action) => {
      state.value = action.payload
    }
   
  },
});

export const {importPosition} = currentPositionSlice.actions;
export default currentPositionSlice.reducer;