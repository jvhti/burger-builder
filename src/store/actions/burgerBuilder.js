import {ADD_INGREDIENT, FETCH_INGREDIENTS_FAILED, REMOVE_INGREDIENT, SET_INGREDIENTS} from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (name) => ({type: ADD_INGREDIENT, ingredientName: name});
export const removeIngredient = (name) => ({type: REMOVE_INGREDIENT, ingredientName: name});

export const fetchIngredientsFailed = () => ({type: FETCH_INGREDIENTS_FAILED});

export const setIngredients = (ingredients) => ({type: SET_INGREDIENTS, ingredients});

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
        .then(response => {
          dispatch(setIngredients(response.data));
        })
        .catch(() => {
          dispatch(fetchIngredientsFailed());
        });
  };
};
