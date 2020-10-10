import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  INIT_INGREDIENTS,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS
} from './actionTypes';

export const addIngredient = (name) => ({type: ADD_INGREDIENT, ingredientName: name});

export const removeIngredient = (name) => ({type: REMOVE_INGREDIENT, ingredientName: name});

export const fetchIngredientsFailed = () => ({type: FETCH_INGREDIENTS_FAILED});

export const setIngredients = (ingredients) => ({type: SET_INGREDIENTS, ingredients});

export const initIngredients = () => ({type: INIT_INGREDIENTS});
