import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import ContactData from '../Checkout/ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



class Checkout extends Component {


    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () => {

        const locationPath = this.props.match.path;
        this.props.history.replace(locationPath + '/contact-data')
    }

    render() {

        let summary = <Redirect to='/' />

        if (this.props.ings) {

            const purchasedRedirect = this.props.purchased 
            ?<Redirect to='/' /> : null

            summary = (
                <div>
                    {purchasedRedirect}

                    <CheckoutSummery
                        ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData} />

                </div>
            );
        }

        return summary

        
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);