// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  member: [],
  selected: {},
  count: 0,
  error: null,
};

// slice
export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.member = action.payload.data.users;
      state.count = action.payload.data.count;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
  },
});

// Actions
export const memberActions = {
  get: createAction(`${memberSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${memberSlice.name}/create`, (member) => ({
    payload: { ...member },
  })),
  fetchAll: createAction(`${memberSlice.name}/fetchAll`),
  fetchAllSucceeded: memberSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: memberSlice.actions.fetchOneSucceeded,
  update: createAction(`${memberSlice.name}/update`, (data) => ({
    payload: { ...data },
  })),
  delete: createAction(`${memberSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectMembers = (state) => state.member;

// Reducer
export default memberSlice.reducer;
