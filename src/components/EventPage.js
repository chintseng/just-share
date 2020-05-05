import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CenterContainer from './CenterContainer';
import Tag from './Tag';
import EventAlbum from './EventAlbum';
import PageTitle from './PageTitle';

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
            <Button size="sm" variant="primary" style={{ marginRight: 10 }}>
              <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
              </svg>
              {' People'}
            </Button>
            <Button size="sm" variant="outline-primary">Landscape</Button>
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
