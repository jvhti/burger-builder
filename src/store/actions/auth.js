import {AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH} from "./actionTypes";
import axios from 'axios';

export const authStart = () => ({type: AUTH_START});

export const authSuccess = (idToken, userId) => ({type: AUTH_SUCCESS, idToken, userId});

export const authFail = (error) => ({type: AUTH_FAIL, error});

export const logout = () => ({type: AUTH_LOGOUT});

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
}

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
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          dispatch(authFail(err.response.data.error));
        });
  }
}

export const setAuthRedirectPath = (path) => ({type: SET_AUTH_REDIRECT_PATH, path});
