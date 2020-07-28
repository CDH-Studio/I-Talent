import React, { useState, useEffect } from "react";
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

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const axios = useAxios();
  const [keycloak] = useKeycloak();

  useEffect(() => {
    const getInfo = async () => {
      const userInfo = await keycloak.loadUserInfo();
      try {
        const response = await axios.get(`api/user/${userInfo.sub}`);
        setUserExists(response.data !== null && response.data.signupStep === 8);
      } catch (e) {
        setUserExists(false);
      }
      setIsAdmin(keycloak.hasResourceRole("view-admin-console"));
      setAuthenticated(keycloak.authenticated);
    };
    getInfo();
  }, []);

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  if (!userExists) {
    return <Redirect to="/profile/create/step/1" />;
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
