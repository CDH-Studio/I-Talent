import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { setIsPrivacyAccepted } from "../../../redux/slices/userSlice";
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
<<<<<<< HEAD
=======

  const { isPrivacyAccepted } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const styles = {
    logo: {
      width: "270px",
      marginTop: "50px",
    },
    text: {
      display: "block",
      margin: "20px 0",
      fontSize: "15px",
    },
    title: {
      display: "block",
      margin: "25px 0 10px 0",
      color: "#404040",
    },
    image: {
      maxWidth: "70%",
      maxHeight: "400px",
      marginTop: "20px",
    },
    imageContainer: {
      textAlign: "center",
    },
  };

  const onLogin = () =>{
    keycloak.login();
    dispatch(setIsPrivacyAccepted(false));
  }

>>>>>>> implement modal in router
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
          <Button type="primary" onClick={keycloak.login} size="large">
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
