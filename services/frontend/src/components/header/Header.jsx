import PropTypes from "prop-types";
import HeaderView from "./HeaderView";

const Header = ({ title, extra, subtitle }) => (
  <HeaderView title={title} extra={extra} subtitle={subtitle} />
);

Header.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  extra: PropTypes.node,
};

Header.defaultProps = {
  extra: "",
  subtitle: "",
};

export default Header;
