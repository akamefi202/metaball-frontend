// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  content: {
    count: 0,
    data: [],
    type: "",
  },
  selected: {},
  count: 0,
  error: null,
};

// slice
export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.content.data = action.payload.data.content;
      state.content.count = action.payload.data.count;
      state.content.type = action.payload.type;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
  },
});

// Actions
export const contentActions = {
  get: createAction(`${contentSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${contentSlice.name}/create`, (data) => ({
    payload: data,
  })),
  fetchAll: createAction(`${contentSlice.name}/fetchAll`),
  fetchAllSucceeded: contentSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: contentSlice.actions.fetchOneSucceeded,
  update: createAction(`${contentSlice.name}/update`, (data) => ({
    payload: data,
  })),
  delete: createAction(`${contentSlice.name}/delete`, (data) => ({
    payload: data,
  })),
  updateStatus: createAction(`${contentSlice.name}/updateStatus`, (data) => ({
    payload: data,
  })),
};

// Selectors
export const selectContent = (state) => state.content;

// Reducer
export default contentSlice.reducer;
