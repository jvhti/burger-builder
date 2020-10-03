import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../hoc/Loader/Loader";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  static isPurchasable(ingredients) {
    return Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, cur) => sum + cur, 0) > 0;
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //     .then(response => {
    //       this.setState({ingredients: response.data, purchasable: BurgerBuilder.isPurchasable(response.data)});
    //     })
    //     .catch(() => {
    //       this.setState({error: true});
    //     });
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => {
      const ingredients = {...prevState.ingredients};

      ++ingredients[type];

      return {
        ingredients,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
        purchasable: BurgerBuilder.isPurchasable(ingredients)
      };
    });
  }

  removeIngredientHandler = (type) => {
    this.setState((prevState) => {
      if (prevState.ingredients[type] <= 0) return;

      const ingredients = {...prevState.ingredients};

      --ingredients[type];

      return {
        ingredients,
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type],
        purchasable: BurgerBuilder.isPurchasable(ingredients)
      };
    });
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const queryParams = [];

    for (const i in this.state.ingredients)
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

    queryParams.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0;

    return (
        <React.Fragment>
          {!this.state.error ?
              <Loader loading={this.props.ings === null}>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  <Loader loading={this.state.loading}>
                    <OrderSummary ingredients={this.props.ings}
                                  purchaseCancelled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  price={this.state.totalPrice}/>
                  </Loader>
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls ingredientAdded={this.props.onIngredientAdded}
                               ingredientRemoved={this.props.onIngredientRemoved}
                               disabled={disabledInfo}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               order={this.purchaseHandler}/>
              </Loader>
              : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ings: state.ingredients});

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
