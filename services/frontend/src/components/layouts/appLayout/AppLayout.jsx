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
  grid,
}) => (
  <AppLayoutView
    displayLogo={displayLogo}
    displaySearch={displaySearch}
    displaySideBar={displaySideBar}
    grid={grid}
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
  grid: PropTypes.bool,
  loading: PropTypes.bool,
  sideBarContent: PropTypes.node,
  sideBarWidth: PropTypes.number,
};

AppLayout.defaultProps = {
  children: false,
  displayLogo: true,
  displaySearch: true,
  displaySideBar: false,
  grid: false,
  loading: false,
  sideBarContent: "",
  sideBarWidth: 300,
};

export default AppLayout;
