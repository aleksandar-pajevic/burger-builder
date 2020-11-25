import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
    console.log("is auth", this.props.isAuth);
  };

  render() {
    let routes = (
      <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Redirect to='/' />
      </Switch>
    );

    if(this.props.isAuth){
      routes=(
      <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={checkout} />
          <Route path="/logout" component={Logout} />
      </Switch>)
    };


    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
return{
  isAuth: state.auth.token !== null,
}
};

const mapDispatchToProps = (dispatch) => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
