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
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.jwt = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
