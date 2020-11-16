import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography, Button } from "antd";
import { LockFilled, UnlockFilled } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import AppLayout from "../appLayout/AppLayout";
import "./LandingLayoutView.less";

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
      <Row className="landing-container" justify="center">
        <h1 className="hidden">
          <FormattedMessage id="landing.login.and.enter" />
        </h1>
        <Row
          align="middle"
          justify="center"
          className="landing-content"
          gutter={24}
        >
          <Col xs={20} sm={15} md={14} xl={16} className="landing-picture">
            <img src={backgroundImage} alt="I-Talent Landing" />
          </Col>
          <Col xs={24} sm={24} md={10} xl={8}>
            <Title level={1} className="landing-title">
              <FormattedMessage id="landing.welcome" />
            </Title>
            <Text className="landing-text">
              <FormattedMessage id="landing.description" />
            </Text>
            <Text className="landing-text" strong>
              <FormattedMessage id="landing.call.to.action" />
            </Text>
            <Button
              type="primary"
              onClick={() => keycloak.login()}
              size="large"
              className="landing-sign-in-button"
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              icon={hover ? <UnlockFilled /> : <LockFilled />}
            >
              <span>
                <strong>
                  <FormattedMessage id="landing.login.button" />
                </strong>
              </span>
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
