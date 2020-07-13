import React from "react";
import { Layout, Skeleton, Card } from "antd";
import PropTypes from "prop-types";
import TopNav from "./topNav/TopNav";
import SideNav from "../../sideNav/SideNav";

const { Content } = Layout;

const AppLayoutView = ({
  sideBarContent,
  displaySideBar,
  children,
  loading,
  displayLogo,
  displaySearch,
}) => {
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
      <TopNav
        loading={loading}
        displayLogo={displayLogo}
        displaySearch={displaySearch}
      />
      <Layout style={{ marginTop: 64 }}>
        {/* Render Side Navigation Bar */}
        <SideNav
          sideBarContent={sideBarContent}
          displaySideBar={displaySideBar}
          loading={loading}
        />
        {/* Render content */}
        <Layout>
          <Content style={styles.content}>
            {loading ? (
              <Card>
                <Skeleton />
              </Card>
            ) : (
              children
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

AppLayoutView.propTypes = {
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displayLogo: PropTypes.bool.isRequired,
};

AppLayoutView.defaultProps = {
  sideBarContent: undefined,
};

export default AppLayoutView;
