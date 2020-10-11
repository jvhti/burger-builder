import React, {useEffect, useState} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../hoc/Loader/Loader";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';

const isPurchasable = (ingredients) => {
  if (!ingredients) return false;
  return Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, cur) => sum + cur, 0) > 0;
};

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuthenticated)
      setPurchasing(true);
    else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo)
    disabledInfo[key] = disabledInfo[key] <= 0;

  return (
      <React.Fragment>
        {!props.error ?
            <Loader loading={props.ings === null}>
              <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                <OrderSummary ingredients={props.ings}
                              purchaseCancelled={purchaseCancelHandler}
                              purchaseContinued={purchaseContinueHandler}
                              price={props.price}/>
              </Modal>
              <Burger ingredients={props.ings}/>
              <BuildControls ingredientAdded={props.onIngredientAdded}
                             ingredientRemoved={props.onIngredientRemoved}
                             disabled={disabledInfo}
                             price={props.price}
                             purchasable={isPurchasable(props.ings)}
                             isAuthenticated={props.isAuthenticated}
                             order={purchaseHandler}/>
            </Loader>
            : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>}
      </React.Fragment>
  );
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
