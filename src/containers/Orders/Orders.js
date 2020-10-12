import React, {useEffect} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Loader from "../../hoc/Loader/Loader";

const Orders = ({onFetchOrders, token, userId, orders, loading}) => {

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  return (
      <Loader loading={loading}>
        <div>
          {
            orders?.map(order => <Order key={order.id} ingredients={order.ingredients}
                                        price={order.price}/>)
          }
        </div>
      </Loader>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
