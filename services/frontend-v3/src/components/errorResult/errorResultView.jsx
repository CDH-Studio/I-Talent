import React from "react";
import { Result } from "antd";
import PropTypes from "prop-types";

const ErrorResultView = ({ resultProps }) => (
  <Result
    status={resultProps.status}
    title={resultProps.title}
    subTitle={resultProps.subTitle}
    extra={resultProps.extra}
  />
);

ErrorResultView.propTypes = {
  resultProps: PropTypes.shape({
    status: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    extra: PropTypes.node,
  }).isRequired,
};

export default ErrorResultView;
