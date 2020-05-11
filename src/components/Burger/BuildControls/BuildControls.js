import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (

    <div className={classes.BuildControls}>

        <p>Current price: <strong> {props.price.toFixed(2)} </strong></p>


        {controls.map(cnrl => (
            <BuildControl
                key={cnrl.label}
                label={cnrl.label}
                added={() => props.ingrediantAdded(cnrl.type)}
                removed={() => props.ingrediantRemoved(cnrl.type)}
                disabled={props.disabled[cnrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchaseble}
            onClick={props.ordered}
        >
            {props.isAuth? " ORDER NOW" : 'Signup to order'}
         </button>
    </div>
);

export default buildControls;