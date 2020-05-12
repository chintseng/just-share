import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import auth from './reducers/auth';
import user from './reducers/user';
import mqtt from './reducers/mqtt';

const rootReducer = combineReducers({
  ui,
  auth,
  user,
  mqtt,
});

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
