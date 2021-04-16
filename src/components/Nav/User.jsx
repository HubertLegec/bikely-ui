import React from 'react';
import { Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const User = () => {
  return (
    <Toolbar>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/logout">
        <Button>Logout</Button>
      </Link>
      <Link to="/user/reservations">
        <Button>My reservations</Button>
      </Link>
      <Link to="/reservations">
        <Button>Create Reservation</Button>
      </Link>
    </Toolbar>
  );
};
