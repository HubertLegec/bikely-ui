import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const User = () => {
  return (
    <AppBar position="sticky">
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
    </AppBar>
  );
};
