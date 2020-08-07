import React from "react";
import PropTypes from "prop-types";
import SideNavView from "./SideNavView";

const SideNav = ({ sideBarContent, displaySideBar, loading, isAdmin }) => {
  return (
    <SideNavView
      sideBarContent={sideBarContent}
      displaySideBar={displaySideBar}
      loading={loading}
      isAdmin={isAdmin}
    />
  );
};

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default SideNav;
