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
}) => {
  return (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
      loading={loading}
      displayLogo={displayLogo}
      displaySearch={displaySearch}
    >
      {children}
    </AppLayoutView>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
};

AppLayout.defaultProps = {
  sideBarContent: undefined,
  loading: false,
  displayLogo: undefined,
  displaySearch: undefined,
};

export default AppLayout;
