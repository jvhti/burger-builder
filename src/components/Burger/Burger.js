import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.scss';

const burger = ({ingredients}) => {
  const transformedIngredients = Object.keys(ingredients).map((key) => {
    return [...Array(ingredients[key])].map((_, i) =>
        <BurgerIngredient key={key + i} type={key}/>
    );
  });

  return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"/>
      </div>
  );
};

export default burger;