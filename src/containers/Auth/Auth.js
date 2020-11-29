import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spiner/Spinner';

import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';

class Auth extends Component {
  state = {
    userData: {
      email: {
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        elementType: 'input',
        value: '',
        valid: false,
        touched: false,
      },
      password: {
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        validation: {
          required: true,
          minLength: 6,
        },
        elementType: 'input',
        value: '',
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    signingIn: true,
  };
  componentDidMount (){
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
    this.props.onSetAuthRedirectPath()
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }
    return isValid;
  }

  inputChangedHandler(event, inputId) {
    
    const updatedFormElement = updateObject(this.state.userData[inputId], {
      value : event.target.value,
      valid : this.checkValidity(
        event.target.value,
        this.state.userData[inputId].validation
      ),
      touched: true,
    });
    console.log('Updated form element', updatedFormElement);
    const updatedUserData = updateObject(this.state.userData, {
      [inputId] : updatedFormElement
    });
    console.log('Updated user data', updatedUserData);
    let formIsValid = true;

    for (inputId in updatedUserData) {
      formIsValid = updatedUserData[inputId].valid && formIsValid;
    }
    console.log('formIsValid:', formIsValid);
    this.setState({ userData: updatedUserData, formIsValid: formIsValid });
  }
  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        signingIn: !prevState.signingIn,
      };
    });
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
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            {this.state.signingIn ? 'SIGN IN' : 'SIGN UP'}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          CHANGE TO {this.state.signingIn ? 'SIGN UP' : 'SIGN IN'}
        </Button>
      </div>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let error = <p></p>;
    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }
    let redirect = null;
    if(this.props.isAuth){
      redirect = <Redirect to={this.props.authRedirectPath} />
    };

    return (
      <div className={styles.UserData}>
        {redirect}
        {error}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (userInputData, signingIn) => {
      dispatch(actions.auth(userInputData, signingIn));
    },
    onSetAuthRedirectPath: () => {dispatch(actions.setAuthRedirectPath('/'));
  },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
