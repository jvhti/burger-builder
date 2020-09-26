import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    this.setState((prevState) => {
      const ingredients = {...prevState.ingredients};

      ++ingredients[type];

      return {ingredients, totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]};
    });
  }

  removeIngredientHandler = (type) => {
    this.setState((prevState) => {
      if (prevState.ingredients[type] <= 0) return;

      const ingredients = {...prevState.ingredients};

      --ingredients[type];

      return {ingredients, totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]};
    });
  }

  render() {
    return (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}/>
        </React.Fragment>
    );
  }
}

export default BurgerBuilder;