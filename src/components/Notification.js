import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const client = useSelector((state) => state.mqtt.client);
  const messages = useSelector((state) => state.mqtt.messages);
  const [hasNotification, setHasNotification] = useState();

  useEffect(() => {
    // client.subscribe('people', { qos: 1 });
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
          <Popover>
            <Popover.Title as="h3">Notifications</Popover.Title>
            <ListGroup>
              {messages.map((message) => (
                <ListGroup.Item
                  key={message.messageId}
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
