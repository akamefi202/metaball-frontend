import { call, put, takeEvery } from "redux-saga/effects";

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "features/posts/api";
import { postsActions } from "features/posts/store/posts.slice";

// Worker Sagas
export function* onGetPosts() {
  const posts = yield call(getPosts);
  yield put(postsActions.fetchAllSucceeded(posts));
}

function* onCreatePost({ payload }) {
  yield call(createPost, payload);
  yield put(postsActions.fetchAll());
}

function* onUpdatePost({ payload }) {
  yield call(updatePost, payload);
  yield put(postsActions.fetchAll());
}

function* onDeletePost({ payload }) {
  yield call(deletePost, payload);
  yield put(postsActions.fetchAll());
}

// Watcher Saga
export function* postsWatcherSaga() {
  yield takeEvery(postsActions.fetchAll.type, onGetPosts);
  yield takeEvery(postsActions.update.type, onUpdatePost);
  yield takeEvery(postsActions.delete.type, onDeletePost);
  yield takeEvery(postsActions.create.type, onCreatePost);
}

export default postsWatcherSaga;
