import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  LandingPage,
  UnexpectedError,
  Forbidden,
  About,
  Logout,
} from "../pages";
import { Secured, Admin } from "./index";
import ScrollToTop from "./ScrollTopTop";
import history from "../utils/history";

const Routes = () => (
  <BrowserRouter getUserConfirmation={history.getUserConfirmation}>
    <ScrollToTop />
    <Switch>
      <Route
        exact
        path="/"
        render={({ location }) => <LandingPage location={location} />}
      />
      <Route exact path="/logout" render={() => <Logout />} />
      <Route path="/admin" render={() => <Admin />} />
      <Route path="/about" render={() => <About type="about" />} />
      <Route path="/help" render={() => <About type="help" />} />
      <Route path="/terms" render={() => <About type="terms" />} />
      <Route path="/privacy" render={() => <About type="privacy" />} />
      <Route path="/error" render={() => <UnexpectedError />} />
      <Route path="/forbidden" render={() => <Forbidden />} />
      <Route
        path="/"
        render={({ location }) => <Secured location={location} />}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
