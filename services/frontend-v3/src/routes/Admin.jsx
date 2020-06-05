import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Keycloak from "keycloak-js";
import axios from "axios";
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
import store from "../redux";
import {
  setUserId,
  setUserAvatarColor,
  setUserEmail,
  setUserName,
  setUserInitials,
} from "../redux/slices/userSlice";

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
      .then((auth) => {
        axios.interceptors.request.use((requestConfig) =>
          keycloakInstance.updateToken(300).then(() => {
            const newConfig = requestConfig;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        if (localStorage.getItem("userId")) {
          const userId = localStorage.getItem("userId");
          const color = localStorage.getItem("color");
          const email = localStorage.getItem("email");
          const name = localStorage.getItem("name");
          const acronym = localStorage.getItem("acronym");

          store.dispatch(setUserId(userId));
          store.dispatch(setUserAvatarColor(color));
          store.dispatch(setUserEmail(email));
          store.dispatch(setUserName(name));
          store.dispatch(setUserInitials(acronym));
        }

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
            render={() => <AdminDasboard />}
          />
          <Route exact path="/admin/users" render={() => <AdminUser />} />
          <Route exact path="/admin/skills" render={() => <AdminSkill />} />
          <Route
            exact
            path="/admin/categories"
            render={() => <AdminCategory />}
          />
          <Route
            exact
            path="/admin/competencies"
            render={() => <AdminCompetency />}
          />
          <Route exact path="/admin/diploma" render={() => <AdminDiploma />} />
          <Route exact path="/admin/school" render={() => <AdminSchool />} />
        </div>
      );
    }
    return <div>Unable to authenticate!</div>;
  }
  return <div />;
};

export default Admin;
