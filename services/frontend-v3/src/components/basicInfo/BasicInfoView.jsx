import React from "react";
import { FormattedMessage } from "react-intl";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import {
  MailOutlined,
  PhoneOutlined,
  MobileOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  Dropdown,
  Avatar,
  List,
  Typography,
  Button,
  Menu,
} from "antd";
import { ProfileInfoPropType } from "../../customPropTypes";
import OrgTree from "../orgTree/OrgTree";

const { Text } = Typography;

const BasicInfoView = ({ data, name, avatar, jobTitle, buttonLinks }) => {
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
    leftSpacing: {
      paddingLeft: "0.5em",
    },
  };

  /*
   * Generate Profile Header
   *
   * Generates basic info card header
   * This includes: avatar, name, position
   */
  const generateProfileHeader = () => {
    return (
      <Row type="flex" style={styles.profileHeaderRow}>
        <Col xs={12} md={5} lg={4} xxl={3} align="center">
          <Avatar
            size={80}
            style={(styles.userAvatar, { backgroundColor: avatar.color })}
          >
            <Text style={{ fontSize: "35px", color: "white" }}>
              {avatar.acr}
            </Text>
          </Avatar>
        </Col>
        <Col xs={12} md={19} lg={20} xxl={21} style={{ padding: "11px 10px" }}>
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

  /*
   * Generate Info List
   *
   * Generates list of basic info with mall icons
   * This includes: address, email, etc.
   */
  const generateInfoList = (dataSource) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar style={styles.avatar} size={48} icon={item.icon} />
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    );
  };

  /*
   * Get Contact Info
   *
   * Generates data for contact info list
   */
  const getContactInfo = () => {
    const email = {
      icon: <MailOutlined />,
      title: <FormattedMessage id="profile.email" />,
      description: data.email ? (
        data.email
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const tel = {
      icon: <PhoneOutlined />,
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? (
        data.telephone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const cel = {
      icon: <MobileOutlined />,
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone ? (
        data.cellphone
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [email, tel, cel];
  };

  /*
   * Get Location Info
   *
   * Generates data for user's location
   */
  const getLocationInfo = () => {
    const branch = {
      icon: <BranchesOutlined />,
      title: <FormattedMessage id="profile.org.tree" />,
      description: data.branch ? (
        <Dropdown overlay={<OrgTree data={data} />} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <DownOutlined />
            <span style={styles.leftSpacing}>{data.branch}</span>
          </a>
        </Dropdown>
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const location = data.officeLocation;
    const address = {
      icon: <EnvironmentOutlined />,
      title: <FormattedMessage id="profile.address" />,
      description: location ? (
        `${location.streetNumber} ${location.streetName}, ${location.city}, ${location.province}`
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const manager = {
      icon: <UserOutlined />,
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager ? (
        data.manager
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    return [branch, address, manager];
  };

  /*
   * Generate Actions
   *
   * Generates the list of actions at bottom of info card
   * This includes links to: email, linkedin, and github
   */
  const generateActions = () => {
    const buttons = buttonLinks.buttons.map((buttonName) => {
      const button = buttonLinks[buttonName];

      return (
        <Button
          block
          type="link"
          icon={
            <LegacyIcon type={button.icon} style={{ marginRight: "3px" }} />
          }
          href={button.url}
        >
          <FormattedMessage id={button.textId} />
        </Button>
      );
    });

    return buttons;
  };

  return (
    <Card
      id="card-profile-basic-info"
      actions={generateActions()}
      style={styles.card}
    >
      {generateProfileHeader()}
      <Row>
        <Col xs={24} lg={12}>
          {generateInfoList(getContactInfo())}
        </Col>
        <Col xs={24} lg={12}>
          {generateInfoList(getLocationInfo())}
        </Col>
      </Row>
    </Card>
  );
};

BasicInfoView.propTypes = {
  data: ProfileInfoPropType.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.shape({
    acr: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  jobTitle: PropTypes.string,
  buttonLinks: PropTypes.objectOf(PropTypes.any).isRequired,
};

BasicInfoView.defaultProps = {
  jobTitle: null,
};

export default BasicInfoView;
