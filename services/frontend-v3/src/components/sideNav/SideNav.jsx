import React from "react";
import PropTypes from "prop-types";
import SideNavView from "./SideNavView";

const SideNav = ({ sideBarContent, displaySideBar, loading }) => {
  return (
    <SideNavView
      sideBarContent={sideBarContent}
      displaySideBar={displaySideBar}
      loading={loading}
    />
  );
};

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node,
  loading: PropTypes.bool.isRequired,
};

SideNav.defaultProps = {
  sideBarContent: undefined,
};

export default SideNav;
