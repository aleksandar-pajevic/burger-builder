import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.IngName]: state.ingredients[action.IngName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.IngName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.IngName]: state.ingredients[action.IngName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.IngName],

      };
      case actionTypes.FETCH_INGREDIENTS_FAIL:
        return{
          ...state,
          error: true,
        }
      case actionTypes.SET_INGREDIENT:
        return{
          ...state,
          ingredients: action.ingredients,
          error: false,
        }
      default:
        return state;
  }
};

export default reducer;