import React from "react";
import PropTypes from "prop-types";
import { PageHeader } from "antd";
import "./HeaderView.scss";

const HeaderView = ({ title, extra }) => (
  <PageHeader
    className="pageHeader"
    title={<span className="pageHeaderSpan">{title}</span>}
    extra={extra}
  />
);

HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
};

export default HeaderView;
