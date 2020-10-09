import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
  return (
      <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) =>
            <BuildControl key={ctrl.type} label={ctrl.label}
                          added={() => props.ingredientAdded(ctrl.type)}
                          removed={() => props.ingredientRemoved(ctrl.type)}
                          disabled={props.disabled[ctrl.type]}/>)}
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}>
          {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
      </div>
  );
};

buildControls.propTypes = {
  price: PropTypes.number.isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  purchasable: PropTypes.bool.isRequired
};

export default buildControls;
