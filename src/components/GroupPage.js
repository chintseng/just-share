import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';
import Avatar from './Avatar';
import GroupPageCard from './GroupPageCard';

const styles = {
  eventsField: {
    marginLeft: -15,
    marginRight: -15,
    marginTop: 20,
  },
};

const GroupPage = ({ match }) => {
  const { gid } = match.params;
  const groups = useSelector((state) => state.user.groups);
  const events = useSelector(
    (state) => state.user.events,
  ).filter((event) => event.group.gid === gid);
  const group = groups[gid];
  return (
    <CenterContainer>
      <>
        <PageTitle>{group.name}</PageTitle>
        <div>
          {group.members.map((member) => <Avatar key={member.uid} image={member.uid} />)}
        </div>
        <Container fluid style={styles.eventsField}>
          <Row>
            {events.map((event) => (
              <Col xs={4} key={event.eid}>
                <GroupPageCard event={event} />
              </Col>
            ))}

          </Row>
        </Container>
      </>
    </CenterContainer>
  );
};

GroupPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(GroupPage);
