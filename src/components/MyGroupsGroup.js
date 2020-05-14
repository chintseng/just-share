import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';

const styles = {
  container: {
    borderRadius: 25,
    padding: 20,
    backgroundColor: '#EDEDED',
    marginTop: 30,
    boxShadow: '2px 6px #d4d4d4',
  },
  addButton: {
    borderRadius: '50%',
    color: 'white',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bolder',
    color: 'black',
  },
};


const MyGroupsGroup = ({ group, history }) => {
  const handleGroupClicked = () => {
    history.push(`/group/${group.id}`);
  };
  return (
    <div style={styles.container}>
      <div style={{ marginBottom: 20 }}>
        <Button variant="link" style={styles.title} onClick={handleGroupClicked}>{group.name}</Button>
        {/* <Button style={styles.addButton}>
        <FontAwesomeIcon icon={faPlus} size="xs" />
      </Button> */}
      </div>

      <div>
        {group.users.map((user) => <Avatar radius={80} key={user.id} image={user.id.toString()} />)}
      </div>
    </div>
  );
};

MyGroupsGroup.propTypes = {
  group: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(MyGroupsGroup);
