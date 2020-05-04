import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";
import axios from "axios";
import {
  Logout,
  Home,
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
  NotFound,
} from "../pages";
// import animatedLogo from "../../assets/animatedLogo.gif";

import keycloakConfig from "../keycloak";

const loginFunc = require("../functions/login");

const { keycloakJSONConfig } = keycloakConfig;

function Secured(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const changeLanguage = props.changeLanguage;

  useEffect(() => {
    // Check if profile exist for the logged in user
    const profileExist = () => {
      return keycloak.loadUserInfo().then(async (userInfo) => {
        return loginFunc
          .createUser(userInfo.email, userInfo.name)
          .then((res) => {
            // Add name and email to local storage
            localStorage.setItem("name", userInfo.name);
            localStorage.setItem("email", userInfo.email);
            return res.hasProfile;
          });
      });
    };

    // Generate redirect if profile does not exist
    const renderRedirect = () => {
      return profileExist().then((profileExist) => {
        if (!profileExist) {
          return (
            <Redirect from="/old-path" to="/secured/profile/create/step/1" />
          );
        } else {
          return <div />;
        }
      });
    };

    const keycloak = Keycloak(keycloakJSONConfig);
    keycloak
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        // check if user is admin
        if (
          keycloak.tokenParsed.resource_access &&
          keycloak.tokenParsed.resource_access["upskill-client"]
        ) {
          sessionStorage.setItem(
            "admin",
            keycloak.tokenParsed.resource_access[
              "upskill-client"
            ].roles.includes("view-admin-console")
          );
        } else {
          sessionStorage.removeItem("admin");
        }

        axios.interceptors.request.use((config) =>
          keycloak.updateToken(5).then(() => {
            config.headers.Authorization = "Bearer " + keycloak.token;
            return Promise.resolve(config).catch(keycloak.login);
          })
        );

        setKeycloak(keycloak);
        setAuthenticated(authenticated);
        // store user info in local storage and redirect to create profile if needed
        renderRedirect().then((redirect) => {
          setRedirect(redirect);
        });
      });
  }, []);

  //Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const copyToClipboard = e => {
  //   this.textArea.select();
  //   document.execCommand("copy");
  //   e.target.focus();
  // };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /* detect if the user is on setup page to stop redirect if profile is not found */
  const currentPath = props.location.pathname;
  const regex = /(\/\bprofile\b\/\bcreate\b)/g;
  let redirectToSetup;
  if (!currentPath.match(regex)) {
    redirectToSetup = redirect;
  }

  if (keycloak) {
    if (authenticated) {
      return (
        <div id="view">
          {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
          {/* <div>
              Keycloak Secret
              <form>
                <textarea
                  ref={textarea => (this.textArea = textarea)}
                  value={keycloak.token}
                  readOnly
                />
              </form>
              {document.queryCommandSupported("copy") && (
                <div>
                  <button onClick={this.copyToClipboard}>Copy</button>
                  {copySuccess}
                </div>
              )}
            </div> */}
          {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}

          {/****** redirect to set up page ******/}
          {redirectToSetup}
          <Switch>
            {/****** home page with large search bar ******/}
            <Route
              exact
              path="/secured/home"
              render={(routeProps) => (
                <Home
                  keycloak={keycloak}
                  changeLanguage={changeLanguage}
                  {...routeProps}
                />
              )}
            />
            {/****** Results of search ******/}
            <Route
              exact
              path="/secured/results"
              render={(routeProps) => (
                <Results
                  keycloak={keycloak}
                  changeLanguage={changeLanguage}
                  {...routeProps}
                />
              )}
            />
            {/****** Create profile forms ******/}
            <Route
              path="/secured/profile/create/step/:step"
              render={(routeProps) => (
                <ProfileCreate
                  keycloak={keycloak}
                  changeLanguage={changeLanguage}
                  {...routeProps}
                />
              )}
            />
            {/****** Edit profile forms ******/}
            <Route
              path="/secured/profile/edit/:step"
              render={(routeProps) => (
                <ProfileEdit
                  keycloak={keycloak}
                  changeLanguage={changeLanguage}
                  {...routeProps}
                />
              )}
            />
            {/****** Profile page based on user ID ******/}
            <Route
              path="/secured/profile/:id?"
              render={(routeProps) => (
                <Profile
                  keycloak={keycloak}
                  changeLanguage={changeLanguage}
                  {...routeProps}
                />
              )}
            />
            {/****** Logout authorized user ******/}
            <Route
              exact
              path="/secured/logout"
              render={(routeProps) => (
                <Logout keycloak={keycloak} {...routeProps} />
              )}
            />
            {/****** 404 Page ******/}
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      );
    } else {
      return <div>Unable to authenticate!</div>;
    }
  }
  return <div></div>;
}
export default Secured;
