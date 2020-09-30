import React from 'react';
import classes from './Order.module.scss';

const order = () => {
  return (
      <div className={classes.Order}>
        <p>Ingredients: 1xSalad </p>
        <p>Price: <strong>USD 5.45</strong></p>
      </div>
  );
};

export default order;
