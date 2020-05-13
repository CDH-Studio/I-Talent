import PropTypes from "prop-types";
import React from "react";
import { Affix, Layout } from "antd";

const { Sider } = Layout;

const SideNavView = ({ displaySideBar, sideBarContent }) => {
  /* Component Styles */
  const styles = {
    siderDiv: {
      minHeight: "100vh",
      background: "#fff",
    },
    sider: {
      background: "#fff",
      height: "100vh",
    },
    siderMenu: {
      minHeight: "100vh",
    },
  };

  if (displaySideBar) {
    return (
      <Affix offsetTop={64}>
        <Sider
          width="270"
          style={styles.sider}
          breakpoint="lg"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ backgroundColor: "#192e2f" }}
        >
          {/* render content of side bar */}
          {sideBarContent}
        </Sider>
      </Affix>
    );
  }
  return <Sider width="0" />;
};

SideNavView.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node,
};

SideNavView.defaultProps = {
  sideBarContent: undefined,
};

export default SideNavView;
