import React from "react";
import { Result } from "antd";
import PropTypes from "prop-types";
import AppLayout from "../layouts/appLayout/AppLayout";

const ErrorResultView = ({ resultProps }) => (
  <AppLayout displaySearch={false}>
    <Result
      status={resultProps.status}
      title={resultProps.title}
      subTitle={resultProps.subTitle}
      extra={resultProps.extra}
    />
  </AppLayout>
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
