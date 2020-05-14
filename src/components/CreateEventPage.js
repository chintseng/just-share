import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For version 5
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';
import FlexHeightImage from './FlexHeightImage';
import { createEvent } from '../store/actions/user';
import { USER_CREATE_EVENT } from '../store/loadingTypes';

const styles = {
  form: {
    maxWidth: 500,
  },
  button: {
    color: 'white',
    borderRadius: 999,
  },
  buttonDiv: {
    marginTop: 50,
  },
};

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const [controls, setControls] = useState({
    name: {
      value: '',
    },
    date: {
      value: '',
    },
    group: {
      value: '',
    },
    photos: {
      value: [],
    },
  });
  const handleFormSubmitted = async (e) => {
    e.preventDefault();
    try {
      const event = {
        photos: controls.photos.value,
        name: controls.name.value,
        date: controls.date.value,
        gid: controls.group.value,
      };
      await dispatch(createEvent(event));
    } catch (error) {
      setErr(true);
    }
  };
  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
  };

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

  const handleFileInputChange = async (event) => {
    const { files } = event.target;
    const images = await Promise.all(Array.from(files).map((file) => readFile(file)));
    handleInputChange('photos')({ target: { value: images } });
  };

  const inputRef = useRef();
  const isLoading = useSelector((state) => Boolean(state.ui.isLoading[USER_CREATE_EVENT]));

  return (
    <CenterContainer>
      <>
        <PageTitle>Create an event</PageTitle>
        <Form style={styles.form} onSubmit={handleFormSubmitted}>
          <Alert show={err} variant="danger">Something went wrong</Alert>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              onChange={handleInputChange('name')}
              value={controls.name.value}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              onChange={handleInputChange('date')}
              value={controls.date.value}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Group</Form.Label>
            <Form.Control
              onChange={handleInputChange('group')}
              value={controls.group.value}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload photos</Form.Label>
            <div>
              <Row style={{ marginBottom: 20 }}>
                {controls.photos.value.map((photo) => (
                  <Col xs={4} key={photo.key} style={{ marginBottom: 20 }}>
                    <FlexHeightImage image={photo.image} />
                  </Col>
                ))}
              </Row>
              <Button
                style={{ ...styles.button, color: 'black' }}
                variant="gray"
                size="sm"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => inputRef.current.click()}
              >
                Select from files
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
          </Form.Group>
          <div style={styles.buttonDiv}>
            <Button
              style={styles.button}
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '...Creating' : 'Create'}
            </Button>
          </div>
        </Form>
      </>
    </CenterContainer>

  );
};

export default CreateEventPage;
