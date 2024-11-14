import { call, put, takeEvery } from "redux-saga/effects";

import { getUserMessage, getClubMessage } from "features/message/api";
import { messageActions } from "features/message/store/message.slice";

// Worker Sagas
export function* onGetUserMessage({ payload }) {
  const response = yield call(getUserMessage, payload);
  yield put(messageActions.fetchUserMessageSucceeded(response));
}
export function* onGetClubMessage({ payload }) {
  const response = yield call(getClubMessage, payload);
  yield put(messageActions.fetchClubMessageSucceeded(response));
}

// Watcher Saga
export function* messageWatcherSaga() {
  yield takeEvery(messageActions.fetchUserMessage.type, onGetUserMessage);
  yield takeEvery(messageActions.fetchClubMessage.type, onGetClubMessage);
}

export default messageWatcherSaga;
