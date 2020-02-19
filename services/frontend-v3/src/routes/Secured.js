import React, { Component } from "react";
import Keycloak from "keycloak-js";
import { Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import axios from "axios";

import { Home } from "../pages";

// import animatedLogo from "../../assets/animatedLogo.gif";

// const loginFunc = require("../functions/login");

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
      .init({ onLoad: "login-required", promiseType: "native" })
      .then(authenticated => {
        if (keycloak.tokenParsed.resource_access)
          sessionStorage.setItem(
            "admin",
            keycloak.tokenParsed.resource_access[
              "upskill-client"
            ].roles.includes("view-admin-console")
          );
        else sessionStorage.removeItem("admin");
        axios.interceptors.request.use(config =>
          keycloak.updateToken(5).then(() => {
            config.headers.Authorization = "Bearer " + keycloak.token;
            return Promise.resolve(config).catch(keycloak.login);
          })
        );

        this.setState({ keycloak: keycloak, authenticated: authenticated });
        this.renderRedirect().then(redirect => {
          this.setState({ redirect: redirect });
        });
      });
  }

  goto = link => history.push(link);

  render() {
    const keycloak = this.state.keycloak;
    if (keycloak) {
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

            <Route
              exact
              path="/secured/home"
              render={routeProps => (
                <Home
                  keycloak={keycloak}
                  changeLanguage={this.changeLanguage}
                  {...routeProps}
                />
              )}
            />
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

  profileExist = () => {
    return this.state.keycloak.loadUserInfo().then(async userInfo => {
      // return loginFunc.createUser(userInfo.email, userInfo.name).then(res => {
      // console.log("res", res);

      // Add name and email to local storage
      localStorage.setItem("name", userInfo.name);
      localStorage.setItem("email", userInfo.email);

      // return res.hasProfile;
      return true;
      // });
    });
  };

  renderRedirect = () => {
    return this.profileExist().then(profileExist => {
      if (!profileExist) return <Redirect to="/secured/setup" />;
      else return <div />;
    });
  };
}
export default Secured;
