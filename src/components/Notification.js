import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import bell from '../assets/bell.svg';
import redBell from '../assets/bell_red.svg';
import { addMessage } from '../store/actions/mqtt';

const styles = {
  button: {
    borderRadius: '50%',
    color: 'white',
    padding: 6,
    width: 38,
    height: 38,
  },
};

const Notification = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const client = useSelector((state) => state.mqtt.client);
  const messages = useSelector((state) => state.mqtt.messages);
  const [hasNotification, setHasNotification] = useState();

  useEffect(() => {
    if (client) {
      client.on('message', (topic, message, packet) => {
        dispatch(addMessage(packet));
        setHasNotification(true);
      });
    }
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [client, dispatch]);
  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={(
          <Popover show={show} id="notifications-popover">
            <Popover.Title as="h3">Notifications</Popover.Title>
            <ListGroup>
              {messages.map((message) => (
                <ListGroup.Item
                  key={uuidv4()}
                >
                  {message.payload.toString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Popover>
        )}
      >
        <Button style={styles.button}>
          <img src={hasNotification ? redBell : bell} alt="" width="20" height="20" />
        </Button>
      </OverlayTrigger>
    </>
  );
};
export default Notification;
