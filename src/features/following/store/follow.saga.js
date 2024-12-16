import { call, put, takeEvery } from "redux-saga/effects";

import {
  getFollowedUser,
  getFollowingUser,
  getFollowingRounding,
  getFollowingBlog,
} from "features/following/api";
import { followActions } from "features/following/store/follow.slice";
import { authActions } from "features/auth/store/auth.slice";

// Worker Sagas
export function* onGetFollowedUser({ payload }) {
  try {
    const response = yield call(getFollowedUser, payload);
    yield put(followActions.fetchUserFollowedSucceeded(response.data));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetFollowingUser({ payload }) {
  try {
    const response = yield call(getFollowingUser, payload);
    yield put(followActions.fetchUserFollowingSucceeded(response.data));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetFollowingRounding({ payload }) {
  try {
    const response = yield call(getFollowingRounding, payload);
    yield put(followActions.fetchRoundFollowingSucceeded(response.data));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetFollowingBlog({ payload }) {
  try {
    const response = yield call(getFollowingBlog, payload);
    yield put(followActions.fetchBlogFollowingSucceeded(response.data));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
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
