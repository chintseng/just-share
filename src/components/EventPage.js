import React, { useState } from 'react';
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

const EventPage = ({ match, history }) => {
  const [tagSelected, setTagSelected] = useState('All');
  const { eid } = match.params;
  const events = useSelector((state) => state.user.events);
  const event = events.find((e) => e.eid === eid);
  const handleTagClicked = (tag) => () => {
    setTagSelected(tag);
  };
  const images = [];
  for (let i = 0; i < 20; i += 1) {
    images.push({
      url: event.image,
    });
  }

  const handleGroupClicked = () => {
    history.push(`/group/${event.group.gid}`);
  };
  return (
    <CenterContainer>
      <>
        <div style={styles.headerSection}>
          <PageTitle>{event.title}</PageTitle>
          <div>
            <SubscriptionButton selected>People</SubscriptionButton>
            <SubscriptionButton last>Landscape</SubscriptionButton>
          </div>
        </div>
        <hr />
        <div style={styles.subSection}>
          <h5 style={styles.date}>{event.date}</h5>
          <Button variant="link" style={styles.group} onClick={handleGroupClicked}>{event.group.name}</Button>
        </div>
        <div>
          {event.tags.map((tag) => (
            <Tag
              key={tag}
              selected={tagSelected === tag}
              title={tag}
              onSelected={handleTagClicked(tag)}
            />
          ))}
        </div>
        <EventAlbum images={images} />
      </>
    </CenterContainer>
  );
};

EventPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(EventPage);
