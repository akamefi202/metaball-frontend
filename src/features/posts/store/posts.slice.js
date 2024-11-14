// DUCKS pattern
import { createAction, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

// slice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.posts = action.payload;
    },
  },
});

// Actions
export const postsActions = {
  create: createAction(`${postsSlice.name}/create`, (post) => ({
    payload: { id: nanoid(), title: post.title, body: post.body },
  })),
  fetchAll: createAction(`${postsSlice.name}/fetchAll`),
  fetchAllSucceeded: postsSlice.actions.fetchAllSucceeded,
  update: createAction(`${postsSlice.name}/update`),
  delete: createAction(`${postsSlice.name}/delete`),
};

// Selectors
export const selectPosts = (state) => state.posts.posts;

// Reducer
export default postsSlice.reducer;
