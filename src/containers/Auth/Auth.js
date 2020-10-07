import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

// TODO: Extract form functions (currently this is a copy of the same function in ContactData Component)
class Auth extends Component {
  state = {
    controls: {
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
    },
    formIsValid: false,
    isSignUp: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;

    if (rules.required) {
      isValid &= value.trim() !== '';
    }

    if (rules.minLength) {
      isValid &= value.length >= rules.minLength;
    }

    if (rules.matchesRegEx) {
      isValid &= value.match(rules.matchesRegEx) !== null;
    }

    return !!isValid;
  };

  inputChangedHandler = (ev, inputIdentifier) => {
    const updatedForm = {...this.state.controls};

    const updatedFormElement = {...this.state.controls[inputIdentifier]};

    updatedFormElement.value = ev.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifier in updatedForm)
      formIsValid &= typeof updatedForm[inputIdentifier].valid === "undefined" || updatedForm[inputIdentifier].valid;

    this.setState({controls: updatedForm, formIsValid: !!formIsValid});
  };

  submitHandler = (ev) => {
    ev.preventDefault();

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({isSignUp: !prevState.isSignUp}));
  };

  render() {
    const formElementsArray = [];

    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    return (
        <div className={classes.Auth}>
          <form onSubmit={this.submitHandler}>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id} elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                       changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
                       invalid={!formElement.config.valid}
                       shouldValidate={!!formElement.config.validation} touched={formElement.config.touched}/>
            ))}
            <Button btnType="Success"
                    disabled={!this.state.formIsValid}>{!this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
          </form>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH
            TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
});

export default connect(null, mapDispatchToProps)(Auth);
