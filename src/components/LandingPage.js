import React from 'react';
import image from '../assets/landingpage.jpg';

const styles = {
  container: {
    backgroundImage: `url("${image}")`,
    height: 'calc(100vh - 56px)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: 56,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 40,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bolder',
    color: '#F6F7D7',
  },
};

const LandingPage = () => (
  <div style={styles.container}>
    <h5 style={styles.title}>Just share your photos with friends in an easier way.</h5>
  </div>
);

export default LandingPage;
