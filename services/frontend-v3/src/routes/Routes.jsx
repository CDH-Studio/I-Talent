import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  LandingPage,
  UnexpectedError,
  Forbidden,
  About,
  Logout,
} from "../pages";
import Admin from "./Admin";
import Secured from "./Secured";
import ScrollToTop from "./ScrollTopTop";
import PrivacyModal from "../components/privacyModal/PrivacyModal";

const Routes = () => {
  return (
    <>
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
      <PrivacyModal />
    </>
  );
};

export default Routes;
