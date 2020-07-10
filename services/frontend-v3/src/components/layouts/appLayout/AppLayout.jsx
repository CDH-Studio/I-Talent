import React from "react";
import PropTypes from "prop-types";
import AppLayoutView from "./AppLayoutView";

const AppLayout = ({ displaySideBar, sideBarContent, children, loading }) => {
  return (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
      loading={loading}
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
};

AppLayout.defaultProps = {
  sideBarContent: undefined,
  loading: false,
};

export default AppLayout;
