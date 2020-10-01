import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return{
    type: actionTypes.ADD_INGREDIENT,
    IngName: name
  }
};

export const removeIngredient = (name) => {
  return{
    type: actionTypes.REMOVE_INGREDIENT,
    IngName: name
  }
};

export const setIngredients = (ingredients) =>{
  return{
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  }
};

export const fetchIngredientsFaild = () => {
  return{
    type: actionTypes.FETCH_INGREDIENTS_FAIL
  }
}

export const initIngredients = () =>{
  return dispatch => {
    axios
    .get('https://burger-builder-82172.firebaseio.com/ingredients.json')
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch((err) => {
      dispatch(fetchIngredientsFaild());
    });
  }
};