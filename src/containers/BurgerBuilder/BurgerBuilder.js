import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../hoc/Loader/Loader";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  static isPurchasable(ingredients) {
    if (!ingredients) return false;
    return Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, cur) => sum + cur, 0) > 0;
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated)
      this.setState({purchasing: true});
    else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0;

    return (
        <React.Fragment>
          {!this.props.error ?
              <Loader loading={this.props.ings === null}>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  <Loader loading={this.state.loading}>
                    <OrderSummary ingredients={this.props.ings}
                                  purchaseCancelled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  price={this.props.price}/>
                  </Loader>
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                               ingredientRemoved={this.props.onIngredientRemoved}
                               disabled={disabledInfo}
                               price={this.props.price}
                               purchasable={BurgerBuilder.isPurchasable(this.props.ings)}
                               isAuthenticated={this.props.isAuthenticated}
                               order={this.purchaseHandler}/>
              </Loader>
              : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>}
        </React.Fragment>
    );
  }
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
