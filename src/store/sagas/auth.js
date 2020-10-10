import {delay, put} from 'redux-saga/effects';
import {authFail, authStart, authSuccess, checkAuthTimeout, logout, logoutSucceed} from "../actions/auth";
import axios from "axios";

export function* logoutSaga() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');

  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);

  yield put(logout())
}

export function* authUserSaga(action) {
  yield put(authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  if (!action.isSignUp)
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  try {
    const response = yield axios.post(url + process.env.REACT_APP_FIREBASE_API_KEY, authData);

    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', yield new Date(new Date().getTime() + response.data.expiresIn * 1000));

    yield put(authSuccess(response.data.idToken, response.data.localId));
    yield put(checkAuthTimeout(response.data.expiresIn));
  } catch (err) {
    yield put(authFail(err.response.data.error));
  }
}
