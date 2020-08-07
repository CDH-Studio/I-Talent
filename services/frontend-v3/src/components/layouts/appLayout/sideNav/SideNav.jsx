import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import SideNavView from "./SideNavView";

const SideNav = ({ sideBarContent, displaySideBar, loading }) => {
  const { pathname } = useLocation();
  const [adminView, setAdminView] = useState(false);

  useEffect(() => {
    setAdminView(pathname.includes("admin"));
  }, [pathname]);

  return (
    <SideNavView
      sideBarContent={sideBarContent}
      displaySideBar={displaySideBar}
      loading={loading}
      adminView={adminView}
    />
  );
};

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SideNav;
