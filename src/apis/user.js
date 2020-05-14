import { v4 as uuidv4 } from 'uuid';
import API from '@hellosirandy/rest-api-wrapper';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../secrets';

firebase.initializeApp(FIREBASE_CONFIG);
const storage = firebase.storage();

const baseURL = process.env.REACT_APP_ENDPOINT;
const api = new API(baseURL);

export const getAllEventsAPI = (token) => {
  // const events = mockEvents;
  // return events.map((event) => ({
  //   ...event,
  //   group: {
  //     ...mockGroups[event.gid],
  //     gid: event.gid,
  //   },
  //   gid: undefined,
  // }));
  const options = {
    endpoint: '/events',
    token: `Bearer ${token}`,
  };
  return api.get(options);
};

export const createEventAPI = async (token, event) => {
  const {
    photos, name, gid, date,
  } = event;
  if (name.trim() === '' || gid.trim() === '' || !moment(date).isValid()) {
    throw Error({
      message: 'Something went wrong',
    });
  }

  const urls = await Promise.all(photos.map(async (photo) => {
    const ref = storage.ref().child(`photos/${uuidv4()}.jpg`);
    await ref.putString(photo.image, 'data_url');
    const url = await ref.getDownloadURL();
    return url;
  }));
  const body = {
    name,
    group: {
      id: Number(gid),
    },
    added_date: moment(date).format('L'),
    pictures: urls,
  };
  const options = {
    endpoint: '/events',
    token: `Bearer ${token}`,
    body,
  };
  return api.post(options);
};

export const createGroupAPI = async (token, group) => {
  const options = {
    endpoint: '/groups',
    token: `Bearer ${token}`,
    body: group,
  };
  return api.post(options);
};

export const getAllGroupsAPI = async (token) => {
  // return mockGroups
  const options = {
    endpoint: '/groups',
    token: `Bearer ${token}`,
  };
  return api.get(options);
};
