// src/sagas/alertSaga.js
import { put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import { showAlert, hideAlert } from "features/alert/store/alert.slice";

// Saga to handle success alert
function* showSuccessAlertSaga(action) {
  try {
    const result = yield Swal.fire({
      // title: "Success!",
      text: action.payload.message,
      icon: "success",
      confirmButtonText: "OK",
    });
    if (result.isConfirmed) {
      // Optional: You can dispatch another action if you want
      yield put(hideAlert()); // Hide the alert after it's confirmed
    }
  } catch (error) {
    console.error("Error showing alert", error);
  }
}

// Saga to handle error alert
function* showErrorAlertSaga(action) {
  try {
    const result = yield Swal.fire({
      // title: "Error!",
      text: action.payload.message,
      icon: "error",
      confirmButtonText: "OK",
    });
    if (result.isConfirmed) {
      // Hide alert after confirmation
      yield put(hideAlert());
    }
  } catch (error) {
    console.error("Error showing alert", error);
  }
}

// Watcher Saga
function* watchAlertActions() {
  yield takeEvery("alert/showAlert", function* (action) {
    if (action.payload.type === "success") {
      yield showSuccessAlertSaga(action);
    } else if (action.payload.type === "error") {
      yield showErrorAlertSaga(action);
    }
  });
}

export default watchAlertActions;
