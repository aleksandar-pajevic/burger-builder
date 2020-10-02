import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
  this.props.onInitIngredients();
  console.log('props-ings', this.props.ings)
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, val) => {
        return sum + val;
      }, 0);
    return sum <= 0 ;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {

    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryString,
    });
  };

  render() {
  console.log('stateeee', this.props.ings);

    let orderSummary = null;

    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient} 
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            purchase={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          cancel={this.cancelPurchaseHandler}
          continue={this.continuePurchaseHandler}
        />
      );

    }
        if (this.state.loading) {
          orderSummary = <Spinner />;
        }
    return (
      <Aux>
        <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error,
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onAddIngredient : (ingType)=>{dispatch(burgerBuilderActions.addIngredient(ingType))},
    onRemoveIngredient : (ingType)=>{dispatch(burgerBuilderActions.removeIngredient(ingType))},
    onInitIngredients : ()=>{dispatch(burgerBuilderActions.initIngredients())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
