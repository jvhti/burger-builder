import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from '../../../axios-orders';
import Loader from "../../../hoc/Loader/Loader";
import {withRouter} from 'react-router-dom';
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
import {updateObject} from "../../../shared/utility";

// TODO: Extract form functions (currently this is a copy of the same function in Auth Component)
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Your Name'},
        value: '',
        validation: {required: true, minLength: 5},
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Street'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'Country'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {type: 'text', placeholder: 'ZIP Code'},
        value: '',
        validation: {required: true, matchesRegEx: new RegExp(/^[\d]{5}-[\d]{3}$/)},
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {type: 'email', placeholder: 'Your E-Mail'},
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'cheapest',
        touched: false
      },
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

  orderHandler = (ev) => {
    ev.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.state.orderForm)
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (ev, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: ev.target.value,
      touched: true,
      valid: this.checkValidity(ev.target.value, this.state.orderForm[inputIdentifier].validation)
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm)
      formIsValid &= typeof updatedOrderForm[inputIdentifier].valid === "undefined" || updatedOrderForm[inputIdentifier].valid;

    this.setState({orderForm: updatedOrderForm, formIsValid: !!formIsValid});
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
                     shouldValidate={!!formElement.config.validation} touched={formElement.config.touched}/>
          ))}
          <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
    );

    return (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <Loader loading={this.props.loading}>
            {form}
          </Loader>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));
