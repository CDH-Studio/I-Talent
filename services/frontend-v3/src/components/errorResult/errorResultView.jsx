import React from "react";
import { Result } from "antd";
import PropTypes from "prop-types";

const ErrorResultView = ({ resultProps }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Result
        status={resultProps.status}
        title={resultProps.title}
        subTitle={resultProps.subTitle}
        extra={resultProps.extra}
      />
    </div>
  );
};

ErrorResultView.propTypes = {
  resultProps: PropTypes.shape({
    status: PropTypes.string,
    title: PropTypes.node,
    subTitle: PropTypes.node,
    extra: PropTypes.node,
  }).isRequired,
};

export default ErrorResultView;
