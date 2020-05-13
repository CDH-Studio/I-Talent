import React from "react";
import PropTypes from "prop-types";
import SideNavView from "./SideNavView";

const SideNav = ({ sideBarContent, displaySideBar }) => {
  return (
    <SideNavView
      sideBarContent={sideBarContent}
      displaySideBar={displaySideBar}
    />
  );
};

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node,
};

SideNav.defaultProps = {
  sideBarContent: undefined,
};

export default SideNav;
