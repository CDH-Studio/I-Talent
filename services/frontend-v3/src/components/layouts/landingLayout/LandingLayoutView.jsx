import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import backgroundOptionOne from "../../../assets/landing-1.svg";
import backgroundOptionTwo from "../../../assets/landing-2.svg";
import backgroundOptionThree from "../../../assets/landing-3.svg";
import logo from "../../../assets/MyTalent-Logo-Full-v2-dark.svg";

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

  return (
    <AppLayout displaySideBar={false} displaySearch={false} displayLogo={false}>
      <h1 className="hidden" Landing Page>
        <FormattedMessage id="landing.login.and.enter" />
      </h1>
      <Row justify="center" style={{ marginTop: "120px" }}>
        <Col xs={22} md={10} lg={6} style={{ baddingTop: "60px" }}>
          <img
            src={logo}
            alt="I-Talent Logo"
            style={{ width: "250px", marginTop: "30px" }}
          />
          <Title
            level={1}
            style={{
              display: "block",
              margin: "25px 0 10px 0",
              color: "#404040",
            }}
          >
            <FormattedMessage id="landing.welcome" />
          </Title>
          <Text
            style={{ display: "block", margin: "20px 0", fontSize: "15px" }}
            strong
          >
            <FormattedMessage id="landing.description" />
          </Text>
          <Text
            style={{ display: "block", margin: "20px 0", fontSize: "15px" }}
            strong
          >
            <FormattedMessage id="landing.call.to.action" />
          </Text>
          <Button type="primary" href="/secured/home" size="large">
            <FormattedMessage id="landing.login.button" />
          </Button>
        </Col>
        <Col
          sm={24}
          md={10}
          style={{ textAlign: "center" }}
          className="landingPicture"
        >
          <img
            src={randomPictureSelect()}
            alt="I-Talent Logo"
            style={{ maxWidth: "70%", maxHeight: "400px", marginTop: "20px" }}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default LandingLayoutView;
