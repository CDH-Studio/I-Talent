import "./BasicInfoView.less";

import {
  ApartmentOutlined,
  DownOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MobileOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  // Dropdown,
  Avatar,
  Button,
  Card,
  Col,
  List,
  Modal,
  Popover,
  Row,
  // Menu,
  Tag,
  Typography,
} from "antd";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import config from "../../utils/runtimeConfig";
import EditCardButton from "../editCardButton/EditCardButton";
import OrgTree from "../orgTree/OrgTree";

const { Text, Title } = Typography;

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
  const locale = useSelector((state) => state.settings.locale);
  const { drupalSite } = config;
  const [isModalVisible, setIsModalVisible] = useState(false);

  /*
   * Generate Profile Header
   *
   * Generates basic info card header
   * This includes: avatar, name, position
   */
  const generateProfileHeader = () => (
    <Row className="profileHeaderRow" type="flex">
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
        <Title className="profileHeaderRow-name" ellipsis={{ tooltip: name }}>
          {name}
        </Title>
        <Text className="profileHeaderRow-job-tile">{jobTitle}</Text>
      </Col>
      {urlID === userID ? (
        <Col className="hide-for-print" lg={3} md={4} xl={4} xs={5} xxl={3}>
          <EditCardButton editUrl="/profile/edit/primary-info" floatRight />
        </Col>
      ) : (
        <Col className="hide-for-print" lg={3} md={4} xl={4} xs={5} xxl={3}>
          <Row align="middle" type="flex">
            <Popover
              content={
                connectionStatus ? (
                  <div className="popContent">
                    <FormattedMessage id="connections.tooltip.remove.connection" />
                    <a
                      className="link"
                      href={`${drupalSite}${
                        locale === "ENGLISH" ? "en" : "fr"
                      }help`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FormattedMessage id="footer.contact.link" />
                    </a>
                  </div>
                ) : (
                  <div className="popContent">
                    <FormattedMessage id="connections.tooltip.add.connection" />
                    <a
                      className="link"
                      href={`${drupalSite}${
                        locale === "ENGLISH" ? "en" : "fr"
                      }help`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <FormattedMessage id="footer.contact.link" />
                    </a>
                  </div>
                )
              }
              trigger={["focus", "hover"]}
            >
              <InfoCircleOutlined tabIndex={0} />
            </Popover>
            <Button
              icon={
                connectionStatus ? <UserDeleteOutlined /> : <UserAddOutlined />
              }
              onClick={changeConnection}
              shape="circle"
              size="large"
              style={{ marginLeft: 10 }}
              tabIndex={0}
              type={connectionStatus ? "default" : "primary"}
            />
          </Row>
        </Col>
      )}
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
      icon: <MailOutlined />,
      title: <FormattedMessage id="email" />,
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
    };

    const tel = {
      icon: <PhoneOutlined />,
      title: <FormattedMessage id="profile.telephone" />,
      description: data.telephone ? data.telephone : "-",
    };

    const cel = {
      icon: <MobileOutlined />,
      title: <FormattedMessage id="work.cellphone" />,
      description: data.cellphone ? data.cellphone : "-",
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
      icon: <ApartmentOutlined />,
      title: <FormattedMessage id="profile.org.tree" />,
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
    };

    const location = data.officeLocation;
    const address = {
      icon: <EnvironmentOutlined />,
      title: <FormattedMessage id="working.address" />,
      description: location
        ? `${location.streetNumber} ${location.streetName}, ${location.city}, ${location.province}`
        : "-",
    };

    const manager = {
      icon: <UserOutlined />,
      title: <FormattedMessage id="employee.manager" />,
      description: data.manager ? data.manager : "-",
    };

    return [branch, address, manager];
  };

  /*
   * Generate Team Info
   *
   */
  const generateTeamInfo = () => {
    const teams = {
      icon: <TeamOutlined />,
      title: <FormattedMessage id="employee.work.unit" />,
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
    <Card actions={generateActions()} id="card-profile-basic-info">
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
