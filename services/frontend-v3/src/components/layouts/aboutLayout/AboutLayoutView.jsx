import React from "react";
import { Typography, Tabs, Row, Result } from "antd";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";

const { TabPane } = Tabs;
const { Text, Title } = Typography;

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
    textAlign: "center",
  },
};

function callback(key) {
  console.log(key);
}

const AboutLayoutView = () => {
  return (
    <AppLayout displaySideBar={false}>
      <Row justify="center" style={styles.outerRow}>
        <Tabs style={styles.outerTabs} defaultActiveKey="1" onChange={callback}>
          <TabPane
            tabIndex="0"
            tab={<FormattedMessage id="footer.about.link" />}
            key="1"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.about.link" />
            </Title>
          </TabPane>
          <TabPane
            tabIndex="0"
            tab={<FormattedMessage id="footer.terms.and.conditions.link" />}
            key="2"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.terms.and.conditions.link" />
            </Title>
          </TabPane>
          <TabPane
            tabIndex="0"
            tab={<FormattedMessage id="footer.privacy.link" />}
            key="3"
          >
            <Title style={styles.titles}>
              <FormattedMessage id="footer.privacy.link" />
            </Title>
          </TabPane>
        </Tabs>
      </Row>
    </AppLayout>
  );
};

export default AboutLayoutView;
