import {
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_INIT
} from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData});
export const purchaseBurgerFail = (error) => ({type: PURCHASE_BURGER_FAIL, error});
export const purchaseBurgerStart = () => ({type: PURCHASE_BURGER_START});
export const purchaseInit = () => ({type: PURCHASE_INIT});

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
          dispatch(purchaseBurgerFail(error));
        });
  };
};

export const fetchOrdersSuccess = (orders) => ({type: FETCH_ORDERS_SUCCESS, orders});
export const fetchOrdersFail = (error) => ({type: FETCH_ORDERS_FAIL, error});
export const fetchOrdersStart = () => ({type: FETCH_ORDERS_START});

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get('/orders.json' + queryParams)
        .then(res => {
          const orders = [];
          for (let key in res.data) {
            orders.push({
              id: key,
              ...res.data[key]
            });
          }

          dispatch(fetchOrdersSuccess(orders));
        })
        .catch((err) => {
          dispatch(fetchOrdersFail(err));
        });
  }
};
