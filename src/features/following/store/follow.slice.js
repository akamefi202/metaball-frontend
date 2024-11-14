// DUCKS pattern
import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  following: {
    userFollowed: {},
    userFollowing: {},
    bolgFollowing: {},
    roundFollowing: {},
  },
  error: null,
};

// slice
export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    fetchUserFollowedSucceeded(state, action) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.following.userFollowed = action.payload;
    },
    fetchUserFollowingSucceeded(state, action) {
      state.following.userFollowing = action.payload;
    },
    fetchRoundFollowingSucceeded(state, action) {
      state.following.userFollowing = action.payload;
    },
    fetchBlogFollowingSucceeded(state, action) {
      state.following.userFollowing = action.payload;
    },
  },
});

// Actions
export const followActions = {
  fetchUserFollowed: createAction(`${followSlice.name}/fetchUserFollowed`),
  fetchUserFollowedSucceeded: followSlice.actions.fetchUserFollowedSucceeded,
  fetchUserFollowing: createAction(`${followSlice.name}/fetchUserFollowing`),
  fetchUserFollowingSucceeded: followSlice.actions.fetchUserFollowingSucceeded,
  fetchRoundFollowing: createAction(`${followSlice.name}/fetchRoundFollowing`),
  fetchRoundFollowingSucceeded:
    followSlice.actions.fetchRoundFollowingSucceeded,
  fetchBlogFollowing: createAction(`${followSlice.name}/fetchBlogFollowing`),
  fetchBlogFollowingSucceeded: followSlice.actions.fetchBlogFollowingSucceeded,
};

// Selectors
export const selectFollow = (state) => state.follow;

// Reducer
export default followSlice.reducer;
