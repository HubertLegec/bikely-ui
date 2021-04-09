import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from "./components/nav";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
// import Reservations from "./components/reservations";
import HorizontalLinearStepper from "./components/Stepper";

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
          <Route path="/stepper">
        <HorizontalLinearStepper />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
