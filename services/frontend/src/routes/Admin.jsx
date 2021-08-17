import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import AppLayout from "../components/layouts/appLayout/AppLayout";
import {
  AdminBugs,
  AdminCategory,
  AdminCompetency,
  AdminDashboard,
  AdminDiploma,
  AdminSchool,
  AdminSkill,
  AdminUser,
} from "../pages/admin";
import login from "../utils/login";
import useAxios from "../utils/useAxios";

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
    return <AppLayout displaySideBar loading />;
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
        <Route path="/admin/bugs" render={() => <AdminBugs />} />
        <Route
          path="/admin/"
          render={() => <Redirect to="/admin/dashboard" />}
        />
      </Switch>
    </>
  );
};

export default Admin;
