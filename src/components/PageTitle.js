import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bolder',
  },
};

const PageTitle = ({ children }) => (
  <h5 style={styles.title}>
    {children}
  </h5>
);

PageTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PageTitle;
