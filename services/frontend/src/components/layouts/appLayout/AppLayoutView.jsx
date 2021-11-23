import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Card, Layout, Skeleton } from "antd";
import PropTypes from "prop-types";

import Footer from "./footer/Footer";
import SideNav from "./sideNav/SideNav";
import SkipToContent from "./skipToContent/SkipToContent";
import TopNav from "./topNav/TopNav";

import "./AppLayoutView.less";

const { Content } = Layout;

const AppLayoutView = ({
  displaySideBar,
  sideBarWidth,
  sideBarContent,
  children,
  loading,
  displayLogo,
  displaySearch,
}) => {
  const { locale } = useSelector((state) => state.settings);

  return (
    <Layout className="app-outer-layout">
      <Helmet>
        <html lang={locale === "ENGLISH" ? "en" : "fr"} />
      </Helmet>
      <SkipToContent contentId="#main" />
      <TopNav
        displayLogo={displayLogo}
        displaySearch={displaySearch}
        loading={loading}
      />
      <Layout>
        {displaySideBar && (
          <SideNav
            loading={loading}
            sideBarContent={sideBarContent}
            siderWidth={sideBarWidth}
          />
        )}
        <Layout className="app-layout">
          <Content className="app-content" id="main" role="main">
            {loading ? (
              <Card>
                <Skeleton active />
              </Card>
            ) : (
              children
            )}
          </Content>
          {!loading && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
};

AppLayoutView.propTypes = {
  children: PropTypes.node.isRequired,
  displayLogo: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displaySideBar: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sideBarContent: PropTypes.node.isRequired,
  sideBarWidth: PropTypes.number.isRequired,
};

export default AppLayoutView;
