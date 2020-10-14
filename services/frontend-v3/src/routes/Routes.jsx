import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivacyModal from "../components/privacyModal/PrivacyModal";
import { useSelector, useDispatch} from "react-redux";
import { setIsPrivacyAccepted } from "../redux/slices/userSlice";
import { useKeycloak } from "@react-keycloak/web";
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

const Routes = () => {
  const dispatch = useDispatch();
  const { isPrivacyAccepted } = useSelector((state) => state.user);
  const [keycloak] = useKeycloak();

  const handleOk = e => {
    dispatch(setIsPrivacyAccepted(true));
  };

  const handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

return(
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
    {/* <Modal
      title="Basic Modal"
      visible={!isPrivacyAccepted && keycloak && keycloak.authenticated}
      onOk={handleOk}
      onCancel={handleCancel}
      >
    </Modal> */}
  </>
)



};

export default Routes;
