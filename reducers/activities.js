import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
   xid: ''
  },
  
};

export const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    activitiesInfos: (state, action) => {
        state.value.xid = action.payload.xid
      
     
        
    }
  },
});

export const {activitiesInfos} = activitySlice.actions;
export default activitySlice.reducer;
