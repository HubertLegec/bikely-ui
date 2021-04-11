import React from 'react';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
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
        <Link to="/reservations">
          <Button>Reservations</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
