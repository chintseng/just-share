import mqtt from 'mqtt';
import { MQTT_CREDENTIALS } from '../../secrets';
import { MQTT_SET_CLIENT, MQTT_ADD_MESSAGE } from '../actionTypes';

export const connectMqtt = () => (dispatch) => {
  const options = {
    clientId: '1',
    username: MQTT_CREDENTIALS.username,
    password: MQTT_CREDENTIALS.password,
    clean: false,
  };
  const client = mqtt.connect('wss://b-4fae0603-d95e-4af7-af1d-62e6a524c383-1.mq.us-east-2.amazonaws.com:61619', options);
  dispatch({
    type: MQTT_SET_CLIENT,
    client,
  });
};

export const addMessage = (message) => (dispatch) => {
  dispatch({
    type: MQTT_ADD_MESSAGE,
    message,
  });
};
