import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';

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
    member: {
      value: '',
    },
  });
  const handleFormSubmitted = (e) => {
    e.preventDefault();
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
  return (
    <CenterContainer>
      <>
        <PageTitle>Create a group</PageTitle>
        <Form style={styles.form} onSubmit={handleFormSubmitted}>
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
              onChange={handleInputChange('member')}
              value={controls.member.value}
            />
          </Form.Group>
          <div style={styles.buttonDiv}>
            <Button style={styles.button} variant="primary" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
      </>
    </CenterContainer>
  );
};

export default CreateGroupPage;
