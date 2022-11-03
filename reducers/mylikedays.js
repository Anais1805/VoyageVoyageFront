import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: [], 
  value: {activities: [], foods: []}
  
};

export const myLikedDaysSlice = createSlice({
  name: "mylikedays",
  initialState,
  reducers: {
    addMyDay: (state, action) => {
        state.value.push(action.payload)
    }, 
  },
});


export const {addMyDay} = myLikedDaysSlice.actions;
export default myLikedDaysSlice.reducer;
