import { call, put, takeEvery } from "redux-saga/effects";

import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "features/admin/api";
import { adminActions } from "features/admin/store/admin.slice";
import { authActions } from "features/auth/store/auth.slice";
import { showAlert } from "features/alert/store/alert.slice";
import i18n from "locale/i18n";
import { TABLE_PAGE_LIMIT } from "config";

const dumpBody = {
  limit: TABLE_PAGE_LIMIT,
  skip: 0,
  key: "",
};

// Worker Sagas
export function* onGetAdmin({ payload }) {
  try {
    yield put(adminActions.actionStarted());
    const data = yield call(getAdmin, payload);
    yield put(adminActions.actionEnded());
    if (data.status) {
      yield put(adminActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(adminActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetAdmins({ payload }) {
  try {
    yield put(adminActions.actionStarted());
    const data = yield call(getAdmins, payload);
    yield put(adminActions.actionEnded());
    if (data.status) {
      yield put(adminActions.fetchAllSucceeded(data));
    }
  } catch (error) {
    yield put(adminActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateAdmin({ payload }) {
  try {
    yield put(adminActions.actionStarted());
    const data = yield call(createAdmin, payload);
    yield put(adminActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
      yield put(adminActions.fetchAll(dumpBody));
    } else {
      yield put(adminActions.actionEnded());
      yield put(
        showAlert({ type: "error", message: i18n.t("alert.admin203") })
      );
    }
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateAdmin({ payload }) {
  try {
    yield put(adminActions.actionStarted());
    const data = yield call(updateAdmin, payload);
    yield put(adminActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(adminActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(adminActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteAdmin({ payload }) {
  try {
    yield put(adminActions.actionStarted());
    const data = yield call(deleteAdmin, payload);
    yield put(adminActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(adminActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(adminActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* adminWatcherSaga() {
  yield takeEvery(adminActions.get.type, onGetAdmin);
  yield takeEvery(adminActions.fetchAll.type, onGetAdmins);
  yield takeEvery(adminActions.update.type, onUpdateAdmin);
  yield takeEvery(adminActions.delete.type, onDeleteAdmin);
  yield takeEvery(adminActions.create.type, onCreateAdmin);
}

export default adminWatcherSaga;
