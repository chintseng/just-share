import React from 'react';
import Button from 'react-bootstrap/Button';

const styles = {
  container: {
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 10,
  },
};

const Tag = ({ selected, title, onSelected }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <Button
      variant={selected ? 'primary' : 'secondary'}
      style={styles.container}
      onClick={onSelected}
      onMouseDown={handleMouseDown}
    >
      {title}

    </Button>
  );
};

export default Tag;
