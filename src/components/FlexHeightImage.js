import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  cover: {
    width: '100%',
    height: 0,
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
    <div style={{
      ...styles.cover,
      paddingTop: height,
      backgroundImage: `url(${image})`,
      backgroundSize: objectFit,
    }}
    >
      {/* <img src={image} style={{ ...styles.coverImg, objectFit }} alt="" /> */}
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
