import { createSlice } from "@reduxjs/toolkit";
import { ReactReduxContext } from "react-redux";

const initialState = {
  value: {activities: [], foods: []}
  
};

export const FavoritesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addActivities: (state, action) => {
        // state.value = state.value.filter(activites => activites !== action.payload)
        state.value.push(action.payload.activities)  
        state.value.push(action.payload.foods)  
    },
    cleanActivities: (state) => {
    state.value = [];
    }
}
});


export const {addActivities, cleanActivities} = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
