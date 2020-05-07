import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/whitErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false

    }

    componentDidMount() {
            this.props.onInitIngredient();
    }



    updatedPurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true })
       // console.log(this.props.history.push('checkout'));
    }

    purchaseCancelHandler = () => {

        this.setState({ purchasing: false })

    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }

        let orderSummary = null;


        let burger = this.props.error ? <p>Ingredinats cant be loaded..</p>
            : <Spinner />

        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings} />

                <BuildControls
                    ingrediantAdded={this.props.onIngredientAdded}
                    ingrediantRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.tprs}
                    purchaseble={this.updatedPurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
            </Aux>

            orderSummary =
                <OrderSummery
                    ingredients={this.props.ings}
                    price={this.props.tprs}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                />
        }

 
        return (
            <Aux>

                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}


            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        tprs: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngrediant(ingName)),


        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngrediant(ingName)),

        onInitIngredient: () =>
            dispatch(actions.initIngredients()),

        onInitPurchase : () => 
        dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));