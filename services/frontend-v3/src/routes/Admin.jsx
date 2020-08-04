import React, { useState, useEffect, useCallback } from "react";
import { Route, Redirect } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import useAxios from "../utils/axios-instance";
import {
  AdminDashboard,
  AdminUser,
  AdminSkill,
  AdminCategory,
  AdminCompetency,
  AdminDiploma,
  AdminSchool,
} from "../pages/admin";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import login from "../utils/login";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const axios = useAxios();
  const [keycloak] = useKeycloak();

  const getInfo = useCallback(async () => {
    setSignupStep(await login(keycloak, axios));
    setIsAdmin(keycloak.hasResourceRole("view-admin-console"));
    setAuthenticated(keycloak.authenticated);
  }, [axios, keycloak]);

  useEffect(() => {
    if (keycloak.authenticated) {
      getInfo();
    } else {
      keycloak.login();
    }
  }, [getInfo, keycloak]);

  if (!authenticated) {
    return <AppLayout loading displaySideBar />;
  }

  if (signupStep !== 8) {
    return <Redirect to={`/profile/create/step/${signupStep}`} />;
  }

  if (!isAdmin) {
    return <Redirect to="/forbidden" />;
  }

  return (
    <>
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
      <Route path="/admin/" render={() => <Redirect to="/admin/dashboard" />} />
    </>
  );
};

export default Admin;
