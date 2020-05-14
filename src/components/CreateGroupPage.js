import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';
import { createGroup } from '../store/actions/user';
import { USER_CREATE_GROUP } from '../store/loadingTypes';

const styles = {
  form: {
    maxWidth: 500,
  },
  button: {
    color: 'white',
    borderRadius: 999,
  },
};

const CreateGroupPage = () => {
  const [controls, setControls] = useState({
    name: {
      value: '',
    },
    members: {
      value: '',
    },
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const handleFormSubmitted = async (e) => {
    e.preventDefault();
    try {
      const group = {
        name: controls.name.value,
        members: controls.members.value,
      };
      await dispatch(createGroup(group));
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
  const isLoading = useSelector((state) => Boolean(state.ui.isLoading[USER_CREATE_GROUP]));
  return (
    <CenterContainer>
      <>
        <PageTitle>Create a group</PageTitle>
        <Form style={styles.form} onSubmit={handleFormSubmitted}>
          <Alert show={err} variant="danger">Something went wrong</Alert>
          <Form.Group>
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              onChange={handleInputChange('name')}
              value={controls.name.value}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Add Member</Form.Label>
            <Form.Control
              onChange={handleInputChange('members')}
              value={controls.members.value}
            />
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

export default CreateGroupPage;
