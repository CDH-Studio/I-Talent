import React from "react";
import PropTypes from "prop-types";
import AppLayoutView from "./AppLayoutView";

const AppLayout = ({
  displaySideBar,
  sideBarContent,
  children,
  loading,
  displayLogo,
  displaySearch,
  isAdmin,
}) => {
  return (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
      loading={loading}
      displayLogo={displayLogo}
      displaySearch={displaySearch}
      isAdmin={isAdmin}
    >
      {children}
    </AppLayoutView>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool,
  loading: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

AppLayout.defaultProps = {
  children: false,
  sideBarContent: "",
  displaySideBar: false,
  loading: false,
  displayLogo: true,
  displaySearch: true,
  isAdmin: false,
};

export default AppLayout;
