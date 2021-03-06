import moment from 'moment';
import { AUTH_SIGNIN } from '../loadingTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SET_TOKEN, LOG_OUT } from '../actionTypes';
import { signInAPI, refreshTokenAPI } from '../../apis/auth';
import { getCurrentUserAPI } from '../../apis/user';

const setToken = (token, username) => ({
  type: AUTH_SET_TOKEN,
  token,
  username,
});

const storeToken = (token, expirationTime, refreshToken) => async (dispatch) => {
  const user = await getCurrentUserAPI(token);
  dispatch(setToken(token, user.username));
  localStorage.setItem('just_share:auth:token', token);
  localStorage.setItem('just_share:auth:expirationTime', expirationTime.toString());
  localStorage.setItem('just_share:auth:refreshToken', refreshToken);
};

export const signIn = (username, password) => async (dispatch) => {
  dispatch(uiStartLoading(AUTH_SIGNIN));
  try {
    const result = await signInAPI(username, password);
    const {
      access_token: token,
      refresh_token: refreshToken,
    } = result;
    const expirationTime = moment().add(30, 'm').toDate().getTime();
    await dispatch(storeToken(token, expirationTime, refreshToken, username));
    dispatch(uiStopLoading(AUTH_SIGNIN));
  } catch (e) {
    dispatch(uiStopLoading(AUTH_SIGNIN));
    throw String(e.message);
  }
};

const validateToken = () => async (dispatch, getState) => {
  const { token, expiration } = getState().auth;
  if (!token || new Date(expiration) <= new Date()) {
    const tokenFromStorage = localStorage.getItem('just_share:auth:token');
    if (!tokenFromStorage) {
      throw new Error();
    }
    const expirationFromStorage = localStorage.getItem('just_share:auth:expirationTime');
    const parsedExpiration = new Date(parseInt(expirationFromStorage, 10));
    const now = new Date();
    if (parsedExpiration > now) {
      const user = await getCurrentUserAPI(tokenFromStorage);
      dispatch(setToken(tokenFromStorage, user.username));
      return tokenFromStorage;
    }
    throw new Error();
  } else {
    return token;
  }
};

const clearStorage = () => {
  localStorage.removeItem('just_share:auth:token');
  localStorage.removeItem('just_share:auth:expirationTime');
  localStorage.removeItem('just_share:auth:refreshToken');
};

export const getToken = () => async (dispatch) => {
  try {
    const token = await dispatch(validateToken());
    return token;
  } catch (e) {
    const refreshToken = localStorage.getItem('just_share:auth:refreshToken');
    if (!refreshToken) {
      clearStorage();
      return null;
    }
    const {
      access_token: token,
    } = await refreshTokenAPI(refreshToken);
    if (!token) {
      clearStorage();
      return null;
    }
    const expirationTime = moment().add(30, 'm').toDate().getTime();
    await dispatch(storeToken(token, expirationTime, refreshToken));
    return token;
  }
};

export const signOut = () => (dispatch) => {
  clearStorage();
  dispatch({
    type: LOG_OUT,
  });
};
