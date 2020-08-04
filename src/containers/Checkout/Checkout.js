import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice : 0,
  };

  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    console.log('query', query);
    for(let param of query.entries()){
      if(param[0] === 'price'){
        price = param[1];
        console.log("price from query", price);
      }else{
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice : price })
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
      <div>
      <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
      <Route 
      path={this.props.match.path + '/contact-data'}
      render={(props)=>(
        <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>
        )}
      />
      </div>
    );
  }
}

export default Checkout;
