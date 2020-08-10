import React, { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined } from "@ant-design/icons";
import ErrorResultView from "./errorResultView";

const Error403 = () => {
  const [back, setBack] = useState(false);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  return (
    <ErrorResultView
      resultProps={{
        status: "403",
        title: "403",
        subTitle: <FormattedMessage id="error.403.subtitle" />,
        extra: (
          <Button onClick={handleClick} type="primary">
            <HomeOutlined style={{ marginRight: 10 }} />
            <FormattedMessage id="error.button" />
          </Button>
        ),
      }}
    />
  );
};

export default Error403;
