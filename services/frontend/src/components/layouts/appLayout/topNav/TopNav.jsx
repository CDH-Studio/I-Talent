import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import TopNavView from "./TopNavView";

const TopNav = ({ loading, displayLogo, displaySearch }) => {
  const { isAdmin } = useSelector((state) => state.user);

  return (
    <TopNavView
      displayLogo={displayLogo}
      displaySearch={displaySearch}
      isAdmin={isAdmin}
      loading={loading}
    />
  );
};

TopNav.propTypes = {
  displayLogo: PropTypes.bool,
  displaySearch: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

TopNav.defaultProps = {
  displayLogo: true,
  displaySearch: true,
};

export default TopNav;
