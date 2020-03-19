import React, { Component } from "react";
import Keycloak from "keycloak-js";
import { Route, Redirect, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";
import {
  Logout,
  Home,
  Results,
  Profile,
  ProfileEdit,
  ProfileCreate,
  NotFound
} from "../pages";
// import animatedLogo from "../../assets/animatedLogo.gif";

const loginFunc = require("../functions/login");

const history = createBrowserHistory();

class Secured extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      keycloak: null,
      redirect: null
    };

    this.changeLanguage = this.props.changeLanguage;
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false
      })
      .then(authenticated => {
        // check if user is admin
        if (keycloak.tokenParsed.resource_access) {
          sessionStorage.setItem(
            "admin",
            keycloak.tokenParsed.resource_access[
              "upskill-client"
            ].roles.includes("view-admin-console")
          );
        } else {
          sessionStorage.removeItem("admin");
        }

        axios.interceptors.request.use(config =>
          keycloak.updateToken(5).then(() => {
            config.headers.Authorization = "Bearer " + keycloak.token;
            return Promise.resolve(config).catch(keycloak.login);
          })
        );

        this.setState({ keycloak: keycloak, authenticated: authenticated });
        // store user info in local storage and redirect to create profile if needed
        this.renderRedirect().then(redirect => {
          this.setState({ redirect: redirect });
        });
      });
  }

  goto = link => history.push(link);

  render() {
    /* detect if the user is on setup page to stop redirect if profile is not found */
    const currentPath = this.props.location.pathname;
    const regex = /(\/\bprofile\b\/\bcreate\b)/g;
    let redirectToSetup;
    if (!currentPath.match(regex)) {
      redirectToSetup = this.state.redirect;
    }

    if (this.state.keycloak) {
      if (this.state.authenticated) {
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
                  {this.state.copySuccess}
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
                render={routeProps => (
                  <Home
                    keycloak={this.state.keycloak}
                    changeLanguage={this.changeLanguage}
                    {...routeProps}
                  />
                )}
              />
              {/****** Results of search ******/}
              <Route
                exact
                path="/secured/results"
                render={routeProps => (
                  <Results
                    keycloak={this.state.keycloak}
                    changeLanguage={this.changeLanguage}
                    {...routeProps}
                  />
                )}
              />
              {/****** Create profile forms ******/}
              <Route
                path="/secured/profile/create/step/:step"
                render={routeProps => (
                  <ProfileCreate
                    keycloak={this.state.keycloak}
                    changeLanguage={this.changeLanguage}
                    {...routeProps}
                  />
                )}
              />
              {/****** Edit profile forms ******/}
              <Route
                path="/secured/profileEdit"
                render={routeProps => (
                  <ProfileEdit
                    keycloak={this.state.keycloak}
                    changeLanguage={this.changeLanguage}
                    {...routeProps}
                  />
                )}
              />
              {/****** Profile page based on user ID ******/}
              <Route
                path="/secured/profile/:id?"
                render={routeProps => (
                  <Profile
                    keycloak={this.state.keycloak}
                    changeLanguage={this.changeLanguage}
                    {...routeProps}
                  />
                )}
              />
              {/****** Logout authorized user ******/}
              <Route
                exact
                path="/secured/logout"
                render={routeProps => (
                  <Logout keycloak={this.state.keycloak} {...routeProps} />
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
  //Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Check if profile exist for the logged in user
  profileExist = () => {
    return this.state.keycloak.loadUserInfo().then(async userInfo => {
      return loginFunc.createUser(userInfo.email, userInfo.name).then(res => {
        // Add name and email to local storage
        localStorage.setItem("name", userInfo.name);
        localStorage.setItem("email", userInfo.email);
        return res.hasProfile;
      });
    });
  };

  // Generate redirect if profile does not exist
  renderRedirect = () => {
    return this.profileExist().then(profileExist => {
      if (!profileExist) {
        return (
          <Redirect from="/old-path" to="/secured/profile/create/step/1" />
        );
      } else {
        return <div />;
      }
    });
  };
}
export default Secured;
