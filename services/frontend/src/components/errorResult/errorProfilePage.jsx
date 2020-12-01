import { useState } from "react";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
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
      status="404"
      title={<FormattedMessage id={titleId} />}
      subTitle={<FormattedMessage id={subtitleId} />}
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
              <FormattedMessage id="setup.done.view.profile" />
            </span>
          </Button>
        </>
      }
    />
  );
};

ErrorProfilePage.propTypes = {
  titleId: PropTypes.string,
  subtitleId: PropTypes.string,
};

ErrorProfilePage.defaultProps = {
  titleId: "",
  subtitleId: "",
};


export default ErrorProfilePage;
