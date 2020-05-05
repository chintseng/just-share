import { USER_SET_EVENTS } from '../actionTypes';

const initialState = {
  events: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_EVENTS:
      return {
        ...state,
        events: action.events,
        groups: action.groups,
      };
    default:
      return state;
  }
};

export default reducer;
