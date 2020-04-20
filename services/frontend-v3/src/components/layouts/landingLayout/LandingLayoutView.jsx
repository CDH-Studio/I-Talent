import React from "react";
import AppLayout from "../appLayout/AppLayout";
import { Row, Col, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import backgroundOptionOne from "../../../assets/landing-1.svg";
import backgroundOptionTwo from "../../../assets/landing-2.svg";
import backgroundOptionThree from "../../../assets/landing-3.svg";

const { Text, Title } = Typography;

const LandingLayoutView = (props) => {
  const randomPictureSelect = () => {
    const imageOptions = [
      backgroundOptionOne,
      backgroundOptionTwo,
      backgroundOptionThree,
    ];
    let randomIndex = Math.floor(Math.random() * imageOptions.length);
    return imageOptions[randomIndex];
  };

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={false}
    >
      <Row justify="center" style={{ marginTop: "150px" }}>
        <Col xs={22} md={10} lg={6} style={{ baddingTop: "60px" }}>
          <img
            src={require("../../../assets/MyTalent-Logo-Full-v2-dark.svg")}
            alt="Logo"
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
            Welcome
          </Title>
          <Text
            style={{ display: "block", margin: "20px 0", fontSize: "15px" }}
            strong
          >
            I-Talent is a platform to showcase your skills and talent within
            ISED! Connect with other talented individuals to learn and grow
            together.
          </Text>
          <Text
            style={{ display: "block", margin: "20px 0", fontSize: "15px" }}
            strong
          >
            Connect with other talented individuals to learn and grow together.
          </Text>
          <Button type="primary" href={"/secured/home"} size={"large"}>
            <FormattedMessage id="landing.login.button" />
          </Button>
        </Col>
        <Col
          sm={24}
          md={10}
          style={{ textAlign: "center" }}
          className={"landingPicture"}
        >
          <img
            src={randomPictureSelect()}
            alt="Logo"
            style={{ maxWidth: "70%", maxHeight: "400px", marginTop: "20px" }}
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export default LandingLayoutView;
