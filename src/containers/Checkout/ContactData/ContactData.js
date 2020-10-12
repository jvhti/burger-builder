import React, {useCallback, useState} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from '../../../axios-orders';
import Loader from "../../../hoc/Loader/Loader";
import {withRouter} from 'react-router-dom';
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
import {inputChangedHandlerFactory} from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
      }
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const {ings, price, userId, token, onOrderBurger} = props;

  const orderHandler = useCallback((ev) => {
    ev.preventDefault();

    const formData = {};

    for (const formElementIdentifier in orderForm)
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;

    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId
    };

    onOrderBurger(order, token);
  }, [onOrderBurger, ings, price, orderForm, userId, token]);

  const inputChangedHandler = inputChangedHandlerFactory(orderForm, setOrderForm, setFormIsValid);

  const formElementsArray = [];

  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  const form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig} value={formElement.config.value}
                   changed={(ev) => inputChangedHandler(ev, formElement.id)} invalid={!formElement.config.valid}
                   shouldValidate={!!formElement.config.validation} touched={formElement.config.touched}/>
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
  );

  return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <Loader loading={props.loading}>
          {form}
        </Loader>
      </div>
  );
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
