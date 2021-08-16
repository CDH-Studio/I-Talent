import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ErrorResultView from "./errorResultView";

const ErrorProfilePage = ({ titleId, subtitleId }) => {
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
      extra={
        <>
          <Button onClick={handleClick} type="primary">
            <HomeOutlined />
            <span>
              <FormattedMessage id="back.to.home" />
            </span>
          </Button>
          <Button onClick={() => setProfile(true)}>
            <UserOutlined />
            <span>
              <FormattedMessage id="view.profile" />
            </span>
          </Button>
        </>
      }
      status="404"
      subTitle={<FormattedMessage id={subtitleId} />}
      title={<FormattedMessage id={titleId} />}
    />
  );
};

ErrorProfilePage.propTypes = {
  subtitleId: PropTypes.string,
  titleId: PropTypes.string,
};

ErrorProfilePage.defaultProps = {
  subtitleId: "",
  titleId: "",
};

export default ErrorProfilePage;
