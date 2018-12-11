// libraries
import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <div className="jumbotron text-center">
        <h3>
          This page is full of secrets{' '}
          <span style={{ fontSize: '32px' }}>{String.fromCharCode(9731)}</span>
        </h3>
      </div>
    );
  }

  // redirect на др страницу
  return <Redirect to="/login" />;
};

export default SecretPage;
