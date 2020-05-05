import React from 'react';
import PropTypes from 'prop-types';

const COLORS = [
  'CadetBlue',
  'CornflowerBlue',
  'DarkKhaki',
  'Gainsboro',
  'GoldenRod',
  'HotPink',
  'LightCoral',
];

const styles = {
  container: {
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: 10,
  },
};

const Avatar = ({ image, radius }) => (
  <div style={{
    ...styles.container,
    backgroundColor: COLORS[Number(image) % COLORS.length],
    width: radius,
    height: radius,
  }}
  />
);

Avatar.defaultProps = {
  radius: 40,
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  radius: PropTypes.number,
};

export default Avatar;
