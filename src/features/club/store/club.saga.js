import { call, put, takeEvery } from "redux-saga/effects";

import {
  createClub,
  deleteClub,
  getClub,
  getClubs,
  updateClub,
} from "features/club/api";
import { clubActions } from "features/club/store/club.slice";
import { TABLE_PAGE_LIMIT } from "config";
import i18n from "locale/i18n";
import { showAlert } from "features/alert/store/alert.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetClub({ payload }) {
  const data = yield call(getClub, payload);
  if (data.status) {
    yield put(clubActions.fetchOneSucceeded(data));
  }
}

export function* onGetClubs({ payload }) {
  const data = yield call(getClubs, payload);
  yield put(clubActions.fetchAllSucceeded(data));
}

function* onCreateClub({ payload }) {
  yield call(createClub, payload);
  yield put(clubActions.fetchAll(dumpBody));
}

function* onUpdateClub({ payload }) {
  yield call(updateClub, payload);
  yield put(clubActions.fetchAll(dumpBody));
}

function* onDeleteClub({ payload }) {
  const data = yield call(deleteClub, payload);
  if (data.status) {
    yield put(showAlert({ type: "success", message: i18n.t("alert.success") }));
  } else {
    yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
  }
  yield put(clubActions.fetchAll(dumpBody));
}

// Watcher Saga
export function* clubWatcherSaga() {
  yield takeEvery(clubActions.get.type, onGetClub);
  yield takeEvery(clubActions.fetchAll.type, onGetClubs);
  yield takeEvery(clubActions.update.type, onUpdateClub);
  yield takeEvery(clubActions.delete.type, onDeleteClub);
  yield takeEvery(clubActions.create.type, onCreateClub);
}

export default clubWatcherSaga;
