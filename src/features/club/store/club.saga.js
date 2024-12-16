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
import { authActions } from "features/auth/store/auth.slice";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetClub({ payload }) {
  try {
    const data = yield call(getClub, payload);
    if (data.status) {
      yield put(clubActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetClubs({ payload }) {
  try {
    const data = yield call(getClubs, payload);
    yield put(clubActions.fetchAllSucceeded(data));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateClub({ payload }) {
  try {
    yield call(createClub, payload);
    yield put(clubActions.fetchAll(dumpBody));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateClub({ payload }) {
  try {
    yield call(updateClub, payload);
    yield put(clubActions.fetchAll(dumpBody));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteClub({ payload }) {
  try {
    const data = yield call(deleteClub, payload);
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(clubActions.fetchAll(dumpBody));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
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
