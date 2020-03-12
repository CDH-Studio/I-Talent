import React, { useState } from "react";
import { Affix, Layout } from "antd";

const { Sider } = Layout;

function SideNavView(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [top] = useState(0);
  // toggle side nav
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const displaySideBar = props.displaySideBar;

  /* Component Styles */
  const styles = {
    siderDiv: {
      minHeight: "100vh",
      background: "#fff"
    },
    sider: {
      minHeight: "100vh",
      background: "#fff"
    },
    siderMenu: {
      minHeight: "100vh"
    }
  };

  return (
    <div style={styles.siderDiv}>
      {/* render side bar is user sets showSideBar */}
      {displaySideBar ? (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          width="250"
          style={styles.sider}
        >
          {/* render content of side bar */}
          <Affix offsetTop={top}>{props.sideBarContent}</Affix>
        </Sider>
      ) : (
        <Sider width="0" />
      )}
    </div>
  );
}

export default SideNavView;
