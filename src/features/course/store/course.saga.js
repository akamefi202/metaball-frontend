import { call, put, takeEvery } from "redux-saga/effects";

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "features/course/api";
import { courseActions } from "features/course/store/course.slice";
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
export function* onGetCourse({ payload }) {
  try {
    yield put(courseActions.actionStarted());
    const data = yield call(getCourse, payload);
    yield put(courseActions.actionEnded());
    if (data.status) {
      yield put(courseActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(courseActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetCourses({ payload }) {
  try {
    yield put(courseActions.actionStarted());
    const data = yield call(getCourses, payload);
    yield put(courseActions.actionEnded());
    yield put(courseActions.fetchAllSucceeded(data));
  } catch (error) {
    yield put(courseActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateCourse({ payload }) {
  try {
    yield put(courseActions.actionStarted());
    const data = yield call(createCourse, payload);
    yield put(courseActions.actionEnded());
    yield put(courseActions.fetchAll(dumpBody));
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
  } catch (error) {
    yield put(courseActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateCourse({ payload }) {
  try {
    yield put(courseActions.actionStarted());
    const data = yield call(updateCourse, payload);
    yield put(courseActions.actionEnded());
    yield put(courseActions.fetchAll(dumpBody));
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
  } catch (error) {
    yield put(courseActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteCourse({ payload }) {
  try {
    yield put(courseActions.actionStarted());
    const data = yield call(deleteCourse, payload);
    yield put(courseActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(courseActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(courseActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* courseWatcherSaga() {
  yield takeEvery(courseActions.get.type, onGetCourse);
  yield takeEvery(courseActions.fetchAll.type, onGetCourses);
  yield takeEvery(courseActions.update.type, onUpdateCourse);
  yield takeEvery(courseActions.delete.type, onDeleteCourse);
  yield takeEvery(courseActions.create.type, onCreateCourse);
}

export default courseWatcherSaga;
