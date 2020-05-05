import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
    display: 'inline-block',
    marginRight: 10,
  },
};

const MyGroupsGroup = ({ group }) => (
  <div style={styles.container}>
    <div style={{ marginBottom: 20 }}>
      <h5 style={styles.title}>{group.name}</h5>
      {/* <Button style={styles.addButton}>
        <FontAwesomeIcon icon={faPlus} size="xs" />
      </Button> */}
    </div>

    <div>
      {group.members.map((member) => <Avatar radius={80} key={member.uid} image={member.uid} />)}
    </div>
  </div>
);

MyGroupsGroup.propTypes = {
  group: PropTypes.object.isRequired,
};

export default MyGroupsGroup;
