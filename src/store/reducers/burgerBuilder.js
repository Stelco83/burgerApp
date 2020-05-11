import * as actionType from '../actions/actionTypes';


const INGRIDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error : false,
    buliding : false
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
                totalPrice: state.totalPrice + INGRIDIENT_PRICE[action.ingredientName],
                buliding : true
                
                
            }
         case actionType.REMOVE_INGREDIENT:    
             return{
                 ...state,
                 ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: 
                    state.ingredients[action.ingredientName]- 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICE[action.ingredientName],
                buliding : true
             } 

            case actionType.SET_INGREDIENTS:

             const oldPrice = initialState.totalPrice;
             
                    return{
                        ...state,
                            ingredients : action.ingredients   ,
                            error : false ,
                            totalPrice : oldPrice ,
                            buliding : false                                         
                    }

            case actionType.FETCH_INGREDIENT_FAILED:
                return{
                    ...state,
                    error: true
                }        
                
             
             default:
             
    }

    return state;

};


export default reduser;