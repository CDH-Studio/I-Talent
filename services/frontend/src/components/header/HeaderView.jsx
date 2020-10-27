import React from "react";
import PropTypes from "prop-types";
import { PageHeader } from "antd";
import "./HeaderView.scss";

const HeaderView = ({ title, subtitle, extra }) => (
  <PageHeader
    className="pageHeader"
    title={title}
    extra={extra}
    subTitle={subtitle}
  />
);

HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
};

export default HeaderView;
