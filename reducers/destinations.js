import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    city: '',
    country: '',
    lat: '',
    lon: ''
  },
  
};

export const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    destinationSearch: (state, action) => {
        state.value.city = action.payload.city
        state.value.country = action.payload.country
        state.value.lat = action.payload.lat
        state.value.lon = action.payload.lon
     
        
    }
  },
});

export const {destinationSearch} = destinationSlice.actions;
export default destinationSlice.reducer;
