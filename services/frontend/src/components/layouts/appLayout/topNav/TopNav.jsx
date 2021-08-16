import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
  loading: PropTypes.bool.isRequired,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
};

TopNav.defaultProps = {
  displaySearch: true,
  displayLogo: true,
};

export default TopNav;
