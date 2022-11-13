import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:[]
};

export const myLikedDaysSlice = createSlice({
  name: "mylikedays",
  initialState,
  reducers: {
    addMyDay: (state, action) => {
      console.log('___payload', action.payload);
      state.value.push(action.payload);
    }, 
    removeMyDays: (state, action) => {
      state.value = []
    }
  },
});

export const {addMyDay, removeMyDays} = myLikedDaysSlice.actions;
export default myLikedDaysSlice.reducer;
