import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const options = {
  protocol: 'mqtts',
  // clientId uniquely identifies client
  // choose any string you wish
  clientId: 'b0908853',
};

const Notification = () => {
  const [note, setNote] = useState();
  useEffect(() => {
    const client = mqtt.connect('mqtt://test.mosquitto.org:8081', options);
    client.subscribe('people');
    client.on('message', (topic, message) => {
      const newNote = message.toString();
      setNote(newNote);
      console.log(topic, newNote);
    });
    return () => {
      client.end();
      client.unsubscribe();
    };
  });
  return (
    <>

    </>
  );
};

export default Notification;
