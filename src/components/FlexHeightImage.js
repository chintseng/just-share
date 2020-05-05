import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  cover: {
    width: '100%',
    height: 0,
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    objectFit: 'cover',
  },
};

const FlexHeightImage = ({ image, height, objectFit }) => (
  <>
    <div style={{ ...styles.cover, paddingTop: height, objectFit }}>
      <img src={image} style={styles.coverImg} alt="" />
    </div>
  </>
);

FlexHeightImage.defaultProps = {
  height: '100%',
  objectFit: 'cover',
};

FlexHeightImage.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.string,
  objectFit: PropTypes.string,
};

export default FlexHeightImage;
