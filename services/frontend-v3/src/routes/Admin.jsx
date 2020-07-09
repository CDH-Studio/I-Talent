import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Keycloak from "keycloak-js";
import axios from "../axios-instance";
import {
  AdminDashboard,
  AdminUser,
  AdminSkill,
  AdminCategory,
  AdminCompetency,
  AdminDiploma,
  AdminSchool,
} from "../pages/admin";
import keycloakConfig from "../keycloak";

const { keycloakJSONConfig } = keycloakConfig;

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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

        // Checks if the user has the correct keycloak role (is admin)
        const resources = keycloakInstance.tokenParsed.resource_access;
        if (resources) {
          const hasAdminAccess = Object.keys(resources).every(
            (resourceKey) => {
              const resource = resources[resourceKey];

              return (
                "role" in resource &&
                Array.isArray(resource.role) &&
                resource.role.includes("view-admin-console")
              );
            }
          );

          setIsAdmin(hasAdminAccess);
        }

        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
      });
  }, []);

  // If NOT using some version of Internet Explorer
  if (!/MSIE|Trident/.test(window.navigator.userAgent)) {
    document.body.style = "background-color: #eeeeee";
  }

  if (!keycloak) {
    return null;
  }

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  // if (!isAdmin) {
  //   return <Redirect to="/secured/home" />;
  // }

  return (
    <>
      <Route exact path="/admin/" render={<Redirect to="/admin/dashboard" />} />
      <Route exact path="/admin/dashboard" render={<AdminDashboard />} />
      <Route exact path="/admin/users" render={<AdminUser />} />
      <Route exact path="/admin/skills" render={<AdminSkill />} />
      <Route exact path="/admin/categories" render={<AdminCategory />} />
      <Route exact path="/admin/competencies" render={<AdminCompetency />} />
      <Route exact path="/admin/diplomas" render={<AdminDiploma />} />
      <Route exact path="/admin/schools" render={<AdminSchool />} />
    </>
  );
};

export default Admin;
