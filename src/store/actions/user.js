import {
  getAllEventsAPI, getAllGroupsAPI, createEventAPI, createGroupAPI,
} from '../../apis/user';
import { getToken } from './auth';
import { USER_SET_EVENTS } from '../actionTypes';
import { USER_GET_EVENTS, USER_CREATE_EVENT, USER_CREATE_GROUP } from '../loadingTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const getAllEvents = () => async (dispatch) => {
  dispatch(uiStartLoading(USER_GET_EVENTS));
  const token = await dispatch(getToken());
  const events = await getAllEventsAPI(token);
  const groups = await getAllGroupsAPI(token);
  dispatch({
    type: USER_SET_EVENTS,
    events,
    groups,
  });
  dispatch(uiStopLoading(USER_GET_EVENTS));
};

export const createEvent = (event) => async (dispatch) => {
  dispatch(uiStartLoading(USER_CREATE_EVENT));
  const token = await dispatch(getToken());
  try {
    await createEventAPI(token, event);
    await dispatch(getAllEvents());
    dispatch(uiStopLoading(USER_CREATE_EVENT));
  } catch (e) {
    dispatch(uiStopLoading(USER_CREATE_EVENT));
    throw (e);
  }
};

export const createGroup = (group) => async (dispatch) => {
  dispatch(uiStartLoading(USER_CREATE_GROUP));
  const token = await dispatch(getToken());
  try {
    await createGroupAPI(token, group);
    await dispatch(getAllEvents());
    dispatch(uiStopLoading(USER_CREATE_GROUP));
  } catch (e) {
    dispatch(uiStopLoading(USER_CREATE_GROUP));
    throw (e);
  }
};
