import { call, put, takeEvery } from "redux-saga/effects";

import {
  createMember,
  deleteMember,
  getMember,
  getMembers,
  updateMember,
} from "features/member/api";
import { memberActions } from "features/member/store/member.slice";
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
export function* onGetMember({ payload }) {
  try {
    yield put(memberActions.actionStarted());
    const data = yield call(getMember, payload);
    yield put(memberActions.actionEnded());
    if (data.status) {
      yield put(memberActions.fetchOneSucceeded(data));
    }
  } catch (error) {
    yield put(memberActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

export function* onGetMembers({ payload }) {
  try {
    yield put(memberActions.actionStarted());
    const response = yield call(getMembers, payload);
    yield put(memberActions.actionEnded());
    yield put(memberActions.fetchAllSucceeded(response));
  } catch (error) {
    yield put(memberActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onCreateMember({ payload }) {
  try {
    yield put(memberActions.actionStarted());
    const data = yield call(createMember, payload);
    yield put(memberActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(memberActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(memberActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onUpdateMember({ payload }) {
  try {
    yield put(memberActions.actionStarted());
    const data = yield call(updateMember, payload);
    yield put(memberActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(memberActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(memberActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

function* onDeleteMember({ payload }) {
  try {
    yield put(memberActions.actionStarted());
    const data = yield call(deleteMember, payload);
    yield put(memberActions.actionEnded());
    if (data.status) {
      yield put(
        showAlert({ type: "success", message: i18n.t("alert.success") })
      );
    } else {
      yield put(showAlert({ type: "error", message: i18n.t("alert.failed") }));
    }
    yield put(memberActions.fetchAll(dumpBody));
  } catch (error) {
    yield put(memberActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* memberWatcherSaga() {
  yield takeEvery(memberActions.get.type, onGetMember);
  yield takeEvery(memberActions.fetchAll.type, onGetMembers);
  yield takeEvery(memberActions.update.type, onUpdateMember);
  yield takeEvery(memberActions.delete.type, onDeleteMember);
  yield takeEvery(memberActions.create.type, onCreateMember);
}

export default memberWatcherSaga;
