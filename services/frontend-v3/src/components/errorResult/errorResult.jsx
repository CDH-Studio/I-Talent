import React, { useState } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import ErrorResultView from "./errorResultView";
import AppLayout from "../layouts/appLayout/AppLayout";

const ErrorResult = ({ errorCode }) => {
  const [back, setBack] = useState(false);
  const [profile, setProfile] = useState(false);
  const { id } = useSelector((state) => state.user);

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
          <HomeOutlined style={{ marginRight: 10 }} />
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
          <HomeOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="error.button" />
        </Button>
      ),
    },
    profileNotExist: {
      status: "403",
      title: <FormattedMessage id="profile.not.found" />,
      subTitle: <FormattedMessage id="profile.not.found.description" />,
      extra: (
        <>
          <Button onClick={handleClick} type="primary">
            <HomeOutlined style={{ marginRight: 10 }} />
            <FormattedMessage id="error.button" />
          </Button>
          <Button onClick={() => setProfile(true)}>
            <UserOutlined style={{ marginRight: 10 }} />
            <FormattedMessage id="setup.done.view.profile" />
          </Button>
        </>
      ),
    },
  };

  if (back) {
    return <Redirect to="/" />;
  }

  if (profile) {
    return <Redirect to={`/profile/${id}`} />;
  }

  return (
    <AppLayout>
      <ErrorResultView resultProps={propMap[errorCode]} />
    </AppLayout>
  );
};

ErrorResult.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default ErrorResult;
