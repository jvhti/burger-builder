import React from 'react';
import PropTypes from 'prop-types';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {
  return (
      <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}
             onClick={props.closed}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
          </nav>
        </div>
      </React.Fragment>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired
};

export default sideDrawer;
