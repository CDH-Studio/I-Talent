import React, { useState } from "react";
import { Typography, Tabs, Row, Result, Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { SettingTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";
import AppLayout from "../appLayout/AppLayout";
import AboutLayout from "./AboutLayout";

const { TabPane } = Tabs;
const { Title } = Typography;

/**
 *  AboutLayoutView(props)
 *
 *  this component renders the about page.
 */

const styles = {
  outerRow: { marginTop: "20px" },
  outerTabs: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: "20px",
    height: "90%",
  },
  titles: {
    paddingTop: "20px",
    textAlign: "center",
  },
};

// // this function checks the end of the URL for either about, privacy, or terms, to determine what
// // the default tab will be on the about page

// function checkURL() {
//   const urlSections = window.location.toString().split("/");
//   const endURL = urlSections[urlSections.length - 1];

//   if (endURL === "about") {
//     numTab = "1";
//   }
//   if (endURL === "help") {
//     numTab = "2";
//   }
//   if (endURL === "terms") {
//     numTab = "3";
//   }
//   if (endURL === "privacy") {
//     numTab = "4";
//   }

//   return numTab;
// }

const AboutLayoutView = (type) => {
  const [back, setBack] = useState(false);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/secured/home" />;
  }

  return (
    <AppLayout displaySideBar={false}>
      <Row justify="center" style={styles.outerRow}>
        <Tabs style={styles.outerTabs} defaultActiveKey={type}>
          <TabPane
            tab={<FormattedMessage id="footer.about.link" />}
            key="about"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.about" />
            </Title>
            <Result
              icon={<SettingTwoTone twoToneColor="#1C807B" />}
              title={<FormattedMessage id="more.content.soon" />}
              extra={
                <Button onClick={handleClick} type="primary">
                  <FormattedMessage id="error.button" />
                </Button>
              }
            />
          </TabPane>
          <TabPane
            tab={<FormattedMessage id="footer.contact.link" />}
            key="help"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.contact.link" />
            </Title>
            <Result
              icon={<SettingTwoTone twoToneColor="#1C807B" />}
              title={<FormattedMessage id="more.content.soon" />}
              extra={
                <Button onClick={handleClick} type="primary">
                  <FormattedMessage id="error.button" />
                </Button>
              }
            />
          </TabPane>
          <TabPane
            tab={<FormattedMessage id="footer.terms.and.conditions.link" />}
            key="terms"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.terms.and.conditions.link" />
            </Title>
            <Result
              icon={<SettingTwoTone twoToneColor="#1C807B" />}
              title={<FormattedMessage id="more.content.soon" />}
              extra={
                <Button onClick={handleClick} type="primary">
                  <FormattedMessage id="error.button" />
                </Button>
              }
            />
          </TabPane>
          <TabPane
            tab={<FormattedMessage id="footer.privacy.link" />}
            key="privacy"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.privacy.link" />
            </Title>
            <Result
              icon={<SettingTwoTone twoToneColor="#1C807B" />}
              title={<FormattedMessage id="more.content.soon" />}
              extra={
                <Button onClick={handleClick} type="primary">
                  <FormattedMessage id="error.button" />
                </Button>
              }
            />
          </TabPane>
        </Tabs>
      </Row>
    </AppLayout>
  );
};

AboutLayoutView.propTypes = {
  type: PropTypes.oneOf(["about", "help", "privacy", "terms"]).isRequired,
};

export default AboutLayoutView;
