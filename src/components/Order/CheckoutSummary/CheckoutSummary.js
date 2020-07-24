import React from 'react';
import styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

const CheckoutSummary = (props) => {
  let makeOrderHandler = () => {
     // alert('Your burger will be delivered in 30 minutes.');
    // const order = {
    //   customer: {
    //     adress: {
    //       country: 'Serbia',
    //       street: 'Djordja Stanojevica',
    //       number: '11v',
    //       zipCode: 11070,
    //     },
    //     email: 'test@test.com',
    //     name: 'Aleksandar Pajevic',
    //   },
    //   deliveryMethod: 'fastest',
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    // };
    // this.setState({
    //   ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    //   },
    //   totalPrice: 4,
    //   purchasable: true,
    //   purchasing: true,
    //   loading: true,
    // });

    // axios
    //   .post('/orders.json', order)
    //   .then((respose) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ loading: false, purchasing: false });
    //   });
  };
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div style={{ width: '100%', alignItems: 'center', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
        <Button btnType="Danger"  clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
    </div>
  );
};

export default CheckoutSummary;
