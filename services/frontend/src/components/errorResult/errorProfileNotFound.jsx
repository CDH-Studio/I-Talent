import React, { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import ErrorResultView from "./errorResultView";

const ErrorProfileNotFound = () => {
  const [back, setBack] = useState(false);
  const [profile, setProfile] = useState(false);
  const { id } = useSelector((state) => state.user);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  if (profile) {
    return <Redirect to={`/profile/${id}`} />;
  }

  return (
    <ErrorResultView
      status="404"
      title={<FormattedMessage id="profile.not.found" />}
      subTitle={<FormattedMessage id="profile.not.found.description" />}
      extra={(
        <>
          <Button onClick={handleClick} type="primary">
            <HomeOutlined />
            <span>
              <FormattedMessage id="error.button" />
            </span>
          </Button>
          <Button onClick={() => setProfile(true)}>
            <UserOutlined />
            <span>
              <FormattedMessage id="setup.done.view.profile" />
            </span>
          </Button>
        </>
      )}
    />
  );
};

export default ErrorProfileNotFound;
