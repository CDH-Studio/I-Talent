import PropTypes from "prop-types";
import HeaderView from "./HeaderView";

const Header = ({ title, icon, extra, subtitle, onBack }) => (
  <HeaderView
    title={title}
    icon={icon}
    extra={extra}
    subtitle={subtitle}
    onBack={onBack}
  />
);

Header.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  extra: PropTypes.node,
  icon: PropTypes.node,
  onBack: PropTypes.func,
};

Header.defaultProps = {
  extra: "",
  subtitle: "",
  icon: "",
  onBack: "",
};

export default Header;
