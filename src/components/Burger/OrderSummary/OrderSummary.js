import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
  console.log('orderSummary props:', props);
  const ingredientsSummary = Object.keys(props.ingredients).map((ingKey, i) => {
    return (
      <li key={ingKey + i}>
        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
        {props.ingredients[ingKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}$</strong>
      </p>
      <p>Continue to Checkout</p>
      <Button btnType={'Danger'} clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType={'Success'} clicked={props.continue}>
        CONTINUE
      </Button>    
      </Aux>
  );
};

export default orderSummary;
