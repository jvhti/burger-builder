import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Loader from "../../hoc/Loader/Loader";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
        <Loader loading={this.props.loading}>
          <div>
            {
              this.props.orders?.map(order => <Order key={order.id} ingredients={order.ingredients}
                                                     price={order.price}/>)
            }
          </div>
        </Loader>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
