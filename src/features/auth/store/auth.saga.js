import { call, put, takeEvery } from "redux-saga/effects";

import { signin } from "features/auth/api";
import { authActions } from "features/auth/store/auth.slice";
import { showAlert } from "features/alert/store/alert.slice";
import i18n from "locale/i18n";
// Worker Sagas
function* onSignin({ payload }) {
  try {
    const response = yield call(signin, payload);
    if (response.status) {
      yield put(authActions.loginSuccess(response));
    } else {
      yield put(authActions.loginFailure(response));
      yield put(
        showAlert({ type: "error", message: i18n.t("alert.loginFailed01") })
      );
    }
  } catch (error) {
    yield put(authActions.loginFailure({ error }));
    yield put(
      showAlert({ type: "error", message: i18n.t("alert.networkError") })
    );
  }
}

// Watcher Saga
export function* authWatcherSaga() {
  yield takeEvery(authActions.loginRequest.type, onSignin);
}

export default authWatcherSaga;
