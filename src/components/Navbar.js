import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { signOut } from '../store/actions/auth';
import Notification from './Notification';
// import Notification from './Notification';

const styles = {
  container: {
    color: 'white',
  },
  brand: {
    fontFamily: "'Rubik', sans-serif",
    color: 'white',
    cursor: 'pointer',
  },
};

const NavBar = ({ history }) => {
  const dispatch = useDispatch();
  const handleLoginClicked = () => {
    history.push('login');
  };
  const handleBrandClicked = () => history.push('/home');
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const handleMyGroupsClicked = () => history.push('/mygroups');
  const handleAddEventClicked = () => history.push('/createevent');
  const handleLogOutClicked = () => dispatch(signOut());
  return (
    <Navbar bg="primary" style={styles.container} fixed="top">
      <>
        <Navbar.Brand style={styles.brand} onClick={handleBrandClicked}>
          JustShare
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated ? (
            <>
              <Notification />
              <Button style={{ color: 'white' }} onClick={handleMyGroupsClicked}>My Groups</Button>
              <Button style={{ color: 'white' }} onClick={handleAddEventClicked}>Add Event</Button>
              <Button style={{ color: 'white' }} onClick={handleLogOutClicked}>Logout</Button>
            </>
            // <Button onClick={handleLogOutClicked} style={{ color: 'white' }}>Logout</Button>
          )
            : <Button onClick={handleLoginClicked} style={{ color: 'white' }}>Login</Button>}
        </Navbar.Collapse>
      </>
    </Navbar>
  );
};

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
