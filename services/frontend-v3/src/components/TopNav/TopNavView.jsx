import React, { Component } from "react";
import {
  Affix,
  Layout,
  Row,
  Col,
  Divider,
  Dropdown,
  Menu,
  Icon,
  Avatar
} from "antd";
import ChangeLanguage from "../changeLanguage/ChangeLanguage";

const { SubMenu } = Menu;

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
          <div style={{ float: "right", margin: "0 20px" }}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <a
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
                style={{ color: "#000" }}
              >
                <Avatar
                  style={{
                    verticalAlign: "middle",
                    marginRight: "10px"
                  }}
                  size="large"
                >
                  AN
                </Avatar>
                Ali Nouri <Icon type="down" />
              </a>
            </Dropdown>
            <Divider
              type="vertical"
              style={{
                margin: "0 10px"
              }}
            />
            <ChangeLanguage changeLanguage={this.props.changeLanguage} />
          </div>
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
