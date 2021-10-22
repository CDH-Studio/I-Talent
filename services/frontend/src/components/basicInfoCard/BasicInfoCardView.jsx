import React, { useMemo, useState } from "react";
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
import { Avatar, Button, Card, Col, List, Modal, Row, Typography } from "antd";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../utils/customPropTypes";
import OrgTree from "../orgTree/OrgTree";
import ProfileActionRibbon from "../profileActionRibbon/ProfileActionRibbon";
import TagList from "../tagList/TagList";

import "./BasicInfoCardView.less";

const { Text } = Typography;

/**
 * Generates basic info card header
 * @param {Object} props - component props
 * @param {Object} props.avatar - Object describing the profile avatar
 * @param {string} props.name - Name of the user
 * @param {string} props.jobTitle-  Job title of the user
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const ProfileHeader = ({ avatar, name, jobTitle }) => (
  <Row className="profileHeaderRow" type="flex">
    <h4 className="visually-hidden">
      <FormattedMessage id="profile.name" />
    </h4>
    <Col align="center" className="hide-for-print" lg={4} md={5} xs={0} xxl={3}>
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
      <Text className="profileHeaderRow-name px-3" ellipsis={{ tooltip: name }}>
        {name}
      </Text>
      <Text className="profileHeaderRow-job-tile px-3">{jobTitle}</Text>
    </Col>
  </Row>
);
/* eslint-enable react/prop-types */

/**
 * Generates list of basic info with small icons
 * @param {Object} props - component props
 * @param {Object[]} props.listOfInfo list of info
 * @param {React.ReactElement} props.listOfInfo[].avatar list of info
 * @param {React.ReactElement} props.listOfInfo[].description list of info
 * @param {React.ReactElement} props.listOfInfo[].icon list of info
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const InfoList = ({ listOfInfo = [] }) => (
  <List
    dataSource={listOfInfo}
    itemLayout="horizontal"
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar className="info-avatar" icon={item.icon} size={48} />}
          description={item.description}
          title={item.title}
        />
      </List.Item>
    )}
  />
);
/* eslint-enable react/prop-types */

/**
 * Generates list of basic info with small icons
 * @param {Object} props - component props
 * @param {Object[]} props.listOfInfo list of info
 * @param {React.ReactElement} props.listOfInfo[].avatar list of info
 * @param {React.ReactElement} props.listOfInfo[].description list of info
 * @param {React.ReactElement} props.listOfInfo[].icon list of info
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const OrgTreeButton = ({ branch = "", organizations = [] }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Button className="orgButton" onClick={() => setIsModalVisible(true)}>
        <DownOutlined aria-hidden="true" />
        <span>{branch}</span>
      </Button>
      <Modal
        cancelText={<FormattedMessage id="close" />}
        closable={false}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => setIsModalVisible(false)}
        title={
          <>
            <ApartmentOutlined aria-hidden="true" />
            <span>
              <FormattedMessage id="profile.org.tree" />
            </span>
          </>
        }
        visible={isModalVisible}
      >
        <OrgTree organizations={organizations} />
      </Modal>
    </>
  );
};
/* eslint-enable react/prop-types */

/**
 * Generates the list of actions at bottom of info card
 * This includes links to: email, linkedin, and github
 * @param {Object[]} buttonLinks list of info
 * @param {React.ReactElement} buttonLinks[].icon list of info
 * @param {string} buttonLinks[].ulr list of info
 * @returns {React.ReactElement[]} - Array of contact info buttons
 */
/* eslint-enable react/prop-types */
const getActionButtons = (buttonsList = []) =>
  Object.keys(buttonsList).map((key) => {
    const button = buttonsList[key];
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
/* eslint-disable react/prop-types */

/**
 * Generates data for contact info list
 * Email, Work Phone, and Work Cell
 * @param {Object} profileData - profile information
 * @param {string} profileData.email - profile email
 * @param {string} profileData.telephone - profile landline number
 * @param {string} profileData.cellphone - profile cellphone number
 * @returns {Array<{description: React.ReactElement, icon: React.ReactElement, title: React.ReactElement}>} - Array of contact info
 */
const getContactInfo = (profileData) => {
  const email = {
    description: profileData.email ? (
      <Text
        copyable
        ellipsis={{
          tooltip: profileData.email,
        }}
        id="profile-email"
      >
        {profileData.email}
      </Text>
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <MailOutlined aria-hidden="true" />,
    title: <FormattedMessage id="email" />,
  };

  const tel = {
    description: profileData.telephone ? (
      profileData.telephone
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <PhoneOutlined aria-hidden="true" />,
    title: <FormattedMessage id="profile.telephone" />,
  };

  const cel = {
    description: profileData.cellphone ? (
      profileData.cellphone
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <MobileOutlined aria-hidden="true" />,
    title: <FormattedMessage id="work.cellphone" />,
  };

  return [email, tel, cel];
};

/**
 * Generates data for user's work info
 * Branch, Work Address, and Manager
 * @param {Object} profileData - profile information
 * @param {string} profileData.branch - profile branch info
 * @param {Object[]} profileData.organizations - profile branch info
 * @param {Object} profileData.officeLocation - profile cellphone number
 * @param {string} profileData.manager - profile branch info
 * @returns {Array<{description: React.ReactElement, icon: React.ReactElement, title: React.ReactElement}>} - Array of work info
 */
const getWorkInfo = (profileData) => {
  const branch = {
    description: profileData.branch ? (
      <OrgTreeButton
        branch={profileData.branch}
        organizations={profileData.organizations}
      />
    ) : (
      <FormattedMessage id="not.specified" />
    ),
    icon: <ApartmentOutlined aria-hidden="true" />,
    title: <FormattedMessage id="profile.org.tree" />,
  };

  const location = profileData.officeLocation;
  const address = {
    description: location ? (
      `${location.streetNumber} ${location.streetName}, ${location.city}, ${location.province}`
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <EnvironmentOutlined aria-hidden="true" />,
    title: <FormattedMessage id="working.address" />,
  };

  const manager = {
    description: profileData.manager ? (
      profileData.manager
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <UserOutlined aria-hidden="true" />,
    title: <FormattedMessage id="employee.manager" />,
  };

  return [branch, address, manager];
};

/**
 * Generate Team Info
 * @param {Array<{key: string, label: string}>} teamsAndProjects - formatted list of team names
 * @returns {Array<{description: React.ReactElement, icon: React.ReactElement, title: React.ReactElement}>} - Array of contact info
 */
const getTeamInfo = (teamsAndProjects) => [
  {
    description: teamsAndProjects ? (
      <TagList data={teamsAndProjects} tagStyle="secondary" />
    ) : (
      <FormattedMessage id="not.provided" />
    ),
    icon: <TeamOutlined aria-hidden="true" />,
    title: <FormattedMessage id="employee.work.unit" />,
  },
];

const BasicInfoCardView = ({
  data,
  name,
  avatar,
  jobTitle,
  buttonLinks,
  connectionStatus,
  teamsAndProjects,
}) => {
  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = useSelector((state) => state.user.id);

  const actionButtons = useMemo(
    () => getActionButtons(buttonLinks),
    [buttonLinks]
  );
  const contactInfo = useMemo(() => getContactInfo(data), [data]);
  const workInfo = useMemo(() => getWorkInfo(data), [data]);
  const teamInfo = useMemo(
    () => getTeamInfo(teamsAndProjects),
    [teamsAndProjects]
  );

  return (
    <ProfileActionRibbon
      connectionStatus={connectionStatus}
      loggedInUserId={userID}
      userId={urlID}
    >
      <Card actions={actionButtons} id="card-profile-basic-info">
        <h3 className="visually-hidden">
          <FormattedMessage id="primary.contact.information" />
        </h3>
        <ProfileHeader avatar={avatar} jobTitle={jobTitle} name={name} />
        <Row>
          <Col lg={12} xs={24}>
            <InfoList listOfInfo={contactInfo} />
          </Col>
          <Col lg={12} xs={24}>
            <InfoList listOfInfo={workInfo} />
          </Col>
        </Row>
        <Row className="rowTopSplitter">
          <Col span={24}>
            <InfoList listOfInfo={teamInfo} />
          </Col>
        </Row>
      </Card>
    </ProfileActionRibbon>
  );
};

BasicInfoCardView.propTypes = {
  avatar: PropTypes.shape({
    acr: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  buttonLinks: PropTypes.objectOf(PropTypes.any).isRequired,
  connectionStatus: PropTypes.bool.isRequired,
  data: ProfileInfoPropType.isRequired,
  jobTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
  teamsAndProjects: PropTypes.arrayOf(
    PropTypes.shape({
      categoryId: PropTypes.string,
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

BasicInfoCardView.defaultProps = {
  jobTitle: null,
};

export default BasicInfoCardView;
