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
  displaySideBar: PropTypes.bool,
  sideBarWidth: PropTypes.number,
  sideBarContent: PropTypes.node,
  loading: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
};

AppLayout.defaultProps = {
  children: false,
  displaySideBar: false,
  sideBarWidth: 300,
  sideBarContent: "",
  loading: false,
  displayLogo: true,
  displaySearch: true,
};

export default AppLayout;
