import { mockEvents, mockGroups } from './mockData';

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

export const createEventAPI = async (token) => {

};

export const getGroupsAPI = async (token) => mockGroups;
