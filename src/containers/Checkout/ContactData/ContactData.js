import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from '../../../axios-orders';
import Loader from "../../../hoc/Loader/Loader";
import {withRouter} from 'react-router-dom';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (ev) => {
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'João Víctor',
        address: {
          street: 'Rua 1',
          country: 'Brazil',
          zipCode: '1234567'
        },
        email: 'jvoshti@gmail.com'
      },
      deliveryMethod: 'fastest'
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

  render() {
    return (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <Loader loading={this.state.loading}>
            <form>
              <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
              <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
              <input className={classes.Input} type="text" name="street" placeholder="Street"/>
              <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
              <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
          </Loader>
        </div>
    );
  }
}

export default withRouter(ContactData);
