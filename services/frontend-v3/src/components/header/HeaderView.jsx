import React from "react";
import PropTypes from "prop-types";
import { PageHeader } from "antd";

const HeaderView = ({ title, extra }) => (
  <PageHeader
    style={{ padding: "0 0 15px 7px" }}
    title={<span style={{ color: "#192e2f" }}>{title}</span>}
    extra={extra}
  />
);

HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
};

export default HeaderView;
