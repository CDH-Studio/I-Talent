import PropTypes from "prop-types";
import React from "react";
import { Affix, Layout, Skeleton } from "antd";
import "./SideNavView.less";

const { Sider } = Layout;

const SideNavView = ({
  displaySideBar,
  sideBarContent,
  loading,
  adminView,
}) => {
  if (displaySideBar) {
    return (
      <Sider
        width="270"
        className="app-sider"
        breakpoint="lg"
        collapsedWidth="0"
        zeroWidthTriggerStyle={{ backgroundColor: "#192e2f", bottom: "64px" }}
      >
        {/* render content of side bar */}
        {loading ? (
          <div style={{ margin: 32 }}>
            <Skeleton active />
          </div>
        ) : (
          <div className="app-sider-content">{sideBarContent}</div>
        )}
      </Sider>
    );
  }
  return <Sider width="0" />;
};

SideNavView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  adminView: PropTypes.bool.isRequired,
};

export default SideNavView;
