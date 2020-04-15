import React from 'react';

import Aux from '../../../hoc/Auxx/Auxx'
import Button from '../../UI/Button/Button'


const orderSummery = (props) => {
    const totPrice =  props.price;

    const ingredientSummery = Object.keys(props.ingredients)
    .map(igKey =>{
    return (
    <li key={igKey}>
        <span style = {{textTransform:'capitalize'}} > {igKey}</span>:
         {props.ingredients[igKey]}
    </li>
   
    )}) ;

            return(
                 <Aux>
                     <h3>Your order</h3>
                     <p>Delicious burger with following ingredients: </p>
                     <ul>
                     {ingredientSummery}
                     </ul>
                     <p>Continue to check out?</p>
                        <p><strong>Total price:{totPrice.toFixed(2)}</strong></p>
                     <Button 
                     btnType='Danger'
                     clicked={props.purchaseCancelHandler}

                     >
                         Cancel
                    </Button>
                     <Button
                      btnType='Success'
                      clicked={props.purchaseContinueHandler}  
                    > 
                        Continue
                     </Button>
                </Aux>
                    
                    )
            };

export default orderSummery;
