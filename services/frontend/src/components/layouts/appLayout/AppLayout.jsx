import PropTypes from "prop-types";

import AppLayoutView from "./AppLayoutView";

const AppLayout = ({
  displaySideBar,
  sideBarWidth,
  sideBarContent,
  children,
  loading,
  displayLogo,
  displaySearch,
}) => (
  <AppLayoutView
    displayLogo={displayLogo}
    displaySearch={displaySearch}
    displaySideBar={displaySideBar}
    loading={loading}
    sideBarContent={sideBarContent}
    sideBarWidth={sideBarWidth}
  >
    {children}
  </AppLayoutView>
);

AppLayout.propTypes = {
  children: PropTypes.node,
  displayLogo: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displaySideBar: PropTypes.bool,
  loading: PropTypes.bool,
  sideBarContent: PropTypes.node,
  sideBarWidth: PropTypes.number,
};

AppLayout.defaultProps = {
  children: false,
  displayLogo: true,
  displaySearch: true,
  displaySideBar: false,
  loading: false,
  sideBarContent: "",
  sideBarWidth: 300,
};

export default AppLayout;
