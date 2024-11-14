// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  rounding: [],
  count: 0,
  selected: {},
  error: null,
};

// slice
export const roundingSlice = createSlice({
  name: "rounding",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      state.rounding = action.payload.data.roundings;
      state.count = action.payload.data.count;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
  },
});

// Actions
export const roundingActions = {
  get: createAction(`${roundingSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${roundingSlice.name}/create`, (rounding) => ({
    payload: { ...rounding },
  })),
  fetchAll: createAction(`${roundingSlice.name}/fetchAll`),
  fetchAllSucceeded: roundingSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: roundingSlice.actions.fetchOneSucceeded,
  update: createAction(`${roundingSlice.name}/update`),
  delete: createAction(`${roundingSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectRounding = (state) => state.rounding;

// Reducer
export default roundingSlice.reducer;
