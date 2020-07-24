import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      bacon: 1,
      salad: 1,
      cheese: 1,
      meat: 1,
    },
  };

  checkoutCancelHandler = () => {
    console.log('checkout cancel props', this.props);

    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    console.log('checkout props', this.props);

    return (
      <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
    );
  }
}

export default Checkout;
