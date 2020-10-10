import {put} from 'redux-saga/effects';
import {logoutSucceed} from "../actions/auth";

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');

  yield put(logoutSucceed());
}
