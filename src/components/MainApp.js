import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route, Switch,
} from 'react-router-dom';
import HomePage from './HomePage';
import { getAllEvents } from '../store/actions/user';
import { connectMqtt } from '../store/actions/mqtt';
import EventPage from './EventPage';
import { USER_GET_EVENTS } from '../store/loadingTypes';
import GroupPage from './GroupPage';
import MyGroupsPage from './MyGroupsPage';
import CreateGroupPage from './CreateGroupPage';
import CreateEventPage from './CreateEventPage';

const styles = {
  container: {
    marginTop: 56,
  },
};

const MainApp = () => {
  const [loadStarted, setLoadStarted] = useState(false);
  const isLoading = useSelector((state) => Boolean(state.ui.isLoading[USER_GET_EVENTS]));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(connectMqtt());
    setLoadStarted(true);
  }, [dispatch]);
  return (!isLoading && loadStarted) && (
    <div style={styles.container}>
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/event/:eid" exact component={EventPage} />
        <Route path="/group/:gid" exact component={GroupPage} />
        <Route path="/mygroups" exact component={MyGroupsPage} />
        <Route path="/creategroup" exact component={CreateGroupPage} />
        <Route path="/createevent" exact component={CreateEventPage} />
      </Switch>
    </div>
  );
};

export default MainApp;
