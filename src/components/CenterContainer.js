import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    maxWidth: 1200,
    margin: 'auto',
    backgroundColor: 'white',
    minHeight: 'calc(100vh - 56px)',
    padding: '30px 100px',
  },
};

const CenterContainer = ({ children }) => (
  <div style={styles.container}>
    {children}
  </div>
);

CenterContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CenterContainer;
