import { call, put, takeEvery } from "redux-saga/effects";

import { getSyslog } from "features/syslog/api";
import { syslogActions } from "features/syslog/store/syslog.slice";

// Worker Sagas
export function* onGetSyslogs({ payload }) {
  const data = yield call(getSyslog, payload);
  yield put(syslogActions.fetchAllSyslogs(data));
}

// Watcher Saga
export function* syslogWatcherSaga() {
  yield takeEvery(syslogActions.fetchAll.type, onGetSyslogs);
}

export default syslogWatcherSaga;
