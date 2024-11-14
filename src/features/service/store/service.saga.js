import { call, put, takeEvery } from "redux-saga/effects";

import {
  createService,
  deleteService,
  getService,
  getServices,
  updateService,
} from "features/service/api";
import { serviceActions } from "features/service/store/service.slice";
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
export function* onGetService({ payload }) {
  try {
    const data = yield call(getService, payload);
    if (data.status) {
      data.type = payload.type;
      yield put(serviceActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetServices({ payload }) {
  const data = yield call(getServices, payload);
  data.type = payload.type;
  yield put(serviceActions.fetchAllSucceeded(data));
}

function* onCreateService({ payload }) {
  const data = yield call(createService, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(serviceActions.fetchAll(dumpBody));
}

function* onUpdateService({ payload }) {
  const data = yield call(updateService, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(serviceActions.fetchAll(dumpBody));
}

function* onDeleteService({ payload }) {
  const data = yield call(deleteService, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(serviceActions.fetchAll(dumpBody));
}

// Watcher Saga
export function* serviceWatcherSaga() {
  yield takeEvery(serviceActions.get.type, onGetService);
  yield takeEvery(serviceActions.fetchAll.type, onGetServices);
  yield takeEvery(serviceActions.update.type, onUpdateService);
  yield takeEvery(serviceActions.delete.type, onDeleteService);
  yield takeEvery(serviceActions.create.type, onCreateService);
}

export default serviceWatcherSaga;
