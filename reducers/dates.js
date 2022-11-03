import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
   addMyDates: (state, action) => {
    state.value.push(action.payload)
   },
   removeMyDates: (state, action) => {
    state.value = []
  }
      
      
    
  },
});

export const {addMyDates, removeMyDates} = datesSlice.actions;
export default datesSlice.reducer;
