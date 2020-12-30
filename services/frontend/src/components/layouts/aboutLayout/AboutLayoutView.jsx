import { useState } from "react";
import { Typography, Tabs, Row, Result, Button } from "antd";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { SettingTwoTone } from "@ant-design/icons";
import PropTypes from "prop-types";
import AppLayout from "../appLayout/AppLayout";
import "./AboutLayoutView.less";

const { TabPane } = Tabs;
const { Title } = Typography;

/**
 *  AboutLayoutView(props)
 *
 *  this component renders the about page.
 */
const AboutLayoutView = ({ type }) => {
  const tabType = type;
  const [back, setBack] = useState(false);

  const handleClick = () => {
    setBack(true);
  };

  if (back) {
    return <Redirect to="/" />;
  }

  const tabPaneSetting = (key, nameId) => (
    <TabPane tab={<FormattedMessage id={nameId} />} key={key}>
      <Title className="titles">
        <FormattedMessage id={nameId} />
      </Title>
      <Result
        icon={<SettingTwoTone twoToneColor="#1C807B" />}
        title={<FormattedMessage id="more.content.soon" />}
        extra={
          <Button onClick={handleClick} type="primary">
            <FormattedMessage id="back.to.home" />
          </Button>
        }
      />
    </TabPane>
  );

  return (
    <AppLayout displaySideBar={false}>
      <Row justify="center" className="outerRow">
        <Tabs className="outerTabs" defaultActiveKey={tabType}>
          {tabPaneSetting("help", "footer.contact.link")}
          {tabPaneSetting("terms", "footer.terms.and.conditions.link")}
          {tabPaneSetting("privacy", "footer.privacy.link")}
        </Tabs>
      </Row>
    </AppLayout>
  );
};

AboutLayoutView.propTypes = {
  type: PropTypes.oneOf(["about", "help", "privacy", "terms"]).isRequired,
};

export default AboutLayoutView;
