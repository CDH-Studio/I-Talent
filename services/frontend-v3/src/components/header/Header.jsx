import React from "react";
import PropTypes from "prop-types";
import HeaderView from "./HeaderView";

const Header = ({ title, extra }) => <HeaderView title={title} extra={extra} />;

Header.propTypes = {
  title: PropTypes.node.isRequired,
  extra: PropTypes.node,
};

Header.defaultProps = {
  extra: undefined,
};

export default Header;
