import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import styles from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spiner from '../../../components/UI/Spiner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as burgerOrderActions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    // console.log(this.props.ingredients);
    // console.log('contacData price', this.props.price);
    // alert('Your burger will be delivered in 30 minutes.');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    console.log('xxxxxORDERxxxxx', order);

    this.props.onPurchaseBurger(order, this.props.token);
  };
  
  inputChangedHandler(event, inputId) {
    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
      touched: true,
    });
    
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement
    });
   
    console.log('updatedFormElement', updatedFormElement);
    console.log('updatedOrderForm', updatedOrderForm);


    let formIsValid = true;

    for (inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    console.log('formIsValid:', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((el) => {
          return (
            <Input
              key={el.id}
              name={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={(event) => {
                this.inputChangedHandler(event, el.id);
              }}
              invalid={!el.config.valid}
              shouldValidate={el.config.validation}
              touched={el.config.touched}
            />
          );
        })}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spiner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, token) => {
      dispatch(burgerOrderActions.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, Axios));
