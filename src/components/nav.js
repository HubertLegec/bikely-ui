import React from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export function Nav() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start"></IconButton>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>

          <Button color="secondary" href="/stepper">stepper</Button>

      </Toolbar>
    </AppBar>
  );
}
