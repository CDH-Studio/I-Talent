import React, { useState } from "react";
import { Button, Row, Menu } from "antd";
import ChangeLanguage from "../components/changeLanguage/ChangeLanguage";
import Logo from "../assets/myTalentLogoSolo.jpg";
import LandingLayout from "../components/layouts/landingLayout/LandingLayout";
import backgroundImage from "../assets/myTalentLandingBackground.png";
import { injectIntl } from "react-intl";

/** UI for the landing route layout */
function LandingPage(props) {
  const { changeLanguage } = props;
  const handleClick = (e) => {
    console.log("click ", e);
  };

  return (
    <LandingLayout changeLanguage={props.changeLanguage} />
    // <Row>
    //   <Menu
    //     style={styles.menuStyle}
    //     onClick={handleClick}
    //     fixed="top"
    //     mode="horizontal"
    //   >
    //     <Menu.Item style={styles.logoStyle}>
    //       <img src={Logo} style={styles.imgStyle} alt="UpSkill Logo" />
    //     </Menu.Item>
    //     <Menu.Item style={styles.bttnStyle}>
    //       <ChangeLanguage changeLanguage={changeLanguage} />
    //     </Menu.Item>
    //   </Menu>
    //   <React.Fragment>
    //     <div style={styles.backgroundStyle}>
    //       <div style={styles.mainMessage}>
    //         {props.intl.formatMessage({
    //           id: "landing.welcome",
    //           defaultMessage: "Welcome to I-Talent",
    //         })}
    //       </div>
    //       <div style={styles.signIn}>
    //         <Button
    //           style={{ margin: "0px", paddingTop: "0px", fontSize: "20px" }}
    //           as="a"
    //           type="primary"
    //           href="/secured/home"
    //           shape="round"
    //           size="large"
    //         >
    //           {props.intl.formatMessage({
    //             id: "landing.login.button",
    //             defaultMessage: "Login",
    //           })}
    //         </Button>
    //       </div>
    //     </div>
    //   </React.Fragment>
    // </Row>
  );
}
const styles = {
  menuStyle: {
    backgroundColor: "#001C1A",
    width: "100%",
  },
  logoStyle: {
    paddingBottom: "8px",
    paddingTop: "8px",
  },
  imgStyle: { maxWidth: "37px" },
  bttnStyle: {
    paddingBottom: "6px",
    paddingTop: "8px",
    float: "right",
  },
  backgroundStyle: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    position: "fixed",
    top: "62px",
    width: "100%",
  },
  mainMessage: {
    color: "#EFEEEE",
    fontSize: "52pt",
    margin: "250px auto 0px",
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
  },
  signIn: {
    width: "100%",
    textAlign: "center",
  },
};
export default injectIntl(LandingPage);
