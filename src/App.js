import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBulider';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';




class App extends Component {



  render() {
    return (

      <div>
        <Switch>

          <Layout>

            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" component={Orders} />

            <Route path="/checkout" component={Checkout} />


          </Layout>

        </Switch>
      </div>


    );
  }



}

export default App;