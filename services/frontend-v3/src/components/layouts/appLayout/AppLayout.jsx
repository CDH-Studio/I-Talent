import React from "react";
import PropTypes from "prop-types";
import AppLayoutView from "./AppLayoutView";

const AppLayout = ({
  changeLanguage,
  displaySideBar,
  sideBarContent,
  children,
}) => {
  return (
    <AppLayoutView
      changeLanguage={changeLanguage}
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
  changeLanguage: PropTypes.func.isRequired,
};

AppLayout.defaultProps = {
  sideBarContent: undefined,
};

export default AppLayout;
