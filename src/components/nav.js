import React from "react";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
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
      </Toolbar>
    </AppBar>
  );
}
