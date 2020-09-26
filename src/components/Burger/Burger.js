import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.scss';

const burger = ({ingredients}) => {
  let transformedIngredients = Object.keys(ingredients).map((key) => {
    return [...Array(ingredients[key])].map((_, i) =>
        <BurgerIngredient key={key + i} type={key}/>
    );
  }).reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0)
    transformedIngredients = <p>Please start adding ingredients</p>;

  return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"/>
      </div>
  );
};

export default burger;