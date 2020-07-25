import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
  };

  componentDidMount(){
    let ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    console.log('query', query);
    for(let param of query.entries()){
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients: ingredients})
  };

  checkoutCancelHandler = () => {
    // console.log('checkout cancel props', this.props);

    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    // console.log('checkout props', this.props);

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
