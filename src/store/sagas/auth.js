import {put} from 'redux-saga/effects';
import {AUTH_LOGOUT} from "../actions/actionTypes";

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');

  yield put({type: AUTH_LOGOUT});
}
