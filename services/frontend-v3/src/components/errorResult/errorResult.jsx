import React, { useState } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import ErrorResultView from "./errorResultView";

const ErrorResult = ({ errorCode }) => {
  const [back, setBack] = useState(false);

  const handleClick = () => {
    setBack(true);
  };

  const propMap = {
    404: {
      status: "404",
      title: "404",
      subTitle: <FormattedMessage id="error.404.subtitle" />,
      extra: (
        <Button onClick={handleClick} type="primary">
          <FormattedMessage id="error.button" />
        </Button>
      ),
    },
    403: {
      status: "403",
      title: "403",
      subTitle: <FormattedMessage id="error.403.subtitle" />,
      extra: (
        <Button onClick={handleClick} type="primary">
          <FormattedMessage id="error.button" />
        </Button>
      ),
    },
  };

  if (back) {
    return <Redirect to="/" />;
  }
  return <ErrorResultView resultProps={propMap[errorCode]} />;
};

ErrorResult.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorResult;
