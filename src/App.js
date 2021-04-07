import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./components/nav";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import Reservations from "./components/reservations";

const App = () => {

  return (
    <Router>
      <Nav></Nav>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
          <Route path="/reservations">
        <Reservations />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
