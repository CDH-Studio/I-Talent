import React, { Component } from "react";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import backgroundImage from "../../assets/myTalentLandingBackground.png";
import LandingNavBarController from "./landingNavBar/landingNavBarController";

/** UI for the landing route layout */
export default class LandingLayoutView extends Component {
  render() {
    const { changeLanguage } = this.props;

    return (
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
              color: "#ffffff",
              fontSize: "52pt",
              margin: "250px auto 0px",
              textAlign: "center",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            Welcome to MyTalent
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
                margin: "0 auto",
                zIndex: "9",
                backgroundColor: "#427c9e"
              }}
            >
              <FormattedMessage id="landing.login.button" />
            </Button>
          </div>
        </div>

        <div style={{ paddingTop: "0px" }}>
          <LandingNavBarController changeLanguage={changeLanguage} />
        </div>
      </React.Fragment>
    );
  }
}
