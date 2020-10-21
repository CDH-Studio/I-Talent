import React, { useState, useEffect, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useSelector } from "react-redux";
import useAxios from "../utils/useAxios";
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
  const axios = useAxios();
  const { keycloak } = useKeycloak();

  const { signupStep } = useSelector((state) => state.user);

  const getInfo = useCallback(async () => {
    await login(keycloak, axios);
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
      <Switch>
        <Route path="/admin/dashboard" render={() => <AdminDashboard />} />
        <Route path="/admin/users" render={() => <AdminUser />} />
        <Route path="/admin/skills" render={() => <AdminSkill />} />
        <Route path="/admin/categories" render={() => <AdminCategory />} />
        <Route path="/admin/competencies" render={() => <AdminCompetency />} />
        <Route path="/admin/diplomas" render={() => <AdminDiploma />} />
        <Route path="/admin/schools" render={() => <AdminSchool />} />
        <Route
          path="/admin/"
          render={() => <Redirect to="/admin/dashboard" />}
        />
      </Switch>
    </>
  );
};

export default Admin;
