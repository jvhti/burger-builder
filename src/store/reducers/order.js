import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const setLoading = (state, isLoading) => updateObject(state, {loading: isLoading});

const startLoading = (state) => {
  return setLoading(state, true);
};

const stopLoading = (state) => {
  return setLoading(state, false);
};

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat({...action.orderData, id: action.orderId})
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
    case actionTypes.FETCH_ORDERS_START:
      return startLoading(state);

    case actionTypes.PURCHASE_BURGER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return stopLoading(state);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {purchased: false});
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {orders: action.orders, loading: false});
    default:
      return state;
  }

};

export default reducer;
