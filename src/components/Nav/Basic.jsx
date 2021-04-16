import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './Nav.style';

export const Basic = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/register">
        <Button> Register</Button>
      </Link>
    </Toolbar>
  );
};
