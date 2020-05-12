import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../secrets';
import { mockEvents, mockGroups } from './mockData';

firebase.initializeApp(FIREBASE_CONFIG);
const storage = firebase.storage();

export const getAllEventsAPI = async (token) => {
  const events = mockEvents;
  return events.map((event) => ({
    ...event,
    group: {
      ...mockGroups[event.gid],
      gid: event.gid,
    },
    gid: undefined,
  }));
};

export const createEventAPI = async (token, event) => {
  const { photos } = event;
  const urls = await Promise.all(photos.map(async (photo) => {
    const ref = storage.ref().child(`photos/${uuidv4()}.jpg`);
    await ref.putString(photo.image, 'data_url');
    const url = await ref.getDownloadURL();
    return {
      url,
    };
  }));
  console.log(urls);
};

export const getGroupsAPI = async (token) => mockGroups;
