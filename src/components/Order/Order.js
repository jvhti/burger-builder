import React from 'react';
import classes from './Order.module.scss';

const order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients)
    ingredients.push({
      name: ingredientName,
      text: props.ingredients[ingredientName] + ' x ' + ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)
    });


  return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredients.map(x => <span key={x.name}
                                                    style={{
                                                      border: '1px solid #ccc',
                                                      marginRight: '5px',
                                                      padding: '2px 4px'
                                                    }}>{x.text}</span>)} </p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
      </div>
  );
};

export default order;
