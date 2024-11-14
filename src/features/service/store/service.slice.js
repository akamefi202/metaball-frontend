// DUCKS pattern
import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  service: {
    count: 0,
    data: [],
    type: "",
  },
  selected: {},
  count: 0,
  error: null,
};

// slice
export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.service.data = action.payload.data.services;
      state.service.count = action.payload.data.count;
      state.service.type = action.payload.type;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
  },
});

// Actions
export const serviceActions = {
  get: createAction(`${serviceSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${serviceSlice.name}/create`, (data) => ({
    payload: data,
  })),
  fetchAll: createAction(`${serviceSlice.name}/fetchAll`),
  fetchAllSucceeded: serviceSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: serviceSlice.actions.fetchOneSucceeded,
  update: createAction(`${serviceSlice.name}/update`, (data) => ({
    payload: data,
  })),
  delete: createAction(`${serviceSlice.name}/delete`, (data) => ({
    payload: data,
  })),
};

// Selectors
export const selectService = (state) => state.service;

// Reducer
export default serviceSlice.reducer;
