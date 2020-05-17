import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import palette from '../palette';
import { signIn } from '../store/actions/auth';

const styles = {
  container: {
    marginTop: 56,
    height: 'calc(100vh - 56px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bolder',
    marginBottom: 50,
    color: palette.primary,
    textAlign: 'center',
  },
  form: {
    width: 400,
  },
  button: {
    margin: 'auto',
  },
  buttonDiv: {
    marginTop: 50,
    display: 'flex',
  },
};

const AuthPage = () => {
  const [controls, setControls] = useState({
    username: {
      value: '',
    },
    password: {
      value: '',
    },
  });

  const dispatch = useDispatch();

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
  };

  const handleFormSubmitted = async (event) => {
    event.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = controls;
    dispatch(signIn(username, password));
  };
  return (
    <div style={styles.container}>
      <Form style={styles.form} onSubmit={handleFormSubmitted}>
        <Form.Text style={styles.header}>Login</Form.Text>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInputChange('username')}
            value={controls.username.value}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleInputChange('password')}
            type="password"
            value={controls.password.value}
          />
        </Form.Group>
        <div style={styles.buttonDiv}>
          <Button style={styles.button} variant="primary" type="submit">
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AuthPage;
