import {put} from 'redux-saga/effects';
import axios from "../../axios-orders";
import {purchaseBurgerFail, purchaseBurgerStart, purchaseBurgerSuccess} from "../actions/order";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());

  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}
