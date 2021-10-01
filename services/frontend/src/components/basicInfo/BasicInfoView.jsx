import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  ApartmentOutlined,
  DownOutlined,
  EnvironmentOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import OrgTree from "../orgTree/OrgTree";
import ProfileActionRibbon from "../profileActionRibbon/ProfileActionRibbon";

import "./BasicInfoView.less";

const { Text } = Typography;

const BasicInfoView = ({
  data,
  name,
  avatar,
  jobTitle,
  buttonLinks,
  connectionStatus,
}) => {
  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = useSelector((state) => state.user.id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  /*
   * Generate Profile Header
   *
   * Generates basic info card header
   * This includes: avatar, name, position
   */
  const generateProfileHeader = () => (
    <Row className="profileHeaderRow" type="flex">
      <h4 className="visually-hidden">Profile Name</h4>
      <Col
        align="center"
        className="hide-for-print"
        lg={4}
        md={5}
        xs={0}
        xxl={3}
      >
        <Avatar
          className="profileHeaderRow-avatar"
          size={80}
          style={{ backgroundColor: avatar.color }}
        >
          <Text strong>{avatar.acr}</Text>
        </Avatar>
      </Col>
      <Col
        lg={17}
        md={15}
        style={{ padding: "11px 0px" }}
        xl={16}
        xs={18}
        xxl={18}
      >
        <Text
          className="profileHeaderRow-name px-3"
          ellipsis={{ tooltip: name }}
        >
          {name}
        </Text>
        <Text className="profileHeaderRow-job-tile px-3">{jobTitle}</Text>
      </Col>
    </Row>
  );

  /*
   * Generate Info List
   *
   * Generates list of basic info with small icons
   * This includes: address, email, etc.
   */
  const generateInfoList = (dataSource) => (
    <List
      dataSource={dataSource}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar className="info-avatar" icon={item.icon} size={48} />
            }
            description={item.description}
            title={item.title}
          />
        </List.Item>
      )}
    />
  );

  /*
   * Get Contact Info
   *
   * Generates data for contact info list
   * Email, Work Phone, and Work Cell
   */
  const getContactInfo = () => {
    const email = {
      description: data.email ? (
        <Text
          copyable
          ellipsis={{
            tooltip: data.email,
          }}
          id="profile-email"
        >
          {data.email}
        </Text>
      ) : (
        "-"
      ),
      icon: <MailOutlined />,
      title: <FormattedMessage id="email" />,
    };

    const tel = {
      description: data.telephone ? data.telephone : "-",
      icon: <PhoneOutlined />,
      title: <FormattedMessage id="profile.telephone" />,
    };

    const cel = {
      description: data.cellphone ? data.cellphone : "-",
      icon: <MobileOutlined />,
      title: <FormattedMessage id="work.cellphone" />,
    };

    return [email, tel, cel];
  };

  /*
   * Get Work Info
   *
   * Generates data for user's work info
   * Branch, Work Address, and Manager
   */
  const getWorkInfo = () => {
    const branch = {
      description: data.branch ? (
        <>
          <Button className="orgButton" onClick={() => setIsModalVisible(true)}>
            <DownOutlined />
            <span>{data.branch}</span>
          </Button>
          <Modal
            cancelText={<FormattedMessage id="close" />}
            closable={false}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={() => setIsModalVisible(false)}
            title={
              <>
                <ApartmentOutlined />{" "}
                <span>
                  <FormattedMessage id="profile.org.tree" />
                </span>
              </>
            }
            visible={isModalVisible}
          >
            <OrgTree data={data} />
          </Modal>
        </>
      ) : (
        <FormattedMessage id="not.specified" />
      ),
      icon: <ApartmentOutlined />,
      title: <FormattedMessage id="profile.org.tree" />,
    };

    const location = data.officeLocation;
    const address = {
      description: location
        ? `${location.streetNumber} ${location.streetName}, ${location.city}, ${location.province}`
        : "-",
      icon: <EnvironmentOutlined />,
      title: <FormattedMessage id="working.address" />,
    };

    const manager = {
      description: data.manager ? data.manager : "-",
      icon: <UserOutlined />,
      title: <FormattedMessage id="employee.manager" />,
    };

    return [branch, address, manager];
  };

  /*
   * Generate Team Info
   *
   */
  const generateTeamInfo = () => {
    const teams = {
      description:
        data.teams && data.teams.length ? (
          <List>
            {Object.values(data.teams).map((item) => (
              <Tag key={kebabCase(item)} color="#727272">
                {item}
              </Tag>
            ))}
          </List>
        ) : (
          "-"
        ),
      icon: <TeamOutlined />,
      title: <FormattedMessage id="employee.work.unit" />,
    };

    return [teams];
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
          className="hide-for-print"
          href={button.url}
          icon={button.icon}
          rel="noopener noreferrer"
          target="_blank"
          type="link"
        >
          <FormattedMessage id={button.textId} />
        </Button>
      );
    });

    return buttons;
  };

  return (
    <ProfileActionRibbon
      connectionStatus={connectionStatus}
      loggedInUserId={userID}
      userId={urlID}
    >
      <Card actions={generateActions()} id="card-profile-basic-info">
        <h3 className="visually-hidden">
          <FormattedMessage id="primary.contact.information" />
        </h3>
        {generateProfileHeader()}
        <Row>
          <Col lg={12} xs={24}>
            {generateInfoList(getContactInfo())}
          </Col>
          <Col lg={12} xs={24}>
            {generateInfoList(getWorkInfo())}
          </Col>
        </Row>
        <Row className="rowTopSplitter">
          <Col span={24}>{generateInfoList(generateTeamInfo())}</Col>
        </Row>
      </Card>
    </ProfileActionRibbon>
  );
};

BasicInfoView.propTypes = {
  avatar: PropTypes.shape({
    acr: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  buttonLinks: PropTypes.objectOf(PropTypes.any).isRequired,
  connectionStatus: PropTypes.bool.isRequired,
  data: ProfileInfoPropType.isRequired,
  jobTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
};

BasicInfoView.defaultProps = {
  jobTitle: null,
};

export default BasicInfoView;
