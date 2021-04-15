import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Link to="/logout">
          <Button>Logout</Button>
        </Link>
        <Link to="/rental_point/reservations">
          <Button>Reservations</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
