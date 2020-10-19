import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    userData: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          required: true,
          minLenght: 6,
        },
        valid: false,
        touched: false,
      },
    },
    signingIn: true,
  };
  formHandler = (event) => {
    event.preventDefault();
    const userInputData = {
      email: this.state.userData.email.value,
      password: this.state.userData.password.value,
    };
    console.log(userInputData);
    this.props.onAuth(userInputData, this.state.signingIn);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler(event, inputId) {
    const updatedUserData = {
      ...this.state.userData,
    };
    const updatedFormElement = {
      ...updatedUserData[inputId],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    console.log('updatedFormElement.valid', updatedFormElement.valid);
    updatedUserData[inputId] = updatedFormElement;

    let formIsValid = true;

    for (inputId in updatedUserData) {
      formIsValid = updatedUserData[inputId].valid && formIsValid;
    }
    console.log('formIsValid:', formIsValid);
    this.setState({ userData: updatedUserData, formIsValid: formIsValid });
  };
  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return{
        signingIn: !prevState.signingIn
      }
    })
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.userData) {
      formElementsArray.push({
        id: key,
        config: this.state.userData[key],
      });
    }

    let form = (
      <div>
        <form onSubmit={this.formHandler}>
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
          <Button btnType="Success">{this.state.signingIn ? 'SIGN IN' : 'SIGN UP'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>CHANGE TO {this.state.signingIn ? 'SIGN UP' : 'SIGN IN'}</Button>
      </div>
    );

    return <div className={styles.UserData}>{form}</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userInputData, signingIn) => {
      dispatch(actions.auth(userInputData, signingIn));
    },
  };
};

export default connect(null, mapDispatchToProps)(Auth);
