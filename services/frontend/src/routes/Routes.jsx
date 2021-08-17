import { Route, Switch } from "react-router-dom";

import ErrorNumber from "../components/errorResult/errorNumber";
import PrivacyModal from "../components/privacyModal/PrivacyModal";
import { LandingPage, Logout, UnexpectedError } from "../pages";
import Admin from "./Admin";
import ScrollToTop from "./ScrollToTop";
import Secured from "./Secured";

const Routes = () => (
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
      <Route path="/error" render={() => <UnexpectedError />} />
      <Route path="/forbidden" render={() => <ErrorNumber error="403" />} />
      <Route
        path="/"
        render={({ location }) => <Secured location={location} />}
      />
    </Switch>
    <PrivacyModal />
  </>
);

export default Routes;
