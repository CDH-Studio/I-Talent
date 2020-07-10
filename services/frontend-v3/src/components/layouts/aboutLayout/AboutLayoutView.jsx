import React, { useState } from "react";
import { Typography, Tabs, Row, Result, Button } from "antd";
import { useHistory, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { SettingTwoTone } from "@ant-design/icons";
import AppLayout from "../appLayout/AppLayout";

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

const AboutLayoutView = () => {
  function callback(key, history) {
    if (key === "1") {
      history.push("/about/");
    }
    if (key === "2") {
      history.push("/about/terms");
    }
    if (key === "3") {
      history.push("/about/privacy");
    }
  }
  const [back, setBack] = useState(false);

  const handleClick = () => {
    setBack(true);
  };

  const history = useHistory();

  if (back) {
    return <Redirect to="/secured/home" />;
  }

  return (
    <AppLayout displaySideBar={false}>
      <Row justify="center" style={styles.outerRow}>
        <Tabs
          style={styles.outerTabs}
          defaultActiveKey="1"
          onChange={callback(history)}
        >
          <TabPane
            tabIndex="0"
            tab={<FormattedMessage id="footer.about.link" />}
            key="1"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.about.link" />
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
            tabIndex="0"
            tab={<FormattedMessage id="footer.terms.and.conditions.link" />}
            key="2"
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
            tabIndex="0"
            tab={<FormattedMessage id="footer.privacy.link" />}
            key="3"
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

export default AboutLayoutView;
