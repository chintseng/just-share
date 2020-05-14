import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Web3 from 'web3';
import CenterContainer from './CenterContainer';
import PageTitle from './PageTitle';

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

const MyContract = new web3.eth.Contract([
  {
    inputs: [
      {
        internalType: 'string',
        name: 'str',
        type: 'string',
      },
    ],
    name: 'addMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMessages',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwners',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
], '0x81Ec73a7379a0f01467459f701dDE0c610fFe370');

const styles = {
  form: {
    maxWidth: 500,
  },
  button: {
    color: 'white',
    borderRadius: 999,
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const MessagePage = () => {
  const [controls, setControls] = useState({
    newMessage: {
      value: '',
    },
    anonymous: {
      value: true,
    },
  });

  const [messages, setMessages] = useState([]);

  const fetchMessagesOwners = async () => {
    const [allMessages, allOwners] = await Promise.all([
      MyContract.methods.getMessages().call({ from: web3.eth.defaultAccount }),
      MyContract.methods.getOwners().call({ from: web3.eth.defaultAccount }),
    ]);
    const result = allMessages.map((msg, i) => ({ value: msg, owner: allOwners[i] }));
    setMessages(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accunts = await web3.eth.getAccounts();
      [web3.eth.defaultAccount] = accunts;
      await fetchMessagesOwners();
    };
    fetchData();
  });

  const handleInputChange = (key) => ({ target: { value } }) => {
    setControls({
      ...controls,
      [key]: {
        ...controls[key],
        value,
      },
    });
  };

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    handleInputChange('newMessage')({ target: { value: '' } });
    MyContract.methods
      .addMessage(`${controls.anonymous.value ? '' : 'Andy:'}${controls.newMessage.value}`)
      .send({ from: web3.eth.defaultAccount });
  };

  const handleAnonymousToggle = () => {
    handleInputChange('anonymous')({ target: { value: !controls.anonymous.value } });
  };

  return (
    <CenterContainer>
      <>
        <div style={styles.headerSection}>
          <PageTitle>Message Board</PageTitle>
          <div>
            <Button style={styles.button} variant="primary" onClick={fetchMessagesOwners}>
              Refresh Messages
            </Button>
          </div>
        </div>

        <Form onSubmit={handleFormSubmitted}>
          <Form.Group>
            <Form.Label>Leave a message:</Form.Label>
            <Form.Control value={controls.newMessage.value} as="textarea" rows="3" onChange={handleInputChange('newMessage')} />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Anonymous" checked={controls.anonymous.value} onChange={handleAnonymousToggle} />
          </Form.Group>
          <Button style={styles.button} variant="primary" type="submit">
            Submit
          </Button>
        </Form>


        <div style={{ marginTop: 30 }}>
          {messages.map((msg) => (
            <Card style={{ width: '100%', marginBottom: 20 }} key={uuidv4()}>
              <Card.Header>{msg.owner}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {msg.value}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </>
    </CenterContainer>
  );
};

export default MessagePage;
