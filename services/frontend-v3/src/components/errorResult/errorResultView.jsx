import React from "react";
import { Result } from "antd";

import PropTypes from "prop-types";

function ErrorResultView({ resultProps }) {
  return (
    <Result
      status={resultProps.status}
      title={resultProps.title}
      subTitle={resultProps.subTitle}
      extra={resultProps.extra}
    />
  );
}

ErrorResultView.propTypes = {
  resultProps: PropTypes.shape({
    status: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    extra: PropTypes.symbol,
  }).isRequired,
};

export default ErrorResultView;
