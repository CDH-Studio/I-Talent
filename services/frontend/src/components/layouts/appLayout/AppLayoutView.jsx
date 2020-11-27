import { Helmet } from "react-helmet";
import { Layout, Skeleton, Card } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import TopNav from "./topNav/TopNav";
import Footer from "./footer/Footer";
import SideNav from "./sideNav/SideNav";
import "./AppLayoutView.less";

const { Content } = Layout;

const AppLayoutView = ({
  sideBarContent,
  displaySideBar,
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
      <TopNav
        loading={loading}
        displayLogo={displayLogo}
        displaySearch={displaySearch}
      />
      <Layout>
        <SideNav
          sideBarContent={sideBarContent}
          displaySideBar={displaySideBar}
          loading={loading}
        />
        <Layout className="app-layout">
          <Content className="app-content">
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
  sideBarContent: PropTypes.node.isRequired,
  displaySideBar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool.isRequired,
  displayLogo: PropTypes.bool.isRequired,
};

export default AppLayoutView;
