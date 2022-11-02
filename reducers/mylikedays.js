import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [], 
  myday: {activities: '', foods:''}
  
};

export const myLikedDaysSlice = createSlice({
  name: "mylikedays",
  initialState,
  reducers: {
    addMyDay: (state, action) => {
        state.value.push(action.payload)
    }, 
    addActivities: (state, action) => {
      state.myday.activities = action.payload.activities
      state.myday.foods = action.payload.foods
    }
  },
});

export const {addMyDay, addActivities} = myLikedDaysSlice.actions;
export default myLikedDaysSlice.reducer;
