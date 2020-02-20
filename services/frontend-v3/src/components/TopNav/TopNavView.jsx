import React, { Component } from "react";
import { Affix, Layout, Row, Col } from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";

const { Header } = Layout;

export default class TopNavView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Affix offsetTop={this.state.top}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Row>
            <Col span={5} offset={19}>
              <ChangeLanguage changeLanguage={this.props.changeLanguage} />
            </Col>
          </Row>
        </Header>
      </Affix>
    );
  }
}
