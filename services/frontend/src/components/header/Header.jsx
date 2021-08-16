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
  backBtn: PropTypes.bool,
  extra: PropTypes.node,
  icon: PropTypes.node,
  subtitle: PropTypes.node,
  title: PropTypes.node.isRequired,
};

Header.defaultProps = {
  backBtn: false,
  extra: " ",
  icon: " ",
  subtitle: " ",
};

export default Header;
