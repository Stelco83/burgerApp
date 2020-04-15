import React from 'react';
import classes from './ChSum.module.css'; 
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'

const checkoutSummery = (props) => {
            return(
                <div className={classes.CheckoutSummery}>
                    <h1>I hope it tasted well!</h1>

                    <div style={{width:'100%',  margin:'auto'}}>
                        <Burger ingredients={props.ingredients} /> 
                    </div>
                    <Button clicked={props.checkoutCancel} btnType="Danger" >Cancel</Button>
                    <Button clicked={props.checkoutContinue} btnType="Success" >Continue</Button>
                </div>
            )      
        };

export default checkoutSummery;