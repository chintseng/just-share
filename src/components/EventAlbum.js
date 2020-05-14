import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FlexHeightImage from './FlexHeightImage';

const EventAlbum = ({ images }) => (
  <Container fluid>
    <Row noGutters style={{ marginLeft: -25, marginRight: -25 }}>
      {images.map((image) => (
        <Col key={image.id} xs={3}>
          <div style={{ padding: 10 }}>
            <FlexHeightImage image={image.url} height="100%" objectFit="contain" />

          </div>
        </Col>
      ))}
    </Row>
  </Container>
);

EventAlbum.defaultProps = {
  images: [],
};

EventAlbum.propTypes = {
  images: PropTypes.array,
};

export default EventAlbum;
