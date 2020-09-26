import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from './SideDrawer.module.scss';

const sideDrawer = (props) => {
  return (
      <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems/>
          </nav>
        </div>
      </React.Fragment>
  );
};

export default sideDrawer;
