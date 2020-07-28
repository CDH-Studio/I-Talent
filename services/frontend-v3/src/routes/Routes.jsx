import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {
  NotFound,
  LandingPage,
  UnexpectedError,
  Forbidden,
  About,
} from "../pages";
import { Secured, Admin } from "./index";
import historySingleton from "../utils/history";

const Routes = () => {
  return (
    <Router history={historySingleton}>
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route
          path="/secured"
          render={({ location }) => <Secured location={location} />}
        />
        <Route path="/about" render={() => <About type="about" />} />
        <Route path="/help" render={() => <About type="help" />} />
        <Route path="/terms" render={() => <About type="terms" />} />
        <Route path="/privacy" render={() => <About type="privacy" />} />
        <Route path="/admin" render={() => <Admin />} />
        <Route path="/error" render={() => <UnexpectedError />} />
        <Route path="/forbidden" render={() => <Forbidden />} />
        <Route render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

export default Routes;
