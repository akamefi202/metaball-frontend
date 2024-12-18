import { call, put, takeEvery } from "redux-saga/effects";

import { getSyslog } from "features/syslog/api";
import { syslogActions } from "features/syslog/store/syslog.slice";
import { authActions } from "features/auth/store/auth.slice";

// Worker Sagas
export function* onGetSyslogs({ payload }) {
  try {
    yield put(syslogActions.actionStarted());
    const data = yield call(getSyslog, payload);
    yield put(syslogActions.actionEnded());
    yield put(syslogActions.fetchAllSyslogs(data));
  } catch (error) {
    yield put(syslogActions.actionEnded());
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* syslogWatcherSaga() {
  yield takeEvery(syslogActions.fetchAll.type, onGetSyslogs);
}

export default syslogWatcherSaga;
