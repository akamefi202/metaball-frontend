import { call, put, takeEvery } from "redux-saga/effects";

import {
  createContent,
  deleteContent,
  getContent,
  getContents,
  updateContent,
} from "features/content/api";
import { contentActions } from "features/content/store/content.slice";
import { authActions } from "features/auth/store/auth.slice";
import { TABLE_PAGE_LIMIT } from "config";
import { showAlert } from "features/alert/store/alert.slice";
import i18n from "locale/i18n";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetContent({ payload }) {
  try {
    const data = yield call(getContent, payload);
    if (data.status) {
      data.type = payload.type;
      yield put(contentActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetContents({ payload }) {
  const data = yield call(getContents, payload);
  data.type = payload.type;
  yield put(contentActions.fetchAllSucceeded(data));
}

function* onCreateContent({ payload }) {
  const data = yield call(createContent, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(contentActions.fetchAll(dumpBody));
}

function* onUpdateContent({ payload }) {
  const data = yield call(updateContent, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(contentActions.fetchAll(dumpBody));
}

function* onDeleteContent({ payload }) {
  const data = yield call(deleteContent, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(contentActions.fetchAll(dumpBody));
}

// Watcher Saga
export function* contentWatcherSaga() {
  yield takeEvery(contentActions.get.type, onGetContent);
  yield takeEvery(contentActions.fetchAll.type, onGetContents);
  yield takeEvery(contentActions.update.type, onUpdateContent);
  yield takeEvery(contentActions.delete.type, onDeleteContent);
  yield takeEvery(contentActions.create.type, onCreateContent);
}

export default contentWatcherSaga;
