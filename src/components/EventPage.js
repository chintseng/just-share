import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CenterContainer from './CenterContainer';
import Tag from './Tag';
import EventAlbum from './EventAlbum';
import PageTitle from './PageTitle';
import SubscriptionButton from './SubscriptionButton';

const styles = {
  date: {
    color: 'gray',
  },
  group: {
    color: '#7570F5',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const tags = [
  'All',
  'Bestshots',
  'People',
  'Landscape',
];

const EventPage = ({ match, history }) => {
  const [tagSelected, setTagSelected] = useState('All');
  const { eid } = match.params;
  const events = useSelector((state) => state.user.events);
  const event = events.find((e) => e.id.toString() === eid);
  const handleTagClicked = (tag) => () => {
    setTagSelected(tag);
  };

  const handleGroupClicked = () => {
    history.push(`/group/${event.group.id}`);
  };
  return (
    <CenterContainer>
      <>
        <div style={styles.headerSection}>
          <PageTitle>{event.name}</PageTitle>
          <div>
            <SubscriptionButton selected>People</SubscriptionButton>
            <SubscriptionButton last>Landscape</SubscriptionButton>
          </div>
        </div>
        <hr />
        <div style={styles.subSection}>
          <h5 style={styles.date}>{moment(new Date(event.added_date)).format('L')}</h5>
          <Button variant="link" style={styles.group} onClick={handleGroupClicked}>{event.group.name}</Button>
        </div>
        <div>
          {tags.map((tag) => (
            <Tag
              key={tag}
              selected={tagSelected === tag}
              title={tag}
              onSelected={handleTagClicked(tag)}
            />
          ))}
        </div>
        <EventAlbum images={event.pictures} />
      </>
    </CenterContainer>
  );
};

EventPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(EventPage);
