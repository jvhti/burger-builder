import {PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS, PURCHASE_INIT} from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({type: PURCHASE_BURGER_SUCCESS, orderId: id, orderData});
export const purchaseBurgerFail = (error) => ({type: PURCHASE_BURGER_FAIL, error});
export const purchaseBurgerStart = () => ({type: PURCHASE_BURGER_START});
export const purchaseInit = () => ({type: PURCHASE_INIT});

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
        .then(response => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
          dispatch(purchaseBurgerFail(error));
        });
  };
};
