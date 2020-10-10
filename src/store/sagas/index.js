import {takeEvery} from 'redux-saga/effects';

import {logoutSaga} from './auth';
import {AUTH_INITIATE_LOGOUT} from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
}
