import React from "react";
import { Result } from "antd";
import PropTypes from "prop-types";

const UnexpectedErrorView = ({ extraContent }) => {
  return (
    <Result
      //status={resultProps.status}
      title="Unexpected Error"
      subTitle="Something when wrong"
      extra={extraContent}
    />
  );
};

UnexpectedErrorView.propTypes = {
  extra: PropTypes.symbol.isRequired,
};

export default UnexpectedErrorView;
