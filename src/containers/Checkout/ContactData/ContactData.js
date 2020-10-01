import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from '../../../axios-orders';
import Loader from "../../../hoc/Loader/Loader";
import {withRouter} from 'react-router-dom';
import Input from "../../../components/UI/Input/Input";

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
      price: this.props.price,
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
              <Input inputType="input" type="text" name="name" placeholder="Your Name"/>
              <Input inputType="input" type="email" name="email" placeholder="Your Email"/>
              <Input inputType="input" type="text" name="street" placeholder="Street"/>
              <Input inputType="input" type="text" name="postal" placeholder="Postal Code"/>
              <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
          </Loader>
        </div>
    );
  }
}

export default withRouter(ContactData);
