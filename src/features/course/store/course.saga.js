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

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetCourse({ payload }) {
  const data = yield call(getCourse, payload);
  if (data.status) {
    yield put(courseActions.fetchOneSucceeded(data));
  }
}

export function* onGetCourses({ payload }) {
  const data = yield call(getCourses, payload);
  yield put(courseActions.fetchAllSucceeded(data));
}

function* onCreateCourse({ payload }) {
  const data = yield call(createCourse, payload);
  yield put(courseActions.fetchAll(dumpBody));
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
}

function* onUpdateCourse({ payload }) {
  const data = yield call(updateCourse, payload);
  yield put(courseActions.fetchAll(dumpBody));
  yield put(courseActions.fetchAll(dumpBody));
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
}

function* onDeleteCourse({ payload }) {
  const data = yield call(deleteCourse, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  yield put(courseActions.fetchAll(dumpBody));
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
