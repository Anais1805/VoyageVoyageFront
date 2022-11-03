import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: {
  //   city: [],
  //   activities: [],
  //   foods: ''
  // },
  value: []
};

export const myLikedDaysSlice = createSlice({
  name: "mylikedays",
  initialState,
  reducers: {
    addMyDay: (state, action) => {
      console.log('___payload', action.payload);
      state.value.push(action.payload);
    }, 
    addActivities: (state, action) => {
      state.value.push(action.payload)
      // state.value.foods = action.payload.foods
    },
    removeMyDays: (state, action) => {
      state.value = []
    }
  },
});

export const {addMyDay, addActivities, removeMyDays} = myLikedDaysSlice.actions;
export default myLikedDaysSlice.reducer;
