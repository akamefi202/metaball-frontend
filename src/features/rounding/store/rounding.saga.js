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
import { authActions } from "features/auth/store/auth.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
  start_date: "",
  end_date: "",
};

// Worker Sagas
export function* onGetRounding({ payload }) {
  try {
    yield put(roundingActions.actionStarted());
    const data = yield call(getRounding, payload);
    yield put(roundingActions.actionEnded());
    if (data.status) {
      yield put(roundingActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(roundingActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetRoundings({ payload }) {
  try {
    yield put(roundingActions.actionStarted());
    const data = yield call(getRoundings, payload);
    yield put(roundingActions.actionEnded());
    yield put(roundingActions.fetchAllSucceeded(data));
  } catch (error) {
    yield put(roundingActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateRounding({ payload }) {
  try {
    yield put(roundingActions.actionStarted());
    yield call(createRounding, payload);
    yield put(roundingActions.actionEnded());
    yield put(roundingActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(roundingActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateRounding({ payload }) {
  try {
    yield put(roundingActions.actionStarted());
    yield call(updateRounding, payload);
    yield put(roundingActions.actionEnded());
    yield put(roundingActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(roundingActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteRounding({ payload }) {
  try {
    yield put(roundingActions.actionStarted());
    const data = yield call(deleteRounding, payload);
    yield put(roundingActions.actionEnded());
    yield put(roundingActions.fetchAll(dumpBody));
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
  } catch (error) {
    yield put(roundingActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
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
