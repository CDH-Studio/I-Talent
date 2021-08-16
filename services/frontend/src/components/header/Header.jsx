import PropTypes from "prop-types";

import HeaderView from "./HeaderView";

const Header = ({ title, icon, extra, subtitle, backBtn }) => (
  <HeaderView
    backBtn={backBtn}
    extra={extra}
    icon={icon}
    subtitle={subtitle}
    title={title}
  />
);

Header.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  extra: PropTypes.node,
  icon: PropTypes.node,
  backBtn: PropTypes.bool,
};

Header.defaultProps = {
  extra: " ",
  subtitle: " ",
  icon: " ",
  backBtn: false,
};

export default Header;
