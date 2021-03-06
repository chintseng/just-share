import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import FlexHeightImage from './FlexHeightImage';

const styles = {
  container: {
    padding: 20,
    cursor: 'pointer',
    marginBottom: 20,
  },
  body: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  subsubtitle: {
    marginTop: 5,
    fontSize: '0.9rem',
    color: 'gray',
  },
};

const HomePageCard = ({ event, history }) => {
  const handleCardClicked = () => {
    history.push(`/event/${event.id}`);
  };
  return (
    <Card style={styles.container} onClick={handleCardClicked}>
      <FlexHeightImage image={event.pictures[0].url} height="100%" />
      <Card.Body style={styles.body}>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle>{moment(new Date(event.added_date)).format('L')}</Card.Subtitle>
        <Card.Subtitle style={styles.subsubtitle}>{`${event.pictures_size} photos`}</Card.Subtitle>
        <Card.Subtitle style={styles.subsubtitle}>{`With ${event.group.name}`}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

HomePageCard.propTypes = {
  event: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(HomePageCard);
