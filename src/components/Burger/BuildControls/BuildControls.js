import React from 'react';
import classes from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = () => {
  return (
      <div className={classes.BuildControls}>
        {controls.map((ctrl) => <BuildControl key={ctrl.type} label={ctrl.label}/>)}
      </div>
  );
};

export default buildControls;