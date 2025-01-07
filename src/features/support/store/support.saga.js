import { call, put, takeEvery } from "redux-saga/effects";

import {
  createSupport,
  deleteSupport,
  getSupport,
  getSupports,
  updateSupport,
} from "features/support/api";
import { supportActions } from "features/support/store/support.slice";
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
export function* onGetSupport({ payload }) {
  try {
    yield put(supportActions.actionStarted());
    const data = yield call(getSupport, payload);
    yield put(supportActions.actionEnded());
    if (data.status) {
      data.type = payload.type;
      yield put(supportActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(supportActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetSupports({ payload }) {
  console.info(payload);
  try {
    yield put(supportActions.actionStarted());
    const data = yield call(getSupports, payload);
    yield put(supportActions.actionEnded());
    data.type = payload.type;
    yield put(supportActions.fetchAllSucceeded(data));
  } catch (error) {
    yield put(supportActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateSupport({ payload }) {
  try {
    yield put(supportActions.actionStarted());
    const data = yield call(createSupport, payload);
    yield put(supportActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    dumpBody.type = payload.type;
    yield put(supportActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(supportActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateSupport({ payload }) {
  try {
    yield put(supportActions.actionStarted());
    const data = yield call(updateSupport, payload);
    yield put(supportActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    dumpBody.type = payload.type;
    yield put(supportActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(supportActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteSupport({ payload }) {
  try {
    yield put(supportActions.actionStarted());
    const data = yield call(deleteSupport, payload);
    yield put(supportActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    dumpBody.type = payload.type;
    yield put(supportActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(supportActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* supportWatcherSaga() {
  yield takeEvery(supportActions.get.type, onGetSupport);
  yield takeEvery(supportActions.fetchAll.type, onGetSupports);
  yield takeEvery(supportActions.update.type, onUpdateSupport);
  yield takeEvery(supportActions.delete.type, onDeleteSupport);
  yield takeEvery(supportActions.create.type, onCreateSupport);
}

export default supportWatcherSaga;
