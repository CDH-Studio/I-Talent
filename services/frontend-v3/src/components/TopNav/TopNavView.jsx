import React, { Component } from "react";
import { Affix, Layout, Row, Col, Divider, Dropdown, Menu, Icon } from "antd";
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
              <ChangeLanguage changeLanguage={this.props.changeLanguage} />{" "}
              <Divider type="vertical" />
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={e => e.preventDefault()}
                >
                  Hover me <Icon type="down" />
                </a>
              </Dropdown>
              ,
            </Col>
          </Row>
        </Header>
      </Affix>
    );
  }
}

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);
