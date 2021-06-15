import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Anchor,
  Typography,
  Row,
  Col,
  notification,
  Popover,
  Tooltip,
  Alert,
  Button,
} from "antd";
import {
  TagsTwoTone,
  RiseOutlined,
  TrophyOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useKeycloak } from "@react-keycloak/web";
import AppLayout from "../appLayout/AppLayout";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

import BasicInfo from "../../basicInfo/BasicInfo";
import Header from "../../header/Header";
import Skills from "../../skillsCard/Skills";
import OfficialLanguage from "../../officialLanguage/OfficialLanguage";
import Mentorship from "../../mentorshipCard/Mentorship";
import Competencies from "../../competenciesCard/Competencies";
import DescriptionCard from "../../descriptionCard/DescriptionCard";
import LearningDevelopment from "../../learningDevelopment/LearningDevelopment";
import TalentManagement from "../../talentManagement/TalentManagement";
import ExFeeder from "../../exFeeder/ExFeeder";
import CareerInterests from "../../careerInterests/CareerInterests";
import QualifiedPools from "../../qualifiedPools/QualifiedPools";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Connections from "../../connections/Connections";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import ErrorProfilePage from "../../errorResult/errorProfilePage";
import EmploymentEquity from "../../employmentEquity/EmploymentEquity";
import "./ProfileLayoutView.less";

const { Link } = Anchor;
const { Title, Text } = Typography;

const ProfileLayoutView = ({
  data,
  connectionStatus,
  privateProfile,
  changeConnection,
  loading,
  savedFormContent,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();

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
    <Row gutter={[15, 15]} className="print">
      {/* Summary */}
      <Col xs={24} xl={14}>
        <BasicInfo
          data={data}
          connectionStatus={connectionStatus}
          changeConnection={changeConnection}
        />
      </Col>
      <Col xs={24} xl={10}>
        <Row gutter={[0, 15]}>
          <Col span={24}>
            <EmployeeSummary data={data} editableCardBool={privateProfile} />
          </Col>
          <Col span={24}>
            <EmploymentEquity data={data} editableCardBool={privateProfile} />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <DescriptionCard data={data} editableCardBool={privateProfile} />
      </Col>
      <Col span={24}>
        <OfficialLanguage data={data} editableCardBool={privateProfile} />
      </Col>

      {/** ********** Skills and competencies *********** */}
      <Title
        level={2}
        className="sectionHeader hide-for-print"
        id="divider-skills-and-comp"
      >
        <TagsTwoTone twoToneColor="#3CBAB3" className="sectionIcon" />
        <FormattedMessage id="skills.and.competencies" />
      </Title>
      <Col span={24}>
        <Skills data={data} editableCardBool={privateProfile} />
      </Col>
      <Col span={24}>
        <Mentorship data={data} editableCardBool={privateProfile} />
      </Col>
      <Col span={24}>
        <Competencies data={data} editableCardBool={privateProfile} />
      </Col>

      {/** ********** Qualifications *********** */}
      <Title
        level={2}
        className="sectionHeader hide-for-print"
        id="divider-qualifications"
      >
        <TrophyOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
        <FormattedMessage id="employee.qualifications" />
      </Title>
      <Col span={24}>
        <Education data={data} editableCardBool={privateProfile} />
      </Col>
      <Col span={24}>
        <Experience data={data} editableCardBool={privateProfile} />
      </Col>

      {/** ********** Personal Growth *********** */}
      <Title
        level={2}
        className="sectionHeader hide-for-print"
        id="divider-employee-growth"
      >
        <RiseOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
        <FormattedMessage id="employee.growth.interests" />
      </Title>
      <Col span={24}>
        <LearningDevelopment editableCardBool={privateProfile} data={data} />
      </Col>
      <Col span={24}>
        <QualifiedPools data={data} editableCardBool={privateProfile} />
      </Col>
      <Col xs={24} xl={12}>
        <TalentManagement data={data} editableCardBool={privateProfile} />
      </Col>
      <Col xs={24} xl={12}>
        <CareerInterests data={data} editableCardBool={privateProfile} />
      </Col>
      <Col span={24}>
        <ExFeeder data={data} editableCardBool={privateProfile} />
      </Col>

      {/** ********** Connections *********** */}
      {privateProfile && (
        <>
          <Title
            level={2}
            className="sectionHeader hide-for-print"
            id="divider-privateGroup"
          >
            <TeamOutlined twoToneColor="#3CBAB3" className="sectionIcon" />
            <FormattedMessage id="connections" />
            <div className="privateGroupInfo">
              <Popover
                trigger={["focus", "hover"]}
                content={
                  <div className="popContent">
                    <FormattedMessage
                      id="connections.tooltip.header"
                      values={{
                        helpUrl: (
                          <a href="/about/help">
                            <FormattedMessage id="footer.contact.link" />
                          </a>
                        ),
                      }}
                    />
                  </div>
                }
              >
                <InfoCircleOutlined tabIndex={0} />
              </Popover>
            </div>
          </Title>
          <Col span={24} className="hide-for-print">
            <Connections data={data} />
          </Col>
        </>
      )}
    </Row>
  );
  const generateProfileSidebarContent = () => (
    <Row justify="center">
      <Col flex={1} offset={1} className="app-sideBarRow">
        <Anchor offsetTop={80}>
          <Link
            href="#card-profile-basic-info"
            title={
              <Text strong className="sideBarText">
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
              <Text strong className="sideBarText">
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
              <Text strong className="sideBarText">
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
              <Text strong className="sideBarText">
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
          {privateProfile && (
            <Link
              href="#divider-privateGroup"
              title={
                <Text strong className="sideBarText">
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

  const displayHiddenAlert = () => {
    const canViewHiddenProfiles = keycloak.hasResourceRole(
      "view-private-profile"
    );
    if (
      (canViewHiddenProfiles || privateProfile) &&
      data &&
      data.status &&
      ["INACTIVE", "HIDDEN"].includes(data.status)
    ) {
      const isHidden = data.status === "HIDDEN";

      let messageId;

      if (privateProfile) {
        messageId = !isHidden ? (
          <FormattedMessage id="hidden.profile.message" />
        ) : (
          <FormattedMessage
            id="inactive.message"
            values={{
              helpUrl: (
                <a href="/about/help">
                  <FormattedMessage id="footer.contact.link" />
                </a>
              ),
            }}
          />
        );
      } else if (canViewHiddenProfiles) {
        messageId = isHidden ? (
          <FormattedMessage id="hidden.profile.message.other" />
        ) : (
          <FormattedMessage id="inactive.message.other" />
        );
      }

      return (
        <Alert
          message={messageId}
          type={isHidden ? "warning" : "error"}
          showIcon
          style={{ marginBottom: 10 }}
          icon={isHidden ? <EyeInvisibleOutlined /> : <LockOutlined />}
        />
      );
    }

    return undefined;
  };

  return (
    <AppLayout
      sideBarContent={generateProfileSidebarContent()}
      displaySideBar
      loading={loading}
    >
      {displayHiddenAlert()}
      <Header
        title={
          <FormattedMessage id={privateProfile ? "my.profile" : "profile"} />
        }
        subtitle={
          <Tooltip title={<FormattedMessage id="last.modified.date" />}>
            {data && dayjs(data.updatedAt).format("LL")}
          </Tooltip>
        }
        extra={
          <Button type="primary" shape="circle" onClick={() => window.print()}>
            <PrinterOutlined />
          </Button>
        }
        backBtn
      />
      {data ? (
        displayAllProfileCards()
      ) : (
        <ErrorProfilePage
          titleId="profile.not.found"
          subtitleId="profile.not.found.description"
        />
      )}
    </AppLayout>
  );
};

ProfileLayoutView.propTypes = {
  data: ProfileInfoPropType,
  loading: PropTypes.bool,
  connectionStatus: PropTypes.bool,
  privateProfile: PropTypes.bool,
  changeConnection: PropTypes.func,
  savedFormContent: PropTypes.bool,
};

ProfileLayoutView.defaultProps = {
  data: null,
  loading: null,
  connectionStatus: null,
  privateProfile: null,
  changeConnection: null,
  savedFormContent: undefined,
};

export default ProfileLayoutView;
