import React from "react";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import backgroundImage from "../../assets/myTalentLandingBackground.png";
import LandingNavBarController from "./landingNavBar/landingNavBarController";

/** UI for the landing route layout */
const LandingLayoutView = ({ changeLanguage }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "655px",
          position: "fixed",
          top: "0px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "52pt",
            margin: "250px auto 0px",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Welcome to I-Talent
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: "20pt",
              marginBottom: "24pt",
              marginTop: "18pt",
            }}
          />
          <Button
            as="a"
            href="/secured/home"
            inverted
            style={{
              margin: "0 auto",
              zIndex: "9",
              backgroundColor: "#427c9e",
            }}
          >
            <FormattedMessage id="landing.login.button" />
          </Button>
        </div>
      </div>

      <div style={{ paddingTop: "0px" }}>
        <LandingNavBarController changeLanguage={changeLanguage} />
      </div>
    </>
  );
};

LandingLayoutView.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default LandingLayoutView;
