import { USER_SET_EVENTS, USER_SET_CURRENT_EVENT } from '../actionTypes';

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
    default:
      return state;
  }
};

export default reducer;
