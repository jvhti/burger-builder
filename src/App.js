import React, {useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
  );

  if (props.isAuthenticated)
    routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
    );

  return (
      <Layout>
        {routes}
      </Layout>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
