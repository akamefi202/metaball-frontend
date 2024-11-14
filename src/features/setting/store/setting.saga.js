import { call, put, takeEvery } from "redux-saga/effects";

import {
  createSetting,
  deleteSetting,
  getSetting,
  getSettings,
  updateSetting,
} from "features/setting/api";
import { settingActions } from "features/setting/store/setting.slice";
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
export function* onGetSetting({ payload }) {
  try {
    const data = yield call(getSetting, payload);
    if (data.status) {
      data.type = payload.type;
      yield put(settingActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetSettings({ payload }) {
  const response = yield call(getSettings, payload);
  response.type = payload.type;
  yield put(settingActions.fetchAllSucceeded(response));
}

function* onCreateSetting({ payload }) {
  const data = yield call(createSetting, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(settingActions.fetchAll(dumpBody));
}

function* onUpdateSetting({ payload }) {
  const data = yield call(updateSetting, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(settingActions.fetchAll(dumpBody));
}

function* onDeleteSetting({ payload }) {
  const data = yield call(deleteSetting, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  dumpBody.type = payload.type;
  yield put(settingActions.fetchAll(dumpBody));
}

// Watcher Saga
export function* settingWatcherSaga() {
  yield takeEvery(settingActions.get.type, onGetSetting);
  yield takeEvery(settingActions.fetchAll.type, onGetSettings);
  yield takeEvery(settingActions.update.type, onUpdateSetting);
  yield takeEvery(settingActions.delete.type, onDeleteSetting);
  yield takeEvery(settingActions.create.type, onCreateSetting);
}

export default settingWatcherSaga;
