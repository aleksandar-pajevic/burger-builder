import React, { Component } from 'react';
import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spiner from '../../../components/UI/Spiner/Spinner';
import axios from '../../../axios-orders';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    console.log('contacData price',this.props.price);
    // alert('Your burger will be delivered in 30 minutes.');
    const order = {
      customer: {
        adress: {
          country: 'Serbia',
          street: 'Djordja Stanojevica',
          number: '11v',
          zipCode: 11070,
        },
        email: 'test@test.com',
        name: 'Aleksandar Pajevic',
      },
      deliveryMethod: 'fastest',
      ingredients: this.props.ingredients,
      price: this.props.price,
    };
    this.setState({
    //   ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    //   },
    //   totalPrice: 4,
    //   purchasable: true,
    //   purchasing: true,
      loading: true,
    });

    axios
      .post('/orders.json', order)
      .then((respose) => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (<form>
      <input
        className={styles.Input}
        type="text"
        name="name"
        placeholder="Your Name"
      />
      <input
        className={styles.Input}
        type="email"
        name="email"
        placeholder="Your Mail"
      />
      <input
        className={styles.Input}
        ype="text"
        name="street"
        placeholder="Street"
      />
      <input
        className={styles.Input}
        type="text"
        name="postal"
        placeholder="Your Name"
      />
      <Button btnType="Success" clicked={this.orderHandler}>
        ORDER
      </Button>
      </form>)
    if(this.state.loading){
      form = (<Spiner />)
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
