import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS} from "./actionTypes";
import axios from 'axios';

export const authStart = () => ({type: AUTH_START});

export const authSuccess = (idToken, userId) => ({type: AUTH_SUCCESS, idToken, userId});

export const authFail = (error) => ({type: AUTH_FAIL, error});

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

    if (!isSignUp)
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    axios.post(url + process.env.REACT_APP_FIREBASE_API_KEY, authData)
        .then(response => {
          dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
          dispatch(authFail(err));
        });
  }
}
