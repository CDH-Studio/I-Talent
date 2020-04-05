import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import {
  Row,
  Col,
  Card,
  Avatar,
  List,
  Typography,
  Button,
  Divider,
} from "antd";
const { Title, Text } = Typography;

function BasicInfoView(props) {
  /* Component Styles */
  const styles = {
    profileHeaderRow: {
      margin: "25px 0",
    },
    card: {
      borderTopColor: "#007471",
      borderTopWidth: "5px",
    },
    avatar: {
      backgroundColor: "#fff",
      color: "#007471",
      marginRight: "-10px",
    },
    userAvatar: {
      verticalAlign: "middle",
    },
  };

  const generateProfileHeader = (name, jobTitle, avatar) => {
    return (
      <Row type="flex" style={styles.profileHeaderRow}>
        <Col xs={24} xl={3} align="center">
          <Avatar
            size={80}
            style={(styles.userAvatar, { backgroundColor: avatar.color })}
          >
            <Text style={{ fontSize: "35px", color: "white" }}>
              {avatar.acr}
            </Text>
          </Avatar>
        </Col>
        <Col xs={24} xl={21} style={{ padding: "11px 10px" }}>
          <Text
            strong
            style={{ display: "block", fontSize: "30px", lineHeight: "38px" }}
          >
            {name}
          </Text>
          <Text
            type="secondary"
            style={{ display: "block", fontSize: "16px", lineHeight: "28px" }}
          >
            {jobTitle}
          </Text>
        </Col>
      </Row>
    );
  };

  const generateInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={styles.avatar}
                  size={48}
                  icon={<LegacyIcon type={item.icon} />}
                />
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };

  const getContactInfo = (dataSource) => {
    const data = dataSource.data;

    const email = {
      icon: "mail",
      title: <FormattedMessage id="profile.email" />,
      description: data.email ? (
        data.email
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const tel = {
      icon: "phone",
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? (
        data.telephone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const cel = {
      icon: "mobile",
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone ? (
        data.cellphone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [email, tel, cel];
  };

  const getLocationInfo = (dataSource) => {
    const locale = dataSource.locale;
    const data = dataSource.data;

    const branch = {
      icon: "branches",
      title: <FormattedMessage id="profile.branch" />,
      description: data.branch && data.branch[locale],
    };

    const address = {
      icon: "environment",
      title: <FormattedMessage id="profile.address" />,
      description: data.location ? (
        data.location.description[locale]
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const manager = {
      icon: "user",
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager ? (
        data.manager
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [branch, address, manager];
  };

  const generateActions = (dataSource) => {
    const buttonLinks = dataSource.buttonLinks;
    const buttons = buttonLinks.buttons.map((buttonName) => {
      const button = buttonLinks[buttonName];

      return (
        <Button
          block
          type="link"
          icon={<LegacyIcon type={button.icon} />}
          href={button.url}
        >
          {dataSource.intl.formatMessage({ id: button.textId })}
        </Button>
      );
    });

    return buttons;
  };

  const contactInfo = getContactInfo(props);

  const locationInfo = getLocationInfo(props);

  return (
    <Card
      id="card-profile-basic-info"
      actions={generateActions(props)}
      style={styles.card}
    >
      {generateProfileHeader(props.name, props.jobTitle, props.avatar)}
      <Row>
        <Col xs={24} lg={12}>
          {generateInfoList(contactInfo)}
        </Col>
        <Col xs={24} lg={12}>
          {generateInfoList(locationInfo)}
        </Col>
      </Row>
    </Card>
  );
}

export default injectIntl(BasicInfoView);
