import { USER_SET_EVENTS, USER_SET_CURRENT_EVENT, USER_ADD_IMAGES } from '../actionTypes';

const initialState = {
  events: [],
  currentEvent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_EVENTS:
      return {
        ...state,
        events: action.events,
        groups: action.groups,
      };
    case USER_SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.currentEvent,
      };
    case USER_ADD_IMAGES:
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          pictures: [
            ...action.pictures,
            ...state.currentEvent.pictures,
          ],
        },
      };
    default:
      return state;
  }
};

export default reducer;
