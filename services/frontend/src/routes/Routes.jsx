import { Route, Switch } from "react-router-dom";
import { LandingPage, UnexpectedError, Logout } from "../pages";
import ErrorNumber from "../components/errorResult/errorNumber";
import Admin from "./Admin";
import Secured from "./Secured";
import ScrollToTop from "./ScrollToTop";
import PrivacyModal from "../components/privacyModal/PrivacyModal";

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
