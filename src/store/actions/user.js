import { getAllEventsAPI, getGroupsAPI, createEventAPI } from '../../apis/user';
import { getToken } from './auth';
import { USER_SET_EVENTS } from '../actionTypes';
import { USER_GET_EVENTS, USER_CREATE_EVENT } from '../loadingTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const getAllEvents = () => async (dispatch) => {
  dispatch(uiStartLoading(USER_GET_EVENTS));
  const token = await dispatch(getToken());
  const events = await getAllEventsAPI(token);
  const groups = await getGroupsAPI(token);
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
  console.log(event);
  await createEventAPI(token, event);
  dispatch(uiStopLoading(USER_CREATE_EVENT));
};
