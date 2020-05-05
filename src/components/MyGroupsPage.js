import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';
import MyGroupsGroup from './MyGroupsGroup';

const styles = {
  button: {
    color: 'white',
    borderRadius: 999,
  },
};

const MyGroupsPage = ({ history }) => {
  const groups = useSelector((state) => state.user.groups);
  const handleAddGroupClicked = () => history.push('/creategroup');
  return (
    <CenterContainer>
      <>
        <PageTitle>My Groups</PageTitle>
        <Button style={styles.button} onClick={handleAddGroupClicked}>+ Add a group</Button>
        <div>
          {Object.keys(groups).map((gid) => <MyGroupsGroup key={gid} group={groups[gid]} />)}
        </div>
      </>
    </CenterContainer>
  );
};

MyGroupsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(MyGroupsPage);
