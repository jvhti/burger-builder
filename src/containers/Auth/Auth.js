import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.scss';

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
    formIsValid: false
  }

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
  }

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
  }

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
          <form>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id} elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                       changed={(ev) => this.inputChangedHandler(ev, formElement.id)}
                       invalid={!formElement.config.valid}
                       shouldValidate={!!formElement.config.validation} touched={formElement.config.touched}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>
        </div>
    );
  }
}

export default Auth;
