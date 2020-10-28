import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";
import { LockFilled, UnlockFilled } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import AppLayout from "../appLayout/AppLayout";
import logo from "../../../assets/I-talent-logo-light.png";
import "./LandingLayoutView.scss";

const { Text, Title } = Typography;

/**
 *  LandingLayoutView(props)
 *
 *  this component renders the landing page.
 */
const LandingLayoutView = ({ backgroundImage }) => {
  const { keycloak } = useKeycloak();
  const [hover, setHover] = useState(false);

  /**
   * Toggle hover State
   *
   */
  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <AppLayout displaySideBar={false} displaySearch={false}>
      <Row style={{ height: "100%" }} justify="center">
        <h1 className="hidden">
          <FormattedMessage id="landing.login.and.enter" />
        </h1>
        <Row
          align="middle"
          justify="center"
          className="pageContent"
          gutter={24}
        >
          <Col xs={24} sm={20} md={14} xl={16} className="landingPicture">
            <img src={backgroundImage} alt="I-Talent Logo" />
          </Col>
          <Col xs={24} sm={24} md={10} xl={8} className="landingDescription">
            <Title level={1} className="title">
              <FormattedMessage id="landing.welcome" />
            </Title>
            <Text className="text">
              <FormattedMessage id="landing.description" />
            </Text>
            <Text className="text" strong>
              <FormattedMessage id="landing.call.to.action" />
            </Text>
            <Button
              type="primary"
              onClick={() => keycloak.login()}
              size="large"
              className="signInButton"
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              icon={hover ? <UnlockFilled /> : <LockFilled />}
            >
              <strong>
                <FormattedMessage id="landing.login.button" />
              </strong>
            </Button>
          </Col>
        </Row>
      </Row>
    </AppLayout>
  );
};

LandingLayoutView.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
};

export default LandingLayoutView;
