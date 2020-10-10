import {put} from 'redux-saga/effects';
import axios from "../../axios-orders";
import {
  fetchOrdersFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  purchaseBurgerFail,
  purchaseBurgerStart,
  purchaseBurgerSuccess
} from "../actions/order";

export function* purchaseBurgerSaga(action) {
  yield put(purchaseBurgerStart());

  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(fetchOrdersStart());

  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

  try {
    const res = yield axios.get('/orders.json' + queryParams);

    const orders = [];
    for (let key in res.data) {
      orders.push({
        id: key,
        ...res.data[key]
      });
    }

    yield put(fetchOrdersSuccess(orders));
  } catch (err) {
    yield put(fetchOrdersFail(err));
  }
}
