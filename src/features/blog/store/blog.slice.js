// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  blog: [],
  review: [],
  reviewCount: 0,
  count: 0,
  selected: {},
  error: null,
};

// slice
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      state.blog = action.payload.data.blogs;
      state.count = action.payload.data.count;
    },
    fetchOneSucceeded(state, action) {
      state.selected = action.payload.data;
    },
    fetchReviewsSucceeded(state, action) {
      state.review = action.payload.data.reviews;
      state.reviewCount = action.payload.data.count;
    },
  },
});

// Actions
export const blogActions = {
  get: createAction(`${blogSlice.name}/get`, (id) => ({
    payload: { id },
  })),
  fetchReviews: createAction(`${blogSlice.name}/fetchReviews`),
  fetchReviewsSucceeded: blogSlice.actions.fetchReviewsSucceeded,
  fetchAll: createAction(`${blogSlice.name}/fetchAll`),
  fetchAllSucceeded: blogSlice.actions.fetchAllSucceeded,
  fetchOneSucceeded: blogSlice.actions.fetchOneSucceeded,
  update: createAction(`${blogSlice.name}/update`),
  delete: createAction(`${blogSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
  deleteReview: createAction(`${blogSlice.name}/delete`, (data) => ({
    payload: { ids: data },
  })),
};

// Selectors
export const selectBlog = (state) => state.blog;

// Reducer
export default blogSlice.reducer;
