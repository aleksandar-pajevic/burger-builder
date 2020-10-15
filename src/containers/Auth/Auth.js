import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';

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
          minLenght: 6
        },
        valid: false,
        touched: false,
      },
    }
  }
  render (){
    const formElementsArray = [];
    for (let key in this.state.userData) {
      formElementsArray.push({
        id: key,
        config: this.state.userData[key],
      });
    }
  
  
  let form = (
    <form >
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
      <Button btnType="Success">
        SIGN IN
      </Button>
    </form>
  );

  return ( 
<div className={styles.UserData}>
  {form}
</div>
   
  )
  }
}
export default Auth;