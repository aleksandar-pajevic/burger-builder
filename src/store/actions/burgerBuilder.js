import * as actionTypes from './actionTypes';

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