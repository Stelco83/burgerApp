import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngrediant = (ingName) =>{

   return {
       type : actionTypes.ADD_INGREDIENT,
       ingredientName : ingName
   }
}

export const removeIngrediant = (ingName) =>{

   return {
       type : actionTypes.REMOVE_INGREDIENT,
       ingredientName : ingName
   }
}

export const setIngrediant = (ingredients) =>{

   return {
       type : actionTypes.SET_INGREDIENTS,
       ingredients : ingredients 
   }
}

export const fetchIngredientFailed = () =>{

    return {
        type : actionTypes.FETCH_INGREDIENT_FAILED      
    }
 }


export const initIngredients = () => {

    return  dispatch =>     {
        axios.get('https://react-my-burger-1b126.firebaseio.com/ingredinets.json')
        .then(response => {
            dispatch(setIngrediant(response.data))
           
            
        }).catch(
            error =>{
                dispatch(fetchIngredientFailed())
            }
                
            
        );
    };
}


