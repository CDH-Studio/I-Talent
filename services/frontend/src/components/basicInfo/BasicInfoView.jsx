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

  /*
   * Generate Profile Header
   *
   * Generates basic info card header
   * This includes: avatar, name, position
   */
  const generateProfileHeader = () => (
    <Row type="flex" className="profileHeaderRow">
      <Col
        xs={0}
        md={5}
        lg={4}
        xxl={3}
        align="center"
        className="hide-for-print"
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
        xs={18}
        md={15}
        lg={17}
        xl={16}
        xxl={18}
        style={{ padding: "11px 0px" }}
      >
        <Text
          className="profileHeaderRow-name"
          strong
          ellipsis={{ tooltip: name }}
        >
          {name}
        </Text>
        <Text className="profileHeaderRow-job-tile">{jobTitle}</Text>
      </Col>
      {urlID === userID ? (
        <Col xs={5} md={4} lg={3} xl={4} xxl={3} className="hide-for-print">
          <EditCardButton editUrl="/profile/edit/primary-info" floatRight />
        </Col>
      ) : (
        <Col xs={5} md={4} lg={3} xl={4} xxl={3} className="hide-for-print">
          <Row type="flex" align="middle">
            <Popover
              trigger={["focus", "hover"]}
              content={
                connectionStatus ? (
                  <div className="popContent">
                    <FormattedMessage id="connections.tooltip.remove.connection" />
                    <a href="/about/help">
                      <FormattedMessage id="footer.contact.link" />
                    </a>
                  </div>
                ) : (
                  <div className="popContent">
                    <FormattedMessage id="connections.tooltip.add.connection" />
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
                connectionStatus ? <UserDeleteOutlined /> : <UserAddOutlined />
              }
              onClick={changeConnection}
              style={{ marginLeft: 10 }}
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
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar className="info-avatar" size={48} icon={item.icon} />
            }
            title={item.title}
            description={item.description}
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
          id="profile-email"
          copyable
          ellipsis={{
            tooltip: data.email,
          }}
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
      icon: <BranchesOutlined />,
      title: <FormattedMessage id="profile.org.tree" />,
      description: data.branch ? (
        <Dropdown
          overlay={
            <Menu className="orgDropdown">
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
          className="hide-for-print"
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
