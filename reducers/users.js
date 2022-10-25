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
    SignUp: (state, action) => {
        console.log(state.value.displacement)
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

export const {SignUp} = userSlice.actions;
export default userSlice.reducer;
