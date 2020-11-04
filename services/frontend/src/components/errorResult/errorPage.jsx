import React, { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined } from "@ant-design/icons";
import ErrorResultView from "./errorResultView";

const ErrorPage = (error) => {
  const [back, setBack] = useState(false);
  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  return (
    <ErrorResultView
      status={error}
      title={error}
      subTitle={<FormattedMessage id={`error.${error}.subtitle`} />}
      extra={
        <Button onClick={handleClick} type="primary">
          <HomeOutlined />
          <span>
            <FormattedMessage id="error.button" />
          </span>
        </Button>
      }
    />
  );
};

export default ErrorPage;
