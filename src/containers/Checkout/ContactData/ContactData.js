import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from '../../../axios-orders';
import Loader from "../../../hoc/Loader/Loader";
import {withRouter} from 'react-router-dom';
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Your Name'},
        value: '',
        validation: {required: true, minLength: 5},
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Street'},
        value: '',
        validation: {required: true},
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Country'},
        value: '',
        validation: {required: true},
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'ZIP Code'},
        value: '',
        validation: {required: true, matchesRegEx: new RegExp(/^[\d]{5}-[\d]{3}$/)},
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {type: 'email', placeholder: 'Your E-Mail'},
        value: '',
        validation: {required: true},
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'cheapest'
      },
    },
    loading: false
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

  orderHandler = (ev) => {
    this.setState({loading: true});

    const formData = {};

    for (const formElementIdentifier in this.state.orderForm)
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json', order)
        .then(response => {
          console.log(response);
          this.props.history.replace('/');
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({loading: false});
        });
    ev.preventDefault();
  }

  inputChangedHandler = (ev, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};

    const updatedFormElement = {...this.state.orderForm[inputIdentifier]};

    updatedFormElement.value = ev.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm});

  }

  render() {
    const formElementsArray = [];

    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
              <Input key={formElement.id} elementType={formElement.config.elementType}
                     elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                     changed={(ev) => this.inputChangedHandler(ev, formElement.id)} invalid={!formElement.config.valid}
                     shouldValidate={!!formElement.config.validation}/>
          ))}
          <Button btnType="Success">ORDER</Button>
        </form>
    );

    return (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <Loader loading={this.state.loading}>
            {form}
          </Loader>
        </div>
    );
  }
}

export default withRouter(ContactData);
