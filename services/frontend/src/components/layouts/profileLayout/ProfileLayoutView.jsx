import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import {
  PrinterOutlined,
  RiseOutlined,
  TagsTwoTone,
  TeamOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  Anchor,
  Button,
  Col,
  notification,
  Row,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import AboutMeCard from "../../aboutMeCard/AboutMeCard";
import BasicInfoCard from "../../basicInfoCard/BasicInfoCard";
import CompetenciesCard from "../../competenciesCard/CompetenciesCard";
import ConnectionsCard from "../../connectionsCard/ConnectionsCard";
import EducationCard from "../../educationCard/EducationCard";
import EmploymentEquity from "../../employmentEquity/EmploymentEquity";
import EmploymentStatus from "../../employmentStatus/EmploymentStatus";
import ErrorProfilePage from "../../errorResult/errorProfilePage";
import ExFeederCard from "../../exFeederCard/ExFeederCard";
import ExperienceCard from "../../experienceCard/ExperienceCard";
import Header from "../../header/Header";
import JobMobilityCard from "../../jobMobilityCard/JobMobilityCard";
import LearningDevelopmentCard from "../../learningDevelopmentCard/LearningDevelopmentCard";
import MentorshipCard from "../../mentorshipCard/MentorshipCard";
import OfficialLanguageCard from "../../officialLanguageCard/OfficialLanguageCard";
import ProfileVisibilityAlert from "../../profileVisibilityAlert/ProfileVisibilityAlert";
import QualifiedPools from "../../qualifiedPools/QualifiedPools";
import SkillsCard from "../../skillsCard/SkillsCard";
import TalentManagementCard from "../../talentManagementCard/TalentManagementCard";
import AppLayout from "../appLayout/AppLayout";

import "./ProfileLayoutView.less";

const { Link } = Anchor;
const { Title, Text } = Typography;

const ProfileLayoutView = ({
  data,
  connectionStatus,
  isUsersProfile,
  loading,
  savedFormContent,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedFormContent === false) {
      notification.error({
        message: intl.formatMessage({ id: "edit.save.error" }),
      });
    } else if (savedFormContent === true) {
      notification.success({
        message: intl.formatMessage({ id: "edit.save.success" }),
      });
    }

    dispatch(setSavedFormContent(undefined));
  }, [savedFormContent, dispatch, intl]);

  const displayAllProfileCards = () => (
    <Row className="print" gutter={[15, 15]}>
      <h2 className="visually-hidden">
        <FormattedMessage id="basic.employee.information" />
      </h2>
      {/* Summary */}
      <Col xl={14} xs={24}>
        <BasicInfoCard connectionStatus={connectionStatus} data={data} />
      </Col>
      <Col xl={10} xs={24}>
        <Row gutter={[0, 15]}>
          <Col span={24}>
            <EmploymentStatus data={data} editableCardBool={isUsersProfile} />
          </Col>
          <Col span={24}>
            <EmploymentEquity data={data} editableCardBool={isUsersProfile} />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <AboutMeCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col span={24}>
        <OfficialLanguageCard data={data} editableCardBool={isUsersProfile} />
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
        <SkillsCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col span={24}>
        <MentorshipCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col span={24}>
        <CompetenciesCard data={data} editableCardBool={isUsersProfile} />
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
        <EducationCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col span={24}>
        <ExperienceCard data={data} editableCardBool={isUsersProfile} />
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
          data={data}
          editableCardBool={isUsersProfile}
        />
      </Col>
      <Col span={24}>
        <QualifiedPools data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col xl={12} xs={24}>
        <TalentManagementCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col xl={12} xs={24}>
        <JobMobilityCard data={data} editableCardBool={isUsersProfile} />
      </Col>
      <Col span={24}>
        <ExFeederCard data={data} editableCardBool={isUsersProfile} />
      </Col>

      {/** ********** Connections *********** */}
      {isUsersProfile && (
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
            <ConnectionsCard data={data} />
          </Col>
        </>
      )}
    </Row>
  );
  const generateProfileSidebarContent = () => (
    <Row justify="center">
      <Col className="app-sideBarRow" flex={1} offset={1}>
        <Anchor
          aria-label={intl.formatMessage({ id: "edit.profile.side.nav" })}
          offsetTop={80}
        >
          <Link
            href="#card-profile-basic-info"
            title={
              <Text className="sideBarText" strong>
                <FormattedMessage id="basic.employee.information" />
              </Text>
            }
          >
            <Link
              href="#card-profile-basic-info"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="primary.contact.information" />
                </Text>
              }
            />
            <Link
              href="#card-profile-employee-summary"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="employment.status" />
                </Text>
              }
            />
            <Link
              href="#card-profile-employment-equity"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="employment.equity.groups" />
                </Text>
              }
            />
            <Link
              href="#card-profile-description"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="about.me" />
                </Text>
              }
            />
            <Link
              href="#card-profile-official-language"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="official.languages" />
                </Text>
              }
            />
          </Link>

          <Link
            href="#divider-skills-and-comp"
            title={
              <Text className="sideBarText" strong>
                <FormattedMessage id="skills.and.competencies" />
              </Text>
            }
          >
            <Link
              href="#card-profile-skills"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="skills" />
                </Text>
              }
            />
            <Link
              href="#card-profile-mentorship-skills"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="mentorship.skills" />
                </Text>
              }
            />
            <Link
              href="#card-profile-competency"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="competencies" />
                </Text>
              }
            />
          </Link>
          <Link
            href="#divider-qualifications"
            title={
              <Text className="sideBarText" strong>
                <FormattedMessage id="employee.qualifications" />
              </Text>
            }
          >
            <Link
              href="#card-profile-education"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="education" />
                </Text>
              }
            />
            <Link
              href="#card-profile-experience"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="experience" />
                </Text>
              }
            />
          </Link>
          <Link
            href="#divider-employee-growth"
            title={
              <Text className="sideBarText" strong>
                <FormattedMessage id="employee.growth.interests" />
              </Text>
            }
          >
            <Link
              href="#card-profile-learning-development"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="learning.development" />
                </Text>
              }
            />
            <Link
              href="#card-profile-qualified-pools"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="qualified.pools" />
                </Text>
              }
            />
            <Link
              href="#card-profile-talent-management"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="talent.management" />
                </Text>
              }
            />
            <Link
              href="#card-profile-ex-feeder"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="ex.feeder" />
                </Text>
              }
            />
            <Link
              href="#card-profile-career-interests"
              title={
                <Text className="sideBarText">
                  <FormattedMessage id="career.interests" />
                </Text>
              }
            />
          </Link>
          {isUsersProfile && (
            <Link
              href="#divider-privateGroup"
              title={
                <Text className="sideBarText" strong>
                  <FormattedMessage id="connections" />
                </Text>
              }
            >
              <Link
                href="#card-profile-connections"
                title={
                  <Text className="sideBarText">
                    <FormattedMessage id="connections" />
                  </Text>
                }
              />
            </Link>
          )}
        </Anchor>
      </Col>
    </Row>
  );

  return (
    <AppLayout
      displaySideBar
      loading={loading}
      sideBarContent={generateProfileSidebarContent()}
    >
      <ProfileVisibilityAlert
        isProfileHidden={
          data && data.status && ["HIDDEN"].includes(data.status)
        }
        isProfileInactive={
          data && data.status && ["INACTIVE"].includes(data.status)
        }
        isUsersProfile={isUsersProfile}
      />
      <Header
        backBtn
        extra={
          <Button onClick={() => window.print()} shape="circle" type="primary">
            <PrinterOutlined />
          </Button>
        }
        subtitle={
          <Tooltip title={<FormattedMessage id="last.modified.date" />}>
            {data && dayjs(data.updatedAt).format("LL")}
          </Tooltip>
        }
        title={
          <FormattedMessage id={isUsersProfile ? "my.profile" : "profile"} />
        }
      />
      {data ? (
        displayAllProfileCards()
      ) : (
        <ErrorProfilePage
          subtitleId="profile.not.found.description"
          titleId="profile.not.found"
        />
      )}
    </AppLayout>
  );
};

ProfileLayoutView.propTypes = {
  connectionStatus: PropTypes.bool,
  data: ProfileInfoPropType,
  isUsersProfile: PropTypes.bool,
  loading: PropTypes.bool,
  savedFormContent: PropTypes.bool,
};

ProfileLayoutView.defaultProps = {
  connectionStatus: null,
  data: null,
  isUsersProfile: null,
  loading: null,
  savedFormContent: undefined,
};

export default ProfileLayoutView;
