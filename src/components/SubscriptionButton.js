import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const styles = {
  button: {
    borderRadius: 999,
  },
};

const SubscriptionButton = ({ selected, last, children }) => (
  <Button
    size="sm"
    variant={selected ? 'primary' : 'outline-primary'}
    style={{
      ...styles.button,
      marginRight: last ? 0 : 10,
    }}
  >
    {selected && (
      <svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd" />
      </svg>
    )}
    {children}
  </Button>
);

SubscriptionButton.defaultProps = {
  selected: false,
  last: false,
};

SubscriptionButton.propTypes = {
  selected: PropTypes.bool,
  last: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default SubscriptionButton;
