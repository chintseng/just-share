import { MQTT_SET_CLIENT, MQTT_ADD_MESSAGE } from '../actionTypes';

const initialState = {
  client: null,
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MQTT_SET_CLIENT:
      return {
        ...state,
        client: action.client,
      };
    case MQTT_ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};

export default reducer;
