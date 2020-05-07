import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import { Route, Redirect } from "react-router-dom";
// import { createBrowserHistory } from "history";
import axios from "axios";

// import animatedLogo from "../assets/animatedLogo.gif";

import {
  AdminDasboard,
  AdminUser,
  AdminSkill,
  AdminCategory,
  AdminCompetency,
  AdminDiploma,
  AdminSchool,
} from "../pages/admin";

import config from "../config";
import keycloakConfig from "../keycloak";
import Forbidden from "../pages/Forbidden";

const { backendAddress } = config;
const { keycloakJSONConfig } = keycloakConfig;

function Admin(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [loading, setLoading] = useState(true);

  const { changeLanguage } = props;

  useEffect(() => {
    const keycloak = Keycloak(keycloakJSONConfig);
    keycloak
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        axios.interceptors.request.use((config) =>
          keycloak.updateToken(300).then(() => {
            config.headers.Authorization = `Bearer ${keycloak.token}`;
            return Promise.resolve(config).catch(keycloak.login);
          })
        );

        axios.get(`${backendAddress}api/admin/check`).then(
          () => {
            setKeycloak(keycloak);
            setAuthenticated(authenticated);
            // setIsAdmin(true);
            // setLoading(false);
          },
          () => {
            setKeycloak(keycloak);
            setAuthenticated(authenticated);
            // setIsAdmin(false);
            // setLoading(false);
          }
        );
      });
  }, []);

  // If NOT using some version of Internet Explorer
  if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
    document.body.style = "background-color: #eeeeee";
  }

  /** *******
   * Once admin protection has been implemented,
   * uncomment this
   ***************** */

  // FORBIDDEN PAGE
  // if (!isAdmin) {
  //   return <Forbidden />;
  // }

  // Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  if (keycloak) {
    if (authenticated) {
      return (
        <div>
          {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                <div>
                {/* Added for copying token ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* <div>
                  <form>
                    <textarea
                      ref={textarea => (this.textArea = textarea)}
                      value={keycloak.token}
                    />
                  </form>
                  {document.queryCommandSupported("copy") && (
                    <div>
                      <button onClick={this.copyToClipboard}>Copy</button>
                      {copySuccess}
                    </div>
                  )}
                </div>
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          <Route
            exact
            path="/admin/"
            render={() => <Redirect to="/admin/dashboard" />}
          />
          <Route
            exact
            path="/admin/dashboard"
            render={(routeProps) => (
              <AdminDasboard
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/users"
            render={(routeProps) => (
              <AdminUser
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/skills"
            render={(routeProps) => (
              <AdminSkill
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/categories"
            render={(routeProps) => (
              <AdminCategory
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/competencies"
            render={(routeProps) => (
              <AdminCompetency
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/diploma"
            render={(routeProps) => (
              <AdminDiploma
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/admin/school"
            render={(routeProps) => (
              <AdminSchool
                keycloak={keycloak}
                changeLanguage={changeLanguage}
                {...routeProps}
              />
            )}
          />
        </div>
      );
    }
    return <div>Unable to authenticate!</div>;
  }
  return <div />;
}

export default Admin;
