import React, { Component } from "react";
import { Affix, Layout, Row, Col, Typography, Button } from "antd";

const { Sider } = Layout;
const { Title, Paragraph } = Typography;

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <div style={styles.content}>
        <Title>Welcome</Title>
        <Paragraph style={styles.subHeading}>
          We just need a few bits of information to set up you profile
        </Paragraph>
        <Button
          type="primary"
          icon="edit"
          size="large"
          shape="round"
          href="/secured/profile/create/step/2"
        >
          Start Profile
        </Button>
      </div>
    );
  }
}

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
