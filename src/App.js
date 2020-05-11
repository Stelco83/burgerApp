import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBulider';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import lazyLoader from './hoc/LazyLoader/asyncComponent';


const lazyLoaderCheckout = lazyLoader(() => {
  return import('./containers/Checkout/Checkout');
});

const lazyLoaderOrders = lazyLoader(() => {
  return import('./containers/Orders/Orders');
});

const lazyLoaderAuth = lazyLoader(() => {
  return import('./containers/Auth/Auth');
});


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={lazyLoaderAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>

    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={lazyLoaderCheckout} />
          <Route path="/orders" component={lazyLoaderOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={lazyLoaderAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )

    }

    return (

      <div>


        <div>
          <Layout>
            {routes}
          </Layout>
        </div>

      </div>


    );
  }



}


const mapDisptchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDisptchToProps)(App));
