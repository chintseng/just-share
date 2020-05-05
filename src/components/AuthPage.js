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
    email: {
      value: 'sac840711@gmail.com',
    },
    password: {
      value: 'temp1234',
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

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = controls;
    dispatch(signIn(email, password));
  };
  return (
    <div style={styles.container}>
      <Form style={styles.form} onSubmit={handleFormSubmitted}>
        <Form.Text style={styles.header}>Login</Form.Text>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            isInvalid={!controls.email.valid}
            onChange={handleInputChange('email')}
            type="email"
            value={controls.email.value}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isInvalid={!controls.password.valid}
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
