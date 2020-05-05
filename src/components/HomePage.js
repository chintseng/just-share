import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomePageCard from './HomePageCard';

const styles = {
  container: {
    padding: 50,
  },
};

const HomePage = () => {
  const events = useSelector((state) => state.user.events);
  return (
    <div style={styles.container}>
      <Container fluid>
        <Row>
          {events.map((event) => (
            <Col xs={3} key={event.eid}>
              <HomePageCard event={event} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
