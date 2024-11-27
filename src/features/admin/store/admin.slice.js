// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  admin: [],
  selected: {},
  count: 0,
  error: null,
};

// slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.admin = action.payload.data.managers;
      state.count = action.payload.data.count;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
  },
});

// Actions
export const adminActions = {
  get: createAction(`${adminSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${adminSlice.name}/create`, (data) => ({
    payload: { email: data.email, password: data.password },
  })),
  fetchAll: createAction(`${adminSlice.name}/fetchAll`),
  fetchAllSucceeded: adminSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: adminSlice.actions.fetchOneSucceeded,
  update: createAction(`${adminSlice.name}/update`, (data) => {
    return {
      payload: { id: data.id, email: data.email, password: data.password },
    };
  }),
  delete: createAction(`${adminSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectAdmin = (state) => state.admin;

// Reducer
export default adminSlice.reducer;
