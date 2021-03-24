import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
export function Nav() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start"></IconButton>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          <Link to="/register">Register</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
