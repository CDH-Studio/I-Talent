import React, { Component } from "react";
import { Image, Card, Grid, Icon, Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import LandingNavBarController from "./landingNavBar/landingNavBarController";

import backgroundImage from "../../assets/homeBackground.jpg";
import cdhLogo from "../../assets/cdhlogo.png";

import "./landingLayout.css";

/** UI for the landing route layout */
export default class LandingLayoutController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired
  };

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
            Welcome to UpSkill
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
            >
              <FormattedMessage id="landing.slogan" />
            </div>
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
        <Grid style={{ position: "absolute", top: "650px" }}>
          <Grid.Row className="bg-light-gray" style={{ padding: "75px 0px" }}>
            <div style={{ textAlign: "center", width: "100%" }}>
              <h1>
                <FormattedMessage id="landing.benefits" />
              </h1>
            </div>
            <Card.Group itemsPerRow={3} style={{ padding: "0 50px" }}>
              <Card>
                <Card.Header
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <FormattedMessage id="landing.benefit.find.people" />
                </Card.Header>
                <Card.Content>
                  <FormattedMessage id="landing.benefit.find.people.content" />
                </Card.Content>
              </Card>
              <Card>
                <Card.Header
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <FormattedMessage id="landing.benefit.wherever.whenever" />
                </Card.Header>
                <Card.Content>
                  <FormattedMessage id="landing.benefit.wherever.whenever.content" />
                </Card.Content>
              </Card>
              <Card>
                <Card.Header
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  <FormattedMessage id="landing.benefit.find.expertise" />
                </Card.Header>
                <Card.Content>
                  <FormattedMessage id="landing.benefit.find.expertise.content" />
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Row>
          <Grid.Row className="bg-white" style={{ padding: "75px 35px" }}>
            <div style={{ textAlign: "center" }}>
              <h1>
                <FormattedMessage id="landing.features" />
              </h1>
              <Grid>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <h4>
                      <FormattedMessage id="landing.feature.assisted.profile.generation" />
                    </h4>
                    <text>
                      <FormattedMessage id="landing.feature.assisted.profile.generation.content" />
                    </text>
                  </Grid.Column>
                  <Grid.Column>
                    <h4>
                      <FormattedMessage id="landing.feature.skill.tracking" />
                    </h4>
                    <text>
                      <FormattedMessage id="landing.feature.skill.tracking.content" />
                    </text>
                  </Grid.Column>
                  <Grid.Column>
                    <h4>
                      <FormattedMessage id="landing.feature.dynamic.search" />
                    </h4>
                    <text>
                      <FormattedMessage id="landing.feature.dynamic.search.content" />
                    </text>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Grid.Row>
          <Grid.Row
            className="contactSection"
            style={{
              padding: "75px",
              textAlign: "center",
              width: "100%"
            }}
          >
            <p
              style={{
                fontSize: "32pt",
                textAlign: "center !important",
                width: "100%"
              }}
            >
              <FormattedMessage id="landing.contact.us" />
            </p>

            <Grid style={{ width: "100%" }}>
              <Grid.Row columns={2}>
                <Grid.Column style={{ textAlign: "center" }}>
                  <Image
                    src={cdhLogo}
                    style={{
                      display: "inline-block",
                      margin: "0 auto !important"
                    }}
                    size="small"
                  />
                </Grid.Column>
                <Grid.Column>
                  <span
                    style={{
                      fontSize: "20pt",
                      margin: "0 auto",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <Icon name="envelope" />
                    <a
                      color="#ffffff"
                      href="mailto:cdhstudio@canada.ca"
                      style={{ color: "#ffffff" }}
                    >
                      cdhstudio@canada.ca
                    </a>
                  </span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Row>
          <Grid.Row className="bg-white">
            <Grid columns={3} style={{ textAlign: "center" }}>
              <Grid.Row>
                <Grid.Column>
                  <FormattedMessage id="landing.copyright" />
                </Grid.Column>
                <Grid.Column>
                  <Button
                    color="blue"
                    href="https://github.com/CDH-Studio/UpSkill"
                    style={{ margin: "0 auto" }}
                  >
                    <Icon name="github" style={{ margin: "0px" }} />
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <a href="file:///C:/Users/Trevor/Documents/UpSkill/docs/index.html#">
                    <FormattedMessage id="landing.privacy.policy" />
                  </a>
                  <span style={{ padding: "0 5px" }}>|</span>
                  <a href="file:///C:/Users/Trevor/Documents/UpSkill/docs/index.html#">
                    <FormattedMessage id="landing.terms.of.use" />
                  </a>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
