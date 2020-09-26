import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.scss';

const backdrop = (props) => props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null;

backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func
};

export default backdrop;
