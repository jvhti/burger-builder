import React, {useEffect, useState} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../hoc/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions/index';

const isPurchasable = (ingredients) => {
  if (!ingredients) return false;
  return Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, cur) => sum + cur, 0) > 0;
};

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    const onInitIngredients = () => dispatch(actions.initIngredients());

    onInitIngredients();
  }, [dispatch]);

  const purchaseHandler = () => {
    if (isAuthenticated)
      setPurchasing(true);
    else {
      onSetAuthRedirectPath("/checkout");
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...ings
  };

  for (let key in disabledInfo)
    disabledInfo[key] = disabledInfo[key] <= 0;

  return (
      <React.Fragment>
        {!error ?
            <Loader loading={ings === null}>
              <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                <OrderSummary ingredients={ings}
                              purchaseCancelled={purchaseCancelHandler}
                              purchaseContinued={purchaseContinueHandler}
                              price={price}/>
              </Modal>
              <Burger ingredients={ings}/>
              <BuildControls ingredientAdded={onIngredientAdded}
                             ingredientRemoved={onIngredientRemoved}
                             disabled={disabledInfo}
                             price={price}
                             purchasable={isPurchasable(ings)}
                             isAuthenticated={isAuthenticated}
                             order={purchaseHandler}/>
            </Loader>
            : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>}
      </React.Fragment>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
