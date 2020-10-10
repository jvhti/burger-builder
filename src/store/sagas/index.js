import {takeEvery} from 'redux-saga/effects';

import {checkAuthTimeoutSaga, logoutSaga} from './auth';
import {AUTH_CHECK_TIMEOUT, AUTH_INITIATE_LOGOUT} from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}
