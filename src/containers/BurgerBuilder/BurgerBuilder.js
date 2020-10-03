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

class BurgerBuilder extends Component {
  state = {
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

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
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
          {!this.state.error ?
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
                               order={this.purchaseHandler}/>
              </Loader>
              : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
