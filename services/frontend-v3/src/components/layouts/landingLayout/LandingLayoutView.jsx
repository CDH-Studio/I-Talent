import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { useKeycloak } from "@react-keycloak/web";
import AppLayout from "../appLayout/AppLayout";
import backgroundOptionOne from "../../../assets/landing-1.svg";
import backgroundOptionTwo from "../../../assets/landing-2.svg";
import backgroundOptionThree from "../../../assets/landing-3.svg";
import logo from "../../../assets/I-talent-logo.png";
import "./LandingLayoutView.scss";

const { Text, Title } = Typography;

/**
 *  LandingLayoutView(props)
 *
 *  this component renders the landing page.
 */
const LandingLayoutView = () => {
  /**
   * Random Picture Select
   *
   * select a random picture for landing page
   */
  const randomPictureSelect = () => {
    const imageOptions = [
      backgroundOptionOne,
      backgroundOptionTwo,
      backgroundOptionThree,
    ];
    const randomIndex = Math.floor(Math.random() * imageOptions.length);
    return imageOptions[randomIndex];
  };

  const { keycloak } = useKeycloak();

  return (
    <AppLayout displaySideBar={false} displaySearch={false} displayLogo={false}>
      <h1 className="hidden">
        <FormattedMessage id="landing.login.and.enter" />
      </h1>
      <Row justify="center" style={{ marginTop: "120px" }}>
        <Col xs={22} md={10} lg={6} style={{ paddingTop: "60px" }}>
          <img src={logo} alt="I-Talent Logo" className="logo" />
          <Title level={1} className="title">
            <FormattedMessage id="landing.welcome" />
          </Title>
          <Text className="text" strong>
            <FormattedMessage id="landing.description" />
          </Text>
          <Text className="text" strong>
            <FormattedMessage id="landing.call.to.action" />
          </Text>
          <Button type="primary" onClick={() => keycloak.login()} size="large">
            <FormattedMessage id="landing.login.button" />
          </Button>
        </Col>
        <Col sm={24} md={10} className="landingPicture imageContainer">
          <img
            src={randomPictureSelect()}
            alt="I-Talent Logo"
            className="image"
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default LandingLayoutView;
