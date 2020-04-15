import * as actionType from './action';


const INGRIDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const initialState = {
    ingredients: {
        salad : 0,
        bacon : 0,
        cheese : 0,
        meat : 0
    },
    totalPrice: 4
};


const reduser = (state = initialState, action) =>{

    switch(action.type){
        case actionType.ADD_INGREDIENT:
          
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: 
                    state.ingredients[action.ingredientName]+ 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICE[action.ingredientName]
                
                
            }
         case actionType.REMOVE_INGREDIENT:    
             return{
                 ...state,
                 ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: 
                    state.ingredients[action.ingredientName]- 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICE[action.ingredientName]
             } 

             
             default:
             
    }

    return state;

};


export default reduser;