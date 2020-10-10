import {delay, put} from 'redux-saga/effects';
import {logout, logoutSucceed} from "../actions/auth";

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');

  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);

  yield put(logout())
}
