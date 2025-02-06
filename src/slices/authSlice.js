import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("authState");
const initialState = storedAuth
  ? JSON.parse(storedAuth)
  : { isAuthenticated: false, user: null, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;

      if (username === "admin" && password === "Test@123") {
        state.isAuthenticated = true;
        state.user = { username };
        state.error = null;
        localStorage.setItem("authState", JSON.stringify(state)); 
      } else {
        state.error = "Invalid Username or Password";
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("authState"); 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
