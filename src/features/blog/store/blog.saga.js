import { call, put, takeEvery } from "redux-saga/effects";

import {
  deleteBlog,
  deleteReview,
  getBlog,
  getBlogs,
  updateBlog,
  getReviews,
} from "features/blog/api";
import { blogActions } from "features/blog/store/blog.slice";
import { TABLE_PAGE_LIMIT } from "config";
import i18n from "locale/i18n";
import { showAlert } from "features/alert/store/alert.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetBlog({ payload }) {
  const data = yield call(getBlog, payload);
  if (data.status) {
    yield put(blogActions.fetchOneSucceeded(data));
  }
}

export function* onGetBlogs({ payload }) {
  const data = yield call(getBlogs, payload);
  yield put(blogActions.fetchAllSucceeded(data));
}

export function* onGetReviews({ payload }) {
  const data = yield call(getReviews, payload);
  yield put(blogActions.fetchReviewsSucceeded(data));
}

function* onUpdateBlog({ payload }) {
  yield call(updateBlog, payload);
  yield put(blogActions.fetchAll(dumpBody));
}

function* onDeleteBlog({ payload }) {
  const data = yield call(deleteBlog, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  yield put(blogActions.fetchAll(dumpBody));
}

function* onDeleteReview({ payload }) {
  const data = yield call(deleteReview, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  yield put(blogActions.fetchReviews(dumpBody));
}

// Watcher Saga
export function* blogWatcherSaga() {
  yield takeEvery(blogActions.get.type, onGetBlog);
  yield takeEvery(blogActions.fetchReviews.type, onGetReviews);
  yield takeEvery(blogActions.fetchAll.type, onGetBlogs);
  yield takeEvery(blogActions.update.type, onUpdateBlog);
  yield takeEvery(blogActions.delete.type, onDeleteBlog);
  yield takeEvery(blogActions.deleteReview.type, onDeleteReview);
}

export default blogWatcherSaga;
