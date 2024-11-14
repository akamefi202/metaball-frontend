// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";
import { TOKEN_EXPIRE } from "config";
import { TOKEN_NAME } from "config";
import { AUTH_FAILURE_CODE } from "config";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

// slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = null;

      const token = state.data.token; // Assuming the token is returned in this format
      const expiryTime = new Date().getTime() + state.data.expiresIn * 1000; // Set expiry in seconds

      localStorage.setItem(TOKEN_NAME, token);
      localStorage.setItem(TOKEN_EXPIRE, expiryTime);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem(TOKEN_NAME);
      localStorage.removeItem(TOKEN_EXPIRE);
      state.error = action.payload;
      window.location.reload(false);
    },
  },
});

// Actions
export const authActions = {
  loginRequest: createAction(`${authSlice.name}/signin`, (data) => ({
    payload: { email: data.email, password: data.password },
  })),
  loginSuccess: authSlice.actions.loginSuccess,
  loginFailure: authSlice.actions.loginFailure,
  logout: authSlice.actions.logout,
};
// Selectors
export const selectAuth = (state) => state.auth;

// Reducer
export default authSlice.reducer;
