// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

// slice
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchAllSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

// Actions
export const dashboardActions = {
  getDashboardInfo: createAction(`${dashboardSlice.name}/dashboard`),
  fetchAllSuccess: dashboardSlice.actions.fetchAllSuccess,
  fetchFailure: dashboardSlice.actions.fetchFailure,
};
// Selectors
export const selectDashboard = (state) => state.dashboard;

// Reducer
export default dashboardSlice.reducer;
