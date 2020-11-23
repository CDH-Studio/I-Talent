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
  UserDeleteOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
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
  Popover,
} from "antd";

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import OrgTree from "../orgTree/OrgTree";
import { ProfileInfoPropType } from "../../utils/customPropTypes";
import EditCardButton from "../editCardButton/EditCardButton";
import "./BasicInfoView.less";

const { Text } = Typography;

const BasicInfoView = ({
  data,
  name,
  avatar,
  jobTitle,
  buttonLinks,
  connectionStatus,
  changeConnection,
}) => {
  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = useSelector((state) => state.user.id);

  /* Component Styles */
  const styles = {
    avatar: {
      backgroundColor: "transparent",
      color: "#007471",
      marginRight: "-10px",
    },
    userAvatar: {
      verticalAlign: "middle",
    },
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
      <Row type="flex" className="profileHeaderRow">
        <Col xs={6} md={5} lg={4} xxl={3} align="center">
          <Avatar
            size={80}
            style={(styles.userAvatar, { backgroundColor: avatar.color })}
          >
            <Text style={{ fontSize: "35px", color: "white" }}>
              {avatar.acr}
            </Text>
          </Avatar>
        </Col>
        <Col
          xs={13}
          md={15}
          lg={17}
          xl={16}
          xxl={18}
          style={{ padding: "11px 10px" }}
        >
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
        {urlID === userID ? (
          <Col xs={5} md={4} lg={3} xl={4} xxl={3}>
            <EditCardButton editUrl="/profile/edit/primary-info" floatRight />
          </Col>
        ) : (
          <Col xs={5} md={4} lg={3} xl={4} xxl={3}>
            <Row type="flex" align="middle">
              <Popover
                trigger={["focus", "hover"]}
                content={
                  connectionStatus ? (
                    <div className="popContent">
                      <FormattedMessage id="profile.connections.tooltip.remove.connection" />
                      <a href="/about/help">
                        <FormattedMessage id="footer.contact.link" />
                      </a>
                    </div>
                  ) : (
                    <div className="popContent">
                      <FormattedMessage id="profile.connections.tooltip.add.connection" />
                      <a href="/about/help">
                        <FormattedMessage id="footer.contact.link" />
                      </a>
                    </div>
                  )
                }
              >
                <InfoCircleOutlined tabIndex={0} />
              </Popover>
              <Button
                tabIndex={0}
                type={connectionStatus ? "default" : "primary"}
                shape="circle"
                size="large"
                icon={
                  connectionStatus ? (
                    <UserDeleteOutlined style={styles.buttonIcon} />
                  ) : (
                    <UserAddOutlined style={styles.buttonIcon} />
                  )
                }
                onClick={changeConnection}
                style={{ marginLeft: 10 }}
              />
            </Row>
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
          <Button className="orgButton" type="link">
            <DownOutlined />
            <span className="leftSpacing">{data.branch}</span>
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
        <Button
          block
          type="link"
          target="_blank"
          rel="noopener noreferrer"
          icon={button.icon}
          href={button.url}
        >
          <span>
            <FormattedMessage id={button.textId} />
          </span>
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
      <Row className="rowTopSplitter">
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
  connectionStatus: PropTypes.bool.isRequired,
  changeConnection: PropTypes.func.isRequired,
};

BasicInfoView.defaultProps = {
  jobTitle: null,
};

export default BasicInfoView;
