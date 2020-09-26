import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControl.module.scss';

const buildControl = (props) => {
  return (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button disabled={props.disabled} className={classes.Less} onClick={props.removed}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
      </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  removed: PropTypes.func.isRequired,
  added: PropTypes.func.isRequired
};

export default buildControl;
