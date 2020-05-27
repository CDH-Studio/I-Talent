import React from "react";
import PropTypes from "prop-types";
import AppLayoutView from "./AppLayoutView";

const AppLayout = ({
  displaySideBar,
  sideBarContent,
  children,
}) => {
  return (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
    >
      {children}
    </AppLayoutView>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool.isRequired,
};

AppLayout.defaultProps = {
  sideBarContent: undefined,
};

export default AppLayout;
