// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  club: [],
  count: 0,
  selected: {},
  error: null,
};

// slice
export const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      state.club = action.payload.data.clubs;
      state.count = action.payload.data.count;
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
export const clubActions = {
  actionStarted: clubSlice.actions.actionStarted,
  actionEnded: clubSlice.actions.actionEnded,
  get: createAction(`${clubSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${clubSlice.name}/create`, (club) => ({
    payload: { ...club },
  })),
  fetchAll: createAction(`${clubSlice.name}/fetchAll`),
  fetchAllSucceeded: clubSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: clubSlice.actions.fetchOneSucceeded,
  update: createAction(`${clubSlice.name}/update`),
  delete: createAction(`${clubSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectClub = (state) => state.club;

// Reducer
export default clubSlice.reducer;
