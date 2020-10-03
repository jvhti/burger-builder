import {ADD_INGREDIENT, REMOVE_INGREDIENT} from './actionTypes';

export const addIngredient = (name) => ({type: ADD_INGREDIENT, ingredientName: name});
export const removeIngredient = (name) => ({type: REMOVE_INGREDIENT, ingredientName: name});
