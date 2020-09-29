import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let param of query.entries()) {
      if (param[0] === 'price') continue;
      ingredients[param[0]] = +param[1];
    }

    this.setState({ingredients, totalPrice: +query.get('price')});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
        <div>
          <CheckoutSummary ingredients={this.state.ingredients}
                           checkoutCancelled={this.checkoutCancelledHandler}
                           checkoutContinued={this.checkoutContinuedHandler}/>
          <Route path={this.props.match.path + '/contact-data'}
                 render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}/>
        </div>
    );
  }
}

export default Checkout;
