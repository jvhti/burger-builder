import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.module.scss';
import {NavLink} from "react-router-dom";

const navigationItem = (props) => {
  return (
      <li className={classes.NavigationItem}>
        <NavLink to={props.link} activeClassName={classes.active} exact>{props.children}</NavLink>
      </li>
  );
};

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default navigationItem;
