import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../hoc/Loader/Loader";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
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
    axios.get('/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data});
        })
        .catch(() => {
          this.setState({error: true});
        });
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
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'João Víctor',
        address: {
          street: 'Rua 1',
          country: 'Brazil',
          zipCode: '1234567'
        },
        email: 'jvoshti@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
        .then(response => console.log(response))
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({loading: false, purchasing: false});
        });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo)
      disabledInfo[key] = disabledInfo[key] <= 0;

    return (
        <React.Fragment>
          {!this.state.error ?
              <Loader loading={this.state.ingredients === null}>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  <Loader loading={this.state.loading}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  purchaseCancelled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  price={this.state.totalPrice}/>
                  </Loader>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);
