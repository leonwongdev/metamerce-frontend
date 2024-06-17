import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    email: null,
    jwt: null,
  },
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
    },
    // signup
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.jwt = null;
      state.role = null;
    },
  },
});

export const { signin, signout, signup } = authSlice.actions;

export default authSlice.reducer;
