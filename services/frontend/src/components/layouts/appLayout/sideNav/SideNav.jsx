import PropTypes from "prop-types";

import SideNavView from "./SideNavView";

const SideNav = ({ displaySideBar, siderWidth, sideBarContent, loading }) => (
  <SideNavView
    displaySideBar={displaySideBar}
    loading={loading}
    sideBarContent={sideBarContent}
    siderWidth={siderWidth}
  />
);

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  siderWidth: PropTypes.number,
};

SideNav.defaultProps = {
  siderWidth: 300,
};

export default SideNav;
