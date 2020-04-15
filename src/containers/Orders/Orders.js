import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/whitErrorHandler/withErrorHandler';


class Orders extends Component {

    state ={
        orders : [],
        loading : true 
    }

    componentDidMount(){
        axios.get('/orders.json').then(
            res => {
            
                const fetchOrder = [];
               for(let key in res.data){
                fetchOrder.push({...res.data[key],
                    id : key
                })
            this.setState({ loading : false , orders : fetchOrder});            
               }
              // console.log(this.state.orders);
            })
            .catch(
                 err => {
                    this.setState({ loading : false })    
            });
    }

    render() {
        return (
            <div>
               {this.state.orders.map( order => (
                   <Order key={order.id} price={order.price} 
                   ingredients = {order.ingredients}
                   />
               ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);