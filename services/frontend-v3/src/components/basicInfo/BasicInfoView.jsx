import React from "react";
import { FormattedMessage } from "react-intl";
import {
  MailOutlined,
  PhoneOutlined,
  MobileOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
  UserOutlined,
  DownOutlined,
  TeamOutlined,
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
  Tag,
} from "antd";

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import OrgTree from "../orgTree/OrgTree";
import { ProfileInfoPropType } from "../../customPropTypes";
import EditCardButton from "../editCardButton/EditCardButton";

const { Text } = Typography;

const BasicInfoView = ({ data, name, avatar, jobTitle, buttonLinks }) => {
  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = useSelector((state) => state.user.id);

  /* Component Styles */
  const styles = {
    profileHeaderRow: {
      margin: "25px 0",
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
      whiteSpace: "normal",
    },
    orgButton: {
      marginBottom: 0,
      padding: 0,
      height: "100%",
    },
    rowTopSplitter: { borderTop: "1px solid #f0f0f0" },
  };

  const generateTeamInfo = () => {
    const teams = {
      icon: <TeamOutlined />,
      title: <FormattedMessage id="profile.teams" />,
      description:
        data.teams && data.teams.length ? (
          <List>
            {Object.values(data.teams).map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tag color="#727272" key={index}>
                {item}
              </Tag>
            ))}
          </List>
        ) : (
          "-"
        ),
    };

    return [teams];
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
        <Col xs={11} md={18} lg={19} xxl={20} style={{ padding: "11px 10px" }}>
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
        {urlID === userID && (
          <Col xs={1}>
            <EditCardButton editUrl="/secured/profile/edit/primary-info" />
          </Col>
        )}
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
      description: data.email ? data.email : "-",
    };

    const tel = {
      icon: <PhoneOutlined />,
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? data.telephone : "-",
    };

    const cel = {
      icon: <MobileOutlined />,
      title: <FormattedMessage id="profile.cellphone" />,
      description: data.cellphone ? data.cellphone : "-",
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
        <Dropdown
          overlay={
            <Menu>
              <OrgTree data={data} />
            </Menu>
          }
          trigger={["click"]}
        >
          <Button style={styles.orgButton} type="link">
            <DownOutlined />
            <span style={styles.leftSpacing}>{data.branch}</span>
          </Button>
        </Dropdown>
      ) : (
        <FormattedMessage id="profile.not.specified" />
      ),
    };

    const location = data.officeLocation;
    const address = {
      icon: <EnvironmentOutlined />,
      title: <FormattedMessage id="profile.address" />,
      description: location
        ? `${location.streetNumber} ${location.streetName}, ${location.city}, ${location.province}`
        : "-",
    };

    const manager = {
      icon: <UserOutlined />,
      title: <FormattedMessage id="profile.manager" />,
      description: data.manager ? data.manager : "-",
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
    const buttons = Object.keys(buttonLinks).map((key) => {
      const button = buttonLinks[key];

      return (
        <Button block type="link" icon={button.icon} href={button.url}>
          <FormattedMessage id={button.textId} />
        </Button>
      );
    });

    return buttons;
  };

  return (
    <Card id="card-profile-basic-info" actions={generateActions()}>
      {generateProfileHeader()}
      <Row>
        <Col xs={24} lg={12}>
          {generateInfoList(getContactInfo())}
        </Col>
        <Col xs={24} lg={12}>
          {generateInfoList(getLocationInfo())}
        </Col>
      </Row>
      <Row style={styles.rowTopSplitter}>
        <Col span={24}>{generateInfoList(generateTeamInfo())}</Col>
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
