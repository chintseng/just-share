import React, { useEffect, useState } from 'react';
import {
  Route, Switch,
  HashRouter as Router,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { getToken } from './store/actions/auth';
import MainApp from './components/MainApp';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken()).then(() => {
      setLoaded(true);
    });
  }, [dispatch]);
  return loaded && (
    <Router>
      <Navbar />
      <Switch>
        <Route
          path="/"
          exact
          render={({ location }) => {
            if (isAuthenticated) {
              return (
                <Redirect
                  to={
                      (location.state && location.state.nextPathName)
                        ? (location.state.nextPathName + location.state.nextSearch) : '/home'
                    }
                />
              );
            }
            return <LandingPage />;
          }}
        />
        <Route
          path="/(home|event|group|mygroups|creategroup|createevent)"
          render={(p) => {
            if (isAuthenticated) {
              return (<MainApp />);
            }
            return (<Redirect to={{ pathname: '/login', state: { nextPathName: p.location.pathname, nextSearch: p.location.search } }} />);
          }}
        />
        <Route
          path="/(login|signout)"
          exact
          render={({ location }) => {
            if (isAuthenticated) {
              return (
                <Redirect
                  to={
                        (location.state && location.state.nextPathName)
                          ? (location.state.nextPathName + location.state.nextSearch) : '/'
                      }
                />
              );
            }
            return <AuthPage />;
          }}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default App;
