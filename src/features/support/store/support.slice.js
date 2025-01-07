// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  support: {
    count: 0,
    data: [],
    type: "",
  },
  selected: {},
  count: 0,
  error: null,
};

// slice
export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.support.data = action.payload.data.primes;
      state.support.count = action.payload.data.count;
      state.support.type = action.payload.type;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
    actionStarted(state, action) {
      state.loading = true;
    },
    actionEnded(state, action) {
      state.loading = false;
    },
  },
});

// Actions
export const supportActions = {
  actionStarted: supportSlice.actions.actionStarted,
  actionEnded: supportSlice.actions.actionEnded,
  get: createAction(`${supportSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${supportSlice.name}/create`, (data) => ({
    payload: data,
  })),
  fetchAll: createAction(`${supportSlice.name}/fetchAll`),
  fetchAllSucceeded: supportSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: supportSlice.actions.fetchOneSucceeded,
  update: createAction(`${supportSlice.name}/update`, (data) => ({
    payload: data,
  })),
  delete: createAction(`${supportSlice.name}/delete`, (data) => ({
    payload: data,
  })),
};

// Selectors
export const selectSupport = (state) => state.support;

// Reducer
export default supportSlice.reducer;
