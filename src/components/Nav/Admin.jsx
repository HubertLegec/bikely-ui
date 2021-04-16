import React from 'react';
import { Button, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Admin = () => {
  return (
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
      <Link to="/returnBikes">
        <Button>Returns</Button>
      </Link>
      <Link to="/rentBikes">
        <Button>Rents</Button>
      </Link>
    </Toolbar>
  );
};
