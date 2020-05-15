import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid'; // For version 5
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import CenterContainer from './CenterContainer';
import Tag from './Tag';
import EventAlbum from './EventAlbum';
import PageTitle from './PageTitle';
import SubscriptionButton from './SubscriptionButton';
import { getEvent, subscribeClass, uploadImages } from '../store/actions/user';

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
  addButton: {
    borderRadius: '50%',
  },
};

const tags = [
  'All',
  'Bestshots',
  'People',
  'Landscape',
];

const EventPage = ({ match, history }) => {
  const { eid } = match.params;
  const event = useSelector((state) => state.user.currentEvent);
  const client = useSelector((state) => state.mqtt.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvent(eid));
  }, [dispatch, eid]);
  const [tagSelected, setTagSelected] = useState('All');
  const handleTagClicked = (tag) => () => {
    setTagSelected(tag);
  };

  const handleSubscribe = (className) => async () => {
    try {
      await dispatch(subscribeClass(eid, className));
      await dispatch(getEvent(eid));
      client.subscribe(`${eid}/${className}`, { qos: 1 });
    } catch (e) {
      console.log(e);
    }
  };
  let filteredPics = [];
  if (event) {
    if (tagSelected === 'All') {
      filteredPics = event.pictures;
    } else if (tagSelected === 'Bestshots') {
      filteredPics = event.pictures.filter((picture) => picture.is_bestshot);
    } else {
      filteredPics = event.pictures.filter((picture) => picture.class === tagSelected.toLowerCase());
    }
  }
  const handleGroupClicked = () => {
    history.push(`/group/${event.group.id}`);
  };
  const handleFileInputChange = async (event) => {
    const readFile = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve({
          image: reader.result,
          name: file.name,
          key: uuidv4(),
        });
      };
    });
    const { files } = event.target;
    const images = await Promise.all(Array.from(files).map((file) => readFile(file)));
    dispatch(uploadImages(eid, images));
    // handleInputChange('photos')({ target: { value: images } });
  };
  const inputRef = useRef();
  return event && (
    <CenterContainer>
      <>
        <div style={styles.headerSection}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 10 }}>
              <PageTitle>{event.name}</PageTitle>
            </div>
            <Button style={styles.addButton} variant="cancel" onClick={() => inputRef.current.click()}>
              <FontAwesomeIcon icon={faImage} size="1x" />
            </Button>
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              accept="image/*"
              multiple
            />
          </div>
          <div>
            <SubscriptionButton
              selected={event.subscription.people}
              onClick={handleSubscribe('people')}
            >
              People
            </SubscriptionButton>
            <SubscriptionButton
              selected={event.subscription.landscape}
              onClick={handleSubscribe('landscape')}
              last
            >
              Landscape

            </SubscriptionButton>
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
        <EventAlbum images={filteredPics} />
      </>
    </CenterContainer>
  );
};

EventPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(EventPage);
