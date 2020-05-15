import { v4 as uuidv4 } from 'uuid';
import {
  getAllEventsAPI, getAllGroupsAPI, createEventAPI, createGroupAPI, getEventAPI, subscribeClassAPI, uploadImagesAPI, uploadImageUrlsAPI,
} from '../../apis/user';
import { getToken } from './auth';
import { USER_SET_EVENTS, USER_SET_CURRENT_EVENT, USER_ADD_IMAGES } from '../actionTypes';
import {
  USER_GET_EVENTS,
  USER_CREATE_EVENT,
  USER_CREATE_GROUP, USER_GET_SINGLE_EVENT, USER_SUBSCRIBE_CLASS, USER_UPLOAD_IMAGES,
} from '../loadingTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const getAllEvents = (firstLoad = true) => async (dispatch) => {
  if (firstLoad) {
    dispatch(uiStartLoading(USER_GET_EVENTS));
  }
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

export const getEvent = (eid) => async (dispatch) => {
  dispatch(uiStartLoading(USER_GET_SINGLE_EVENT));
  const token = await dispatch(getToken());
  const event = await getEventAPI(token, eid);
  dispatch({
    type: USER_SET_CURRENT_EVENT,
    currentEvent: event,
  });
  dispatch(uiStopLoading(USER_GET_SINGLE_EVENT));
};

export const createEvent = (event) => async (dispatch) => {
  dispatch(uiStartLoading(USER_CREATE_EVENT));
  const token = await dispatch(getToken());
  try {
    const { photos } = event;
    const urls = await uploadImagesAPI(photos);
    const a = await createEventAPI(token, {
      name: event.name,
      gid: event.gid,
      date: event.date,
      urls,
    });
    await dispatch(getAllEvents(false));
    dispatch(uiStopLoading(USER_CREATE_EVENT));
    return a.id;
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
    await dispatch(getAllEvents(false));
    dispatch(uiStopLoading(USER_CREATE_GROUP));
  } catch (e) {
    dispatch(uiStopLoading(USER_CREATE_GROUP));
    throw (e);
  }
};

export const subscribeClass = (eid, className) => async (dispatch) => {
  dispatch(uiStartLoading(USER_SUBSCRIBE_CLASS));
  const token = await dispatch(getToken());
  try {
    await subscribeClassAPI(token, eid, className);
    dispatch(uiStopLoading(USER_SUBSCRIBE_CLASS));
  } catch (e) {
    dispatch(uiStopLoading(USER_SUBSCRIBE_CLASS));
    throw (e);
  }
};

export const uploadImages = (eid, photos) => async (dispatch) => {
  dispatch(uiStartLoading(USER_UPLOAD_IMAGES));
  const token = await dispatch(getToken());
  try {
    dispatch({
      type: USER_ADD_IMAGES,
      pictures: photos.map((photo) => ({
        id: uuidv4(),
        class: null,
        is_bestshot: false,
        url: photo.image,
      })),
    });
    const urls = await uploadImagesAPI(photos);
    await uploadImageUrlsAPI(token, eid, urls);
    dispatch(uiStopLoading(USER_UPLOAD_IMAGES));
  } catch (e) {
    dispatch(uiStopLoading(USER_UPLOAD_IMAGES));
    throw (e);
  }
};
