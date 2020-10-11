import React, {useCallback} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

const Checkout = props => {
  const checkoutCancelledHandler = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  const checkoutContinuedHandler = useCallback(() => {
    props.history.replace('/checkout/contact-data');
  }, [props.history]);

  if (!props.ings || props.purchased)
    return <Redirect to="/"/>;
  else
    return (
        <div>
          <CheckoutSummary ingredients={props.ings}
                           checkoutCancelled={checkoutCancelledHandler}
                           checkoutContinued={checkoutContinuedHandler}/>
          <Route path={props.match.path + '/contact-data'} component={ContactData}/>
        </div>
    );
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
