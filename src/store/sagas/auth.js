import {call, delay, put} from 'redux-saga/effects';
import {authFail, authStart, authSuccess, checkAuthTimeout, logout, logoutSucceed} from "../actions/auth";
import axios from "axios";

export function* logoutSaga() {
  call([localStorage, 'removeItem'], 'token'); //You should use call when you want to test sagas, its easy to mock
  call([localStorage, 'removeItem'], 'expirationDate');

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

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');

  if (!token) return yield put(logout());

  const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

  if (expirationDate > (yield new Date())) {
    try {
      const response = yield axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + process.env.REACT_APP_FIREBASE_API_KEY, {idToken: token});
      yield put(authSuccess(token, response.data.users[0].localId));
      yield put(checkAuthTimeout((expirationDate.getTime() - (yield new Date()).getTime()) / 1000));
    } catch {
      yield put(logout());
    }
  } else {
    yield put(logout());
  }
}
