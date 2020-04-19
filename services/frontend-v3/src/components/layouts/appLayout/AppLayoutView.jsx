import React from "react";
import { Layout } from "antd";
import TopNav from "./topNav/TopNav";
import SideNav from "../../sideNav/SideNav";

const { Content } = Layout;

function AppLayoutView(props) {
  const styles = {
    contentLayout: {
      marginTop: "64px",
    },
    content: {
      padding: "20px 15px",
      margin: 0,
      minHeight: 280,
    },
  };

  return (
    <Layout>
      {/* Render Top Navigation Bar */}
      <TopNav
        changeLanguage={props.changeLanguage}
        keycloak={props.keycloak}
      ></TopNav>
      <Layout style={{ marginTop: 64 }}>
        {/* Render Side Navigation Bar */}
        <SideNav
          sideBarContent={props.sideBarContent}
          displaySideBar={props.displaySideBar}
        ></SideNav>
        {/* Render content */}
        <Layout>
          <Content style={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

/* Component Styles */

export default AppLayoutView;
