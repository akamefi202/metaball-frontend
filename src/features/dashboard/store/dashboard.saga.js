import { call, put, takeEvery } from "redux-saga/effects";

import { getDashboardInfo } from "features/dashboard/api";
import { dashboardActions } from "features/dashboard/store/dashboard.slice";
import { authActions } from "features/auth/store/auth.slice";

// Worker Sagas
function* onGetDashboardInfo() {
  try {
    const response = yield call(getDashboardInfo);
    if (response.status) {
      yield put(dashboardActions.fetchAllSuccess(response));
    } else {
      yield put(dashboardActions.fetchFailure(response));
    }
  } catch (error) {
    yield put(dashboardActions.fetchFailure({ error }));
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* dashboardWatcherSaga() {
  yield takeEvery(dashboardActions.getDashboardInfo.type, onGetDashboardInfo);
}

export default dashboardWatcherSaga;
