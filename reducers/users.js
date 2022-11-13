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
    isConnected: false,

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
        state.value.isConnected = true
    },
    login: (state, action)=> {
      // console.log('obj', action.payload)
      //     if(action.payload.email){        
      state.value.isConnected = true,
      state.value.email = action.payload
      state.value.token = action.payload.token;
          // }
          
     },
     logout: (state, action) => {
      state.value.isConnected = false
      state.value.email = null
  }

  },
});

export const {SignUp, login, logout} = userSlice.actions;
export default userSlice.reducer;
