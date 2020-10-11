import React, {useEffect, useState} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Loader from "../../hoc/Loader/Loader";
import {Redirect} from "react-router-dom";
import {inputChangedHandlerFactory} from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {type: 'email', placeholder: 'Mail Address'},
      value: '',
      validation: {required: true, isEmail: true},
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {type: 'password', placeholder: 'Password'},
      value: '',
      validation: {required: true, minLength: 6},
      valid: false,
      touched: false
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!props.isBuildingBurger && props.authRedirectPath !== '/')
      props.onSetAuthRedirectPath();
  }, []);

  const inputChangedHandler = inputChangedHandlerFactory(controls, setControls, setFormIsValid);

  const submitHandler = (ev) => {
    ev.preventDefault();

    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(prevState => (!prevState));
  };

  const formElementsArray = [];

  for (const key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (<p>{props.error.message}</p>);
  }

  if (props.isAuthenticated)
    return <Redirect to={props.authRedirectPath}/>;

  return (
      <div className={classes.Auth}>
        <form onSubmit={submitHandler}>
          {errorMessage}
          <Loader loading={props.loading}>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id} elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                       changed={(ev) => inputChangedHandler(ev, formElement.id)}
                       invalid={!formElement.config.valid}
                       shouldValidate={!!formElement.config.validation} touched={formElement.config.touched}/>
            ))}
          </Loader>
          <Button btnType="Success"
                  disabled={!formIsValid}>{!isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthModeHandler}>SWITCH
          TO {isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
      </div>
  );
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  authRedirectPath: state.auth.authRedirectPath,
  isBuildingBurger: state.burgerBuilder.building
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
