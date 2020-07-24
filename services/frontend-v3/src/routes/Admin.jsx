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
import AppLayout from "../components/layouts/appLayout/AppLayout";

const { keycloakJSONConfig } = keycloakConfig;

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const keycloakInstance = Keycloak(keycloakJSONConfig);
    keycloakInstance
      .init({
        onLoad: "login-required",
        promiseType: "native",
        checkLoginIframe: false,
      })
      .then(async (auth) => {
        axios.interceptors.request.use((requestConfig) =>
          keycloakInstance.updateToken(300).then(() => {
            const newConfig = requestConfig;
            newConfig.headers.Authorization = `Bearer ${keycloakInstance.token}`;
            return Promise.resolve(newConfig).catch(keycloakInstance.login);
          })
        );

        const userInfo = await keycloakInstance.loadUserInfo();

        // Checks if user even exists
        try {
          const response = await axios.get(`api/user/${userInfo.sub}`);
          setUserExists(response.data !== null && response.data.signupStep === 8);
        } catch (e) {
          setUserExists(false);
        }

        // Checks if the user has the correct keycloak role (is admin)
        const resources = keycloakInstance.tokenParsed.resource_access;
        if (resources) {
          const hasAdminAccess = Object.keys(resources).every((resourceKey) => {
            const resource = resources[resourceKey];

            return (
              "roles" in resource &&
              Array.isArray(resource.roles) &&
              resource.roles.includes("view-admin-console")
            );
          });

          setIsAdmin(hasAdminAccess);
        }

        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
      });
  }, []);

  if (!keycloak) {
    return <AppLayout loading />;
  }

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  if (!userExists) {
    return <Redirect to="/secured/profile/create/step/1" />;
  }

  if (!isAdmin) {
    return <Redirect to="/forbidden" />;
  }

  return (
    <>
      <Route
        exact
        path="/admin/"
        render={() => <Redirect to="/admin/dashboard" />}
      />
      <Route exact path="/admin/dashboard" render={() => <AdminDashboard />} />
      <Route exact path="/admin/users" render={() => <AdminUser />} />
      <Route exact path="/admin/skills" render={() => <AdminSkill />} />
      <Route exact path="/admin/categories" render={() => <AdminCategory />} />
      <Route
        exact
        path="/admin/competencies"
        render={() => <AdminCompetency />}
      />
      <Route exact path="/admin/diplomas" render={() => <AdminDiploma />} />
      <Route exact path="/admin/schools" render={() => <AdminSchool />} />
    </>
  );
};

export default Admin;
