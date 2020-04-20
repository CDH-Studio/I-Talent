import React from "react";
import AppLayout from "../appLayout/AppLayout";
import { Row, Col } from "antd";

const LandingLayoutView = (props) => {
  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={false}
    >
      <Row justify="center" class={{ minHeight: "100vh" }}>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>
    </AppLayout>
  );
};

export default LandingLayoutView;
