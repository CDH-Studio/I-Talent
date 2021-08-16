import "./LandingLayoutView.less";

import { LockFilled, UnlockFilled } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import AppLayout from "../appLayout/AppLayout";

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
    <AppLayout displaySearch={false} displaySideBar={false}>
      <Row className="landing-container" justify="center">
        <h1 className="hidden">
          <FormattedMessage id="sign.in" />
        </h1>
        <Row
          align="middle"
          className="landing-content"
          gutter={24}
          justify="center"
        >
          <Col className="landing-picture" md={14} sm={15} xl={16} xs={20}>
            <img alt="I-Talent Landing" src={backgroundImage} />
          </Col>
          <Col md={10} sm={24} xl={8} xs={24}>
            <Title className="landing-title" level={1}>
              <FormattedMessage id="welcome" />
            </Title>
            <Text className="landing-text">
              <FormattedMessage id="italent.web.app.description" />
            </Text>
            <Text className="landing-text" strong>
              <FormattedMessage id="landing.call.to.action" />
            </Text>
            <Button
              className="landing-sign-in-button"
              icon={hover ? <UnlockFilled /> : <LockFilled />}
              onClick={() => keycloak.login()}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              size="large"
              type="primary"
            >
              <span>
                <strong>
                  <FormattedMessage id="sign.in" />
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
