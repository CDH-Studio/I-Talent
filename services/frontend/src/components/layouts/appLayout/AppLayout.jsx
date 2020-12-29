import PropTypes from "prop-types";
import AppLayoutView from "./AppLayoutView";

const AppLayout = ({
  displaySideBar,
  sideBarContent,
  children,
  loading,
  displayLogo,
  displaySearch,
}) => (
    <AppLayoutView
      displaySideBar={displaySideBar}
      sideBarContent={sideBarContent}
      loading={loading}
      displayLogo={displayLogo}
      displaySearch={displaySearch}
    >
      {children}
    </AppLayoutView>
  );

AppLayout.propTypes = {
  children: PropTypes.node,
  sideBarContent: PropTypes.node,
  displaySideBar: PropTypes.bool,
  loading: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
};

AppLayout.defaultProps = {
  children: false,
  sideBarContent: "",
  displaySideBar: false,
  loading: false,
  displayLogo: true,
  displaySearch: true,
};

export default AppLayout;
