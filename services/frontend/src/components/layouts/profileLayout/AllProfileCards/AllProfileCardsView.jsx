import React from "react";
import { FormattedMessage } from "react-intl";
import {
  RiseOutlined,
  TagsTwoTone,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import PropTypes from "prop-types";

import { ProfileInfoPropType } from "../../../../utils/customPropTypes";
import {
  AboutMeCard,
  BasicInfoCard,
  CompetenciesCard,
  ConnectionsCard,
  EducationCard,
  EmploymentEquityCard,
  EmploymentStatusCard,
  ExFeederCard,
  ExperienceCard,
  JobMobilityCard,
  LearningDevelopmentCard,
  MentorshipCard,
  OfficialLanguageCard,
  QualifiedPools,
  SkillsCard,
  TalentManagementCard,
} from "../../../profileCards";

import "./AllProfileCardsView.less";

const { Title } = Typography;

const AllProfileCardsView = ({
  isConnection,
  isOwnersProfile,
  profileData,
}) => (
  <Row className="print" gutter={[15, 15]}>
    <h2 className="visually-hidden">
      <FormattedMessage id="basic.employee.information" />
    </h2>
    {/* Summary */}
    <Col xl={14} xs={24}>
      <BasicInfoCard connectionStatus={isConnection} data={profileData} />
    </Col>
    <Col xl={10} xs={24}>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <EmploymentStatusCard
            data={profileData}
            editableCardBool={isOwnersProfile}
          />
        </Col>
        <Col span={24}>
          <EmploymentEquityCard
            data={profileData}
            editableCardBool={isOwnersProfile}
          />
        </Col>
      </Row>
    </Col>

    <Col span={24}>
      <AboutMeCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col span={24}>
      <OfficialLanguageCard
        data={profileData}
        editableCardBool={isOwnersProfile}
      />
    </Col>

    {/** ********** Skills and competencies *********** */}
    <Title
      className="sectionHeader hide-for-print"
      id="divider-skills-and-comp"
      level={2}
    >
      <TagsTwoTone
        aria-hidden="true"
        className="sectionIcon"
        twoToneColor="#3CBAB3"
      />
      <FormattedMessage id="skills.and.competencies" />
    </Title>
    <Col span={24}>
      <SkillsCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col span={24}>
      <MentorshipCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col span={24}>
      <CompetenciesCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>

    {/** ********** Qualifications *********** */}
    <Title
      className="sectionHeader hide-for-print"
      id="divider-qualifications"
      level={2}
    >
      <TrophyOutlined
        aria-hidden="true"
        className="sectionIcon"
        twoToneColor="#3CBAB3"
      />
      <FormattedMessage id="employee.qualifications" />
    </Title>
    <Col span={24}>
      <EducationCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col span={24}>
      <ExperienceCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>

    {/** ********** Personal Growth *********** */}
    <Title
      className="sectionHeader hide-for-print"
      id="divider-employee-growth"
      level={2}
    >
      <RiseOutlined
        aria-hidden="true"
        className="sectionIcon"
        twoToneColor="#3CBAB3"
      />
      <FormattedMessage id="employee.growth.interests" />
    </Title>
    <Col span={24}>
      <LearningDevelopmentCard
        data={profileData}
        editableCardBool={isOwnersProfile}
      />
    </Col>
    <Col span={24}>
      <QualifiedPools data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col xl={12} xs={24}>
      <TalentManagementCard
        data={profileData}
        editableCardBool={isOwnersProfile}
      />
    </Col>
    <Col xl={12} xs={24}>
      <JobMobilityCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>
    <Col span={24}>
      <ExFeederCard data={profileData} editableCardBool={isOwnersProfile} />
    </Col>

    {/** ********** Connections *********** */}
    {isOwnersProfile && (
      <>
        <Title
          className="sectionHeader hide-for-print"
          id="divider-privateGroup"
          level={2}
        >
          <TeamOutlined
            aria-hidden="true"
            className="sectionIcon"
            twoToneColor="#3CBAB3"
          />
          <FormattedMessage id="connections" />
        </Title>
        <Col className="hide-for-print" span={24}>
          <ConnectionsCard data={profileData} />
        </Col>
      </>
    )}
  </Row>
);

AllProfileCardsView.propTypes = {
  isConnection: PropTypes.bool,
  isOwnersProfile: PropTypes.bool,
  profileData: ProfileInfoPropType.isRequired,
};

AllProfileCardsView.defaultProps = {
  isConnection: false,
  isOwnersProfile: false,
};

export default AllProfileCardsView;
