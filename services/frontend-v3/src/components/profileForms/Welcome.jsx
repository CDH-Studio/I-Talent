import React, { Component } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd";
const { Title, Paragraph } = Typography;

function Welcome() {
  /* Component Styles */
  const styles = {
    content: {
      textAlign: "center",
      width: "100%",
      minHeight: "400px",
      background: "#fff",
      padding: "100px 10px"
    },
    subHeading: {
      fontSize: "1.3em"
    }
  };
  return (
    <div style={styles.content}>
      <Title>Welcome</Title>
      <Paragraph style={styles.subHeading}>
        We just need a few bits of information to set up your profile
      </Paragraph>
      <Button
        type="primary"
        icon={<EditOutlined />}
        size="large"
        href="/secured/profile/create/step/2"
      >
        Start Profile
      </Button>
    </div>
  );
}

export default Welcome;
