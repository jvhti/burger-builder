import React, {useCallback, useState} from 'react';
import {connect} from "react-redux";
import classes from './Layout.module.scss';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = useCallback(() => {
    setShowSideDrawer(prevState => !prevState);
  }, [setShowSideDrawer]);

  const sideDrawerClosedHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, [setShowSideDrawer]);

  return (
      <React.Fragment>
        <Toolbar isAuthenticated={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer isAuthenticated={props.isAuthenticated} open={showSideDrawer}
                    closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {props.children}
        </main>
      </React.Fragment>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
