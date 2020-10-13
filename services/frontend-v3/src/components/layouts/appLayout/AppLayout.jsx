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
  invisibleBackground,
}) => {
  return (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
      loading={loading}
      displayLogo={displayLogo}
      displaySearch={displaySearch}
      invisibleBackground={invisibleBackground}
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
  invisibleBackground: PropTypes.bool,
};

AppLayout.defaultProps = {
  children: false,
  sideBarContent: "",
  displaySideBar: false,
  loading: false,
  displayLogo: true,
  displaySearch: true,
  invisibleBackground: false,
};

export default AppLayout;
