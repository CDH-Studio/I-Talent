import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Anchor, Typography, Row, Col, message, Popover, Tooltip } from "antd";
import {
  TagsTwoTone,
  RiseOutlined,
  TrophyOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import moment from "moment";
import AppLayout from "../appLayout/AppLayout";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";

import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
import Mentorship from "../../mentorshipCard/Mentorship";
import Competencies from "../../competenciesCard/Competencies";
import DevelopmentalGoals from "../../developmentalGoals/DevelopmentalGoals";
import TalentManagement from "../../talentManagement/TalentManagement";
import ExFeeder from "../../exFeeder/ExFeeder";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Projects from "../../projects/Projects";
import Connections from "../../connections/Connections";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";
import ProfileNotFound from "../../profileNotFound/profileNotFound";
import Header from "../../header/Header";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";

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

  const styles = {
    row: {
      marginTop: 15,
    },
    sideBarRow: {
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    sectionHeader: {
      marginTop: "25px",
      fontSize: "20px",
      lineHeight: "38px",
      color: "#114541",
    },
    sectionIcon: {
      margin: "0 7px",
      color: "#3CBAB3",
    },
    sectionNavIcon: {
      margin: "0 2px",
      color: "#3CBAB3",
    },
    sideBarText: {
      whiteSpace: "normal",
    },
    privateGroupInfo: {
      paddingLeft: "8px",
      display: "inline",
    },
    headerSubtitle: {
      fontSize: "0.7em",
      fontStyle: "italic",
      fontWeight: "normal",
    },
  };

  useEffect(() => {
    if (savedFormContent === false) {
      message.error(intl.formatMessage({ id: "profile.edit.save.error" }));
    } else if (savedFormContent === true) {
      message.success(intl.formatMessage({ id: "profile.edit.save.success" }));
    }

    dispatch(setSavedFormContent(undefined));
  }, [savedFormContent, dispatch, intl]);

  const displayAllProfileCards = () => {
    return (
      <div>
        {/* Employee summary */}
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col xs={24} xl={14}>
            <BasicInfo
              data={data}
              connectionStatus={connectionStatus}
              changeConnection={changeConnection}
            />
          </Col>
          <Col xs={24} xl={10}>
            <EmployeeSummary data={data} type={privateProfile} />
          </Col>
        </Row>
        {/** ********** Skills and competencies *********** */}
        <Title
          level={2}
          style={styles.sectionHeader}
          id="divider-skills-and-comp"
        >
          <TagsTwoTone twoToneColor="#3CBAB3" style={styles.sectionIcon} />
          <FormattedMessage id="profile.employee.skills.competencies" />
        </Title>
        <Row style={styles.row}>
          <Col span={24}>
            <Skills data={data} type={privateProfile} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Mentorship data={data} type={privateProfile} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Col span={24}>
              <Competencies data={data} type={privateProfile} />
            </Col>
          </Col>
        </Row>
        {/** ********** Personal Growth *********** */}
        <Title
          level={2}
          style={styles.sectionHeader}
          id="divider-employee-growth"
        >
          <RiseOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
          <FormattedMessage id="profile.employee.growth.interests" />
        </Title>
        <Row style={styles.row}>
          <Col span={24}>
            <DevelopmentalGoals type={privateProfile} data={data} />
          </Col>
        </Row>

        <Row
          style={styles.row}
          gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
          type="flex"
        >
          <Col xs={24} xl={12}>
            <TalentManagement data={data} type={privateProfile} />
            <div style={{ paddingTop: "16px" }}>
              <ExFeeder data={data} type={privateProfile} />
            </div>
          </Col>
          <Col xs={24} xl={12}>
            <CareerInterests data={data} type={privateProfile} />
          </Col>
        </Row>
        {/** ********** Qualifications *********** */}
        <Title
          level={2}
          style={styles.sectionHeader}
          id="divider-qualifications"
        >
          <TrophyOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
          <FormattedMessage id="profile.employee.qualifications" />
        </Title>
        <Row style={styles.row}>
          <Col span={24}>
            <Education data={data} type={privateProfile} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Experience data={data} type={privateProfile} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Projects data={data} type={privateProfile} />
          </Col>
        </Row>

        {/** ********** Connections *********** */}
        {privateProfile && (
          <div>
            <Title
              level={2}
              style={styles.sectionHeader}
              id="divider-privateGroup"
            >
              <TeamOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
              <FormattedMessage id="profile.privateGroup" />
              <div style={styles.privateGroupInfo}>
                <Popover
                  content={
                    <div style={styles.popContent}>
                      <FormattedMessage id="profile.connections.tooltip.header" />
                      <a href="/about/help">
                        <FormattedMessage id="footer.contact.link" />
                      </a>
                    </div>
                  }
                >
                  <QuestionCircleOutlined />
                </Popover>
              </div>
            </Title>
            <Row style={styles.row}>
              <Col span={24}>
                <Connections data={data} />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  };
  const generateProfileSidebarContent = () => {
    return (
      <Row justify="center" style={styles.sideBarRow}>
        <Col flex={1} offset={1}>
          <Anchor offsetTop="75">
            <Link
              href="#card-profile-basic-info"
              title={
                <Text strong style={styles.sideBarText}>
                  <FormattedMessage id="profile.basic" />
                </Text>
              }
            />
            <Link
              href="#divider-skills-and-comp"
              title={
                <Text strong style={styles.sideBarText}>
                  <FormattedMessage id="profile.employee.skills.competencies" />
                </Text>
              }
            >
              <Link
                href="#card-profile-skills"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.skills" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-mentorship-skills"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.mentorship.skills" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-competency"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.competencies" />
                  </Text>
                }
              />
            </Link>
            <Link
              href="#divider-employee-growth"
              title={
                <Text strong style={styles.sideBarText}>
                  <FormattedMessage id="profile.employee.growth.interests" />
                </Text>
              }
            >
              <Link
                href="#card-profile-dev-goals"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.developmental.goals" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-talent-management"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.talent.management" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-ex-feeder"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.ex.feeder.title" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-career-interests"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.career.interests" />
                  </Text>
                }
              />
            </Link>
            <Link
              href="#divider-qualifications"
              title={
                <Text strong style={styles.sideBarText}>
                  <FormattedMessage id="profile.employee.qualifications" />
                </Text>
              }
            >
              <Link
                href="#card-profile-education"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.education" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-experience"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.experience" />
                  </Text>
                }
              />
              <Link
                href="#card-profile-projects"
                title={
                  <Text style={styles.sideBarText}>
                    <FormattedMessage id="profile.projects" />
                  </Text>
                }
              />
            </Link>
            {privateProfile && (
              <Link
                href="#divider-privateGroup"
                title={
                  <Text strong style={styles.sideBarText}>
                    <FormattedMessage id="profile.privateGroup" />
                  </Text>
                }
              >
                <Link
                  href="#card-profile-connections"
                  title={
                    <Text style={styles.sideBarText}>
                      <FormattedMessage id="profile.connections" />
                    </Text>
                  }
                />
              </Link>
            )}
          </Anchor>
        </Col>
      </Row>
    );
  };

  return (
    <AppLayout
      sideBarContent={generateProfileSidebarContent()}
      displaySideBar
      loading={loading}
    >
      <Header
        style={styles.headerStyle}
        title={
          <Col>
            <Row>
              <FormattedMessage
                id={privateProfile ? "my.profile" : "other.profile"}
              />
            </Row>
            <Row>
              <Text type="secondary" style={styles.headerSubtitle}>
                <Tooltip title={<FormattedMessage id="profile.last.updated" />}>
                  {data && moment(data.updatedAt).format("LL")}
                </Tooltip>
              </Text>
            </Row>
          </Col>
        }
      />
      {data ? displayAllProfileCards() : <ProfileNotFound />}
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
