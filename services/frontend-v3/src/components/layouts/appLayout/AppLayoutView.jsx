import React from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import TopNav from "./topNav/TopNav";
import Footer from "./footer/Footer";
import SideNav from "../../sideNav/SideNav";

const { Content } = Layout;

const AppLayoutView = ({ sideBarContent, displaySideBar, children }) => {
  const styles = {
    contentLayout: {
      marginTop: "64px",
    },
    content: {
      padding: "20px 15px",
      margin: 0,
      minHeight: "100%",
    },
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Render Top Navigation Bar */}
      <TopNav />
      <Layout style={{ marginTop: 64 }}>
        {/* Render Side Navigation Bar */}
        <SideNav
          sideBarContent={sideBarContent}
          displaySideBar={displaySideBar}
        />
        {/* Render content */}
        <Layout>
          <Content style={styles.content}>{children}</Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
};

AppLayoutView.propTypes = {
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

AppLayoutView.defaultProps = {
  sideBarContent: undefined,
};

export default AppLayoutView;
