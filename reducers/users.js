import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    password: null,
    email: null,
    family: null,
    budget: null,
    diet: null,
    displacement: null,
    isConnected: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
        state.value.username = action.payload.username
        state.value.password = action.payload.password
        state.value.email = action.payload.email
        state.value.family = action.payload.family
        state.value.budget = action.payload.budget
        state.value.diet = action.payload.diet
        state.value.displacement = action.payload.displacement
        
    }
  },
});

export const {addUserToStore} = userSlice.actions;
export default userSlice.reducer;
