import React, { useState } from "react";
import { Affix, Layout } from "antd";

const { Sider } = Layout;

function SideNavView(props) {
  const displaySideBar = props.displaySideBar;

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
          width="250"
          style={styles.sider}
          breakpoint="lg"
          collapsedWidth="0"
        >
          {/* render content of side bar */}
          {props.sideBarContent}
        </Sider>
      </Affix>
    );
  } else {
    return <Sider width="0" />;
  }
}

export default SideNavView;
