import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
  building: false,
};

const addIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.IngName]: state.ingredients[action.IngName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.IngName],
    building: true,
  });
};
const removeIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      ...state.ingredients,
      [action.IngName]: state.ingredients[action.IngName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.IngName],
    building: true,
  });
};
const fetchIngredientsFail = (state, action) => {
  return updateObject(state, { error: true });
};
const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);
    case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
    default:
      return state;
  }
};

export default reducer;
