import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      </div>
    );
  }
}

export default App;
