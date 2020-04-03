import React from "react";
import { FormattedMessage } from "react-intl";

import { Icon as LegacyIcon } from "@ant-design/compatible";

import { Row, Col, Card, Avatar, List, Typography, Button } from "antd";
const { Title, Text } = Typography;

function BasicInfoView(props) {
  /* Component Styles */
  const styles = {
    row: {
      marginBottom: "30px"
    },
    card: {
      height: "100%"
    },
    avatar: {
      backgroundColor: "#007471"
    },
    userAvatar: {
      verticalAlign: "middle"
    }
  };

  const generateProfileHeader = (name, jobTitle, avatar) => {
    return (
      <Row type="flex" justify="center" align="middle" style={styles.row}>
        <Col xs={24} xl={6}>
          <Avatar
            size={150}
            style={(styles.userAvatar, { backgroundColor: avatar.color })}
          >
            <Text style={{ fontSize: "80px", color: "white" }}>
              {avatar.acr}
            </Text>
          </Avatar>
        </Col>
        <Col xs={24} xl={18}>
          <Row>
            <Title>{name}</Title>
          </Row>
          <Row>
            <Title level={2} type="secondary">
              {jobTitle}
            </Title>
          </Row>
        </Col>
      </Row>
    );
  };

  const generateInfoList = dataSource => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={styles.avatar}
                  size="large"
                  icon={<LegacyIcon type={item.icon} />}
                  shape="square"
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

  const getContactInfo = dataSource => {
    const data = dataSource.data;

    const email = {
      icon: "mail",
      title: <FormattedMessage id="profile.email" />,
      description: data.email ? (
        data.email
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const tel = {
      icon: "phone",
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? (
        data.telephone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const cel = {
      icon: "mobile",
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone ? (
        data.cellphone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [email, tel, cel];
  };

  const getLocationInfo = dataSource => {
    const locale = dataSource.locale;
    const data = dataSource.data;

    const branch = {
      icon: "branches",
      title: <FormattedMessage id="profile.branch" />,
      description: data.branch && data.branch[locale]
    };

    const address = {
      icon: "environment",
      title: <FormattedMessage id="profile.address" />,
      description: data.location ? (
        data.location.description[locale]
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    const manager = {
      icon: "user",
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager ? (
        data.manager
      ) : (
        <FormattedMessage id="profile.not.specified" />
      )
    };

    return [branch, address, manager];
  };

  const generateActions = dataSource => {
    const buttonLinks = dataSource.buttonLinks;
    const buttons = buttonLinks.buttons.map(buttonName => {
      const button = buttonLinks[buttonName];

      return (
        <Button
          block
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
      <Row style={styles.row}></Row>
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

export default BasicInfoView;
