import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Keycloak from "keycloak-js";
import axios from "axios";
import {
  AdminDashboard,
  AdminUser,
  AdminSkill,
  AdminCategory,
  AdminCompetency,
  AdminDiploma,
  AdminSchool,
} from "../pages/admin";
import config from "../config";
import keycloakConfig from "../keycloak";

const { backendAddress } = config;
const { keycloakJSONConfig } = keycloakConfig;

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);
    keycloakInstance
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then(auth => {
        axios.interceptors.request.use(requestConfig =>
          keycloakInstance.updateToken(300).then(() => {
            const newConfig = requestConfig;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        axios.get(`${backendAddress}api/admin/check`).then(
          () => {
            setKeycloak(keycloakInstance);
            setAuthenticated(auth);
            // setIsAdmin(true);
            // setLoading(false);
          },
          () => {
            setKeycloak(keycloakInstance);
            setAuthenticated(auth);
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

  // const copyToClipboard = (e) => {
  //   this.textArea.select();
  //   document.execCommand("copy");
  //   e.target.focus();
  // };
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
            render={({ history }) => <AdminDashboard history={history} />}
          />
          <Route
            exact
            path="/admin/users"
            render={({ history }) => <AdminUser history={history} />}
          />
          <Route
            exact
            path="/admin/skills"
            render={({ history }) => <AdminSkill history={history} />}
          />
          <Route
            exact
            path="/admin/categories"
            render={({ history }) => <AdminCategory history={history} />}
          />
          <Route
            exact
            path="/admin/competencies"
            render={({ history }) => <AdminCompetency history={history} />}
          />
          <Route
            exact
            path="/admin/diploma"
            render={({ history }) => <AdminDiploma history={history} />}
          />
          <Route
            exact
            path="/admin/school"
            render={({ history }) => <AdminSchool history={history} />}
          />
        </div>
      );
    }
    return <div>Unable to authenticate!</div>;
  }
  return <div />;
};

export default Admin;
