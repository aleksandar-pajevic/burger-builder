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
import actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null,
  };
  componentDidMount() {
    // axios
    //   .get('https://burger-builder-82172.firebaseio.com/ingredients.json')
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: err });
    //   });

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

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
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
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push('price=' + this.state.totalPrice.toFixed(2));
    // const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryString,
    });
  };

  render() {
  console.log('stateeee', this.state);

    let orderSummary = null;

    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
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

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onAddIngredient : (ingType)=>{dispatch({type:actionTypes.ADD_INGREDIENT, IngName: ingType })},
    onRemoveIngredient : (ingType)=>{dispatch({type:actionTypes.REMOVE_INGREDIENT, IngName: ingType })},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
