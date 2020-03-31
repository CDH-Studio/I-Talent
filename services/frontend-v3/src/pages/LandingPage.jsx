import React, { useState } from "react";
import { Button, Row, Menu } from "antd";

import backgroundImage from "../assets/myTalentLandingBackground.png";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { injectIntl } from "react-intl";

const { SubMenu } = Menu;
/** UI for the landing route layout */
function LandingPage(props) {
  const handleClick = e => {
    console.log("click ", e);
  };

  return (
    <Row>
      <Menu onClick={handleClick} mode="horizontal">
        <Menu.Item key="mail">
          <MailOutlined />
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <AppstoreOutlined />
          Navigation Two
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <SettingOutlined />
              Navigation Three - Submenu
            </span>
          }
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a
            href="https://ant.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
      <React.Fragment>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "655px",
            position: "fixed",
            top: "0px",
            width: "100%"
          }}
        >
          <div
            style={{
              color: "#EFEEEE",
              fontSize: "52pt",
              margin: "250px auto 0px",
              textAlign: "center",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            {props.intl.formatMessage({
              id: "landing.welcome",
              defaultMessage: "Welcome to MyTalent"
            })}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center"
            }}
          >
            <div
              style={{
                color: "#ffffff",
                fontSize: "20pt",
                marginBottom: "24pt",
                marginTop: "18pt"
              }}
            ></div>
            <Button
              as="a"
              href="/secured/home"
              inverted
              style={{
                margin: "0 auto"
              }}
            >
              {props.intl.formatMessage({
                id: "landing.login.button",
                defaultMessage: "Login"
              })}
            </Button>
          </div>
        </div>
      </React.Fragment>
    </Row>
  );
}
export default injectIntl(LandingPage);
