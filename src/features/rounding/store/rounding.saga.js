import { call, put, takeEvery } from "redux-saga/effects";

import {
  createRounding,
  deleteRounding,
  getRounding,
  getRoundings,
  updateRounding,
} from "features/rounding/api";
import { roundingActions } from "features/rounding/store/rounding.slice";
import { TABLE_PAGE_LIMIT } from "config";
import i18n from "locale/i18n";
import { showAlert } from "features/alert/store/alert.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
  start_date: "",
  end_date: "",
};

// Worker Sagas
export function* onGetRounding({ payload }) {
  const data = yield call(getRounding, payload);
  if (data.status) {
    yield put(roundingActions.fetchOneSucceeded(data));
  }
}

export function* onGetRoundings({ payload }) {
  const data = yield call(getRoundings, payload);
  yield put(roundingActions.fetchAllSucceeded(data));
}

function* onCreateRounding({ payload }) {
  yield call(createRounding, payload);
  yield put(roundingActions.fetchAll(dumpBody));
}

function* onUpdateRounding({ payload }) {
  yield call(updateRounding, payload);
  yield put(roundingActions.fetchAll(dumpBody));
}

function* onDeleteRounding({ payload }) {
  const data = yield call(deleteRounding, payload);
  yield put(roundingActions.fetchAll(dumpBody));
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
}

// Watcher Saga
export function* roundingWatcherSaga() {
  yield takeEvery(roundingActions.get.type, onGetRounding);
  yield takeEvery(roundingActions.fetchAll.type, onGetRoundings);
  yield takeEvery(roundingActions.update.type, onUpdateRounding);
  yield takeEvery(roundingActions.delete.type, onDeleteRounding);
  yield takeEvery(roundingActions.create.type, onCreateRounding);
}

export default roundingWatcherSaga;
