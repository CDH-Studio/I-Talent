import React, { useState } from "react";
import { Button, Row, Menu } from "antd";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import Logo from "../assets/myTalentLogoSolo.jpg";
import backgroundImage from "../assets/myTalentLandingBackground.png";
import { injectIntl } from "react-intl";

/** UI for the landing route layout */
function LandingPage(props) {
  //   const propTypes = {
  //     changeLanguage: propTypes.func.isRequired
  //   };
  const { changeLanguage } = props;
  const handleClick = e => {
    console.log("click ", e);
  };

  return (
    <Row>
      <Menu
        style={{ backgroundColor: "#001C1A", width: "100%" }}
        onClick={handleClick}
        fixed="top"
        mode="horizontal"
      >
        <Menu.Item style={{ paddingBottom: "8px", paddingTop: "8px" }}>
          <img src={Logo} style={{ maxWidth: "37px" }} alt="UpSkill Logo" />
        </Menu.Item>
        <Menu.Item
          style={{
            paddingBottom: "6px",
            paddingTop: "8px",
            marginLeft: "86%"
          }}
        >
          <ChangeLanguage changeLanguage={changeLanguage} />
        </Menu.Item>
      </Menu>
      <React.Fragment>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "700px",
            position: "fixed",
            top: "62px",
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
            <Button
              style={{ margin: "0px", paddingTop: "0px", fontSize: "20px" }}
              as="a"
              type="primary"
              href="/secured/home"
              shape="round"
              size="large"
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
