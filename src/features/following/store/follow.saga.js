import { call, put, takeEvery } from "redux-saga/effects";

import {
  getFollowedUser,
  getFollowingUser,
  getFollowingRounding,
  getFollowingBlog,
} from "features/following/api";
import { followActions } from "features/following/store/follow.slice";

// Worker Sagas
export function* onGetFollowedUser({ payload }) {
  const response = yield call(getFollowedUser, payload);
  yield put(followActions.fetchUserFollowedSucceeded(response.data));
}
export function* onGetFollowingUser({ payload }) {
  const response = yield call(getFollowingUser, payload);
  yield put(followActions.fetchUserFollowingSucceeded(response.data));
}
export function* onGetFollowingRounding({ payload }) {
  const response = yield call(getFollowingRounding, payload);
  yield put(followActions.fetchRoundFollowingSucceeded(response.data));
}
export function* onGetFollowingBlog({ payload }) {
  const response = yield call(getFollowingBlog, payload);
  yield put(followActions.fetchBlogFollowingSucceeded(response.data));
}

// Watcher Saga
export function* followWatcherSaga() {
  yield takeEvery(followActions.fetchUserFollowed.type, onGetFollowedUser);
  yield takeEvery(followActions.fetchUserFollowing.type, onGetFollowingUser);
  yield takeEvery(
    followActions.fetchRoundFollowing.type,
    onGetFollowingRounding
  );
  yield takeEvery(followActions.fetchBlogFollowing.type, onGetFollowingBlog);
}

export default followWatcherSaga;