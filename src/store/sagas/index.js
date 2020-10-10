import {all, takeEvery, takeLatest} from 'redux-saga/effects';

import {authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga} from './auth';
import {
  AUTH_CHECK_STATE,
  AUTH_CHECK_TIMEOUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_USER,
  FETCH_ORDERS,
  INIT_INGREDIENTS,
  PURCHASE_BURGER
} from "../actions/actionTypes";
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./order";

export function* watchAuth() {
  yield all([
    takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(AUTH_USER, authUserSaga),
    takeEvery(AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}
