import { call, put, takeEvery } from "redux-saga/effects";

import { getUserMessage, getClubMessage } from "features/message/api";
import { messageActions } from "features/message/store/message.slice";
import { authActions } from "features/auth/store/auth.slice";

// Worker Sagas
export function* onGetUserMessage({ payload }) {
  try {
    const response = yield call(getUserMessage, payload);
    yield put(messageActions.fetchUserMessageSucceeded(response));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}
export function* onGetClubMessage({ payload }) {
  try {
    const response = yield call(getClubMessage, payload);
    yield put(messageActions.fetchClubMessageSucceeded(response));
  } catch (error) {
    if (error.status === 401) {
      yield put(authActions.logout(error));
    }
  }
}

// Watcher Saga
export function* messageWatcherSaga() {
  yield takeEvery(messageActions.fetchUserMessage.type, onGetUserMessage);
  yield takeEvery(messageActions.fetchClubMessage.type, onGetClubMessage);
}

export default messageWatcherSaga;
