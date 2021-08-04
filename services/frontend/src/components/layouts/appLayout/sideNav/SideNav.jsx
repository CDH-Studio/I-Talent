import PropTypes from "prop-types";
import SideNavView from "./SideNavView";

const SideNav = ({ displaySideBar, siderWidth, sideBarContent, loading }) => (
  <SideNavView
    displaySideBar={displaySideBar}
    siderWidth={siderWidth}
    sideBarContent={sideBarContent}
    loading={loading}
  />
);

SideNav.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  siderWidth: PropTypes.number,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

SideNav.defaultProps = {
  siderWidth: 300,
};

export default SideNav;
