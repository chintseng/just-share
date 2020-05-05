import { AUTH_SIGNIN } from '../loadingTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SET_TOKEN, LOG_OUT } from '../actionTypes';
import { signInAPI } from '../../apis/auth';

const setToken = (token) => ({
  type: AUTH_SET_TOKEN,
  token,
});

const storeToken = (token) => (dispatch) => {
  dispatch(setToken(token));
  localStorage.setItem('just-share:auth:token', token);
};

export const signIn = (email, password) => async (dispatch) => {
  dispatch(uiStartLoading(AUTH_SIGNIN));
  try {
    const { token } = await signInAPI(email, password);
    dispatch(storeToken(token));
    // dispatch(loadCurrentUser());
    dispatch(uiStopLoading(AUTH_SIGNIN));
  } catch (e) {
    dispatch(uiStopLoading(AUTH_SIGNIN));
    throw String(e.message);
  }
};

export const getToken = () => async (dispatch, getState) => {
  const tokenFromState = getState().auth.token;
  if (tokenFromState) {
    return tokenFromState;
  }
  const tokenFromStorage = localStorage.getItem('just-share:auth:token');
  if (tokenFromStorage) {
    dispatch(setToken(tokenFromStorage));
    return tokenFromStorage;
  }
  return null;
};

const clearStorage = () => {
  localStorage.removeItem('just-share:auth:token');
};

export const signOut = () => (dispatch) => {
  clearStorage();
  dispatch({
    type: LOG_OUT,
  });
};
