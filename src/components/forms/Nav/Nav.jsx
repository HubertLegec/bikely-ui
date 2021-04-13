import React from 'react';
import { AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" />
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
        <Button color="secondary" href="/reservations">
          Create Reservation
        </Button>
        <Button color="secondary" href="/rentBikes">
          Rent Bikes
        </Button>
      </Toolbar>
    </AppBar>
  );
};
