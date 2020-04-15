import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/whitErrorHandler/withErrorHandler';

import * as actionType from '../../store/action';
import { connect } from 'react-redux';



class BurgerBuilder extends Component {

    state = {
        //  totalPrice: 4,
        // purchaseble: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-my-burger-1b126.firebaseio.com/ingredinets.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     }).catch(
        //         error =>  {
        //             this.setState({error : true})
        //         }
        //     );
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


        let burger = this.state.error ? <p>Ingredinats cant be loaded..</p>
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

        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        tprs: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch({
                type: actionType.ADD_INGREDIENT,
                ingredientName: ingName
            }),


        onIngredientRemoved: (ingName) =>
            dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));