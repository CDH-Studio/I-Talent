import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Divider, Typography } from "antd";

import AppLayout from "../components/layouts/appLayout/AppLayout";

const AboutPage = () => {
  const intl = useIntl();
  const { Title, Text } = Typography;

  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "about.page.title" })} | I-Talent`;
  }, [intl]);

  return (
    <AppLayout displaySearch={false} displaySideBar={false}>
      <Title level={2}>
        <FormattedMessage id="about.page.title" />
      </Title>
      <Divider />
      <Title level={3}>
        <FormattedMessage id="about.page.mission.title" />
      </Title>
      <Text>
        <FormattedMessage id="about.page.mission" />
      </Text>
      <Title level={3}>
        <FormattedMessage id="about.page.vision.title" />
      </Title>
      <Text>
        <FormattedMessage id="about.page.vision" />
      </Text>
      <Title level={3}>
        <FormattedMessage id="about.page.basics.title" />
      </Title>
      <Text>
        <FormattedMessage id="about.page.basics" />
      </Text>
    </AppLayout>
  );
};

export default AboutPage;
