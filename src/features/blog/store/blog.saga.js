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
import { authActions } from "features/auth/store/auth.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetBlog({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    const data = yield call(getBlog, payload);
    yield put(blogActions.actionEnded());
    if (data.status) {
      yield put(blogActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetBlogs({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    const data = yield call(getBlogs, payload);
    yield put(blogActions.actionEnded());
    yield put(blogActions.fetchAllSucceeded(data));
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetReviews({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    const data = yield call(getReviews, payload);
    yield put(blogActions.actionEnded());
    yield put(blogActions.fetchReviewsSucceeded(data));
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateBlog({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    yield call(updateBlog, payload);
    yield put(blogActions.actionEnded());
    yield put(blogActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteBlog({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    const data = yield call(deleteBlog, payload);
    yield put(blogActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(blogActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteReview({ payload }) {
  try {
    yield put(blogActions.actionStarted());
    const data = yield call(deleteReview, payload);
    yield put(blogActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(blogActions.fetchReviews(dumpBody));
  } catch (error) {
    yield put(blogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
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
