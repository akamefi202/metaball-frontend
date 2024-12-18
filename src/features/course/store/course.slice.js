// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  course: [],
  count: 0,
  selected: {},
  error: null,
};

// slice
export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      state.course = action.payload.data.golfcourses;
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
export const courseActions = {
  actionStarted: courseSlice.actions.actionStarted,
  actionEnded: courseSlice.actions.actionEnded,
  get: createAction(`${courseSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  create: createAction(`${courseSlice.name}/create`, (course) => ({
    payload: { ...course },
  })),
  fetchAll: createAction(`${courseSlice.name}/fetchAll`),
  fetchAllSucceeded: courseSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: courseSlice.actions.fetchOneSucceeded,
  update: createAction(`${courseSlice.name}/update`),
  delete: createAction(`${courseSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectCourse = (state) => state.course;

// Reducer
export default courseSlice.reducer;
