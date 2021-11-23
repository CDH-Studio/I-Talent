import PropTypes from "prop-types";

import SideNavView from "./SideNavView";

const SideNav = ({ siderWidth, sideBarContent, loading }) => (
  <SideNavView
    loading={loading}
    sideBarContent={sideBarContent}
    siderWidth={siderWidth}
  />
);

SideNav.propTypes = {
  loading: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  siderWidth: PropTypes.number,
};

SideNav.defaultProps = {
  siderWidth: 300,
};

export default SideNav;
