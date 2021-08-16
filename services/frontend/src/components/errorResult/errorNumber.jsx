import { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import ErrorResultView from "./errorResultView";

const ErrorNumber = ({ error }) => {
  const [back, setBack] = useState(false);
  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  return (
    <ErrorResultView
      extra={
        <Button onClick={handleClick} type="primary">
          <HomeOutlined />
          <span>
            <FormattedMessage id="back.to.home" />
          </span>
        </Button>
      }
      status={error}
      subTitle={<FormattedMessage id={`error.${error}.subtitle`} />}
      title={error}
    />
  );
};

ErrorNumber.propTypes = {
  error: PropTypes.string,
};

ErrorNumber.defaultProps = {
  error: "",
};

export default ErrorNumber;
