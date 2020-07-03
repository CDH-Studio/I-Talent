import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  PageHeader,
  Anchor,
  Typography,
  Row,
  Col,
  Button,
  Popconfirm,
} from "antd";
import {
  TagsTwoTone,
  RiseOutlined,
  TrophyOutlined,
  WarningOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import AppLayout from "../appLayout/AppLayout";
import { ProfileInfoPropType } from "../../../customPropTypes";

import ProfileCards from "../../profileCards/ProfileCards";
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
import Friends from "../../friends/Friends";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";
import ProfileNotFound from "../../profileNotFound/profileNotFound";

import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;
const { Link } = Anchor;
const { Title, Text } = Typography;

const ProfileLayoutView = ({ data }) => {
  const [friends, setFriends] = useState(true);

  // useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = useSelector((state) => state.user.id);

  // Visibility values
  const visibleCards = data ? data.visibleCards : null;

  /* Component Styles */
  const styles = {
    card: {
      height: "100%",
    },
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
  };

  /*
   * Display Cards on Profile Page
   *
   * Handle displaying the profile depending on whether the user looking at his
   * own profile or looking at other users profiles
   */
  const displayAllProfileCards = () => {
    // Display profile cards when user looking at his own profile
    // This always display all cards wether they are visible or not
    if (userID === urlID) {
      return (
        <div>
          <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
            <Col xs={24} xl={14}>
              <BasicInfo data={data} style={styles.card} />
            </Col>
            <Col xs={24} xl={10}>
              <ProfileCards
                title={<FormattedMessage id="profile.employee.summary" />}
                content={<EmployeeSummary data={data} />}
                cardName="info"
                id="card-profile-employee-summary"
                editUrl="/secured/profile/edit/employment"
                data={data}
              />
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
              <ProfileCards
                title={<FormattedMessage id="profile.skills" />}
                content={<Skills data={data} />}
                cardName="skills"
                id="card-profile-skills"
                editUrl="/secured/profile/edit/talent"
                data={data}
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.mentorship.skills" />}
                content={<Mentorship data={data} />}
                cardName="mentorshipSkills"
                id="card-profile-mentorship-skills"
                editUrl="/secured/profile/edit/talent"
                data={data}
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.competencies" />}
                  content={<Competencies data={data} />}
                  cardName="competencies"
                  id="card-profile-competency"
                  editUrl="/secured/profile/edit/talent"
                  data={data}
                />
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
              <ProfileCards
                title={<FormattedMessage id="profile.developmental.goals" />}
                content={<DevelopmentalGoals data={data} />}
                cardName="developmentalGoals"
                id="card-profile-dev-goals"
                editUrl="/secured/profile/edit/personal-growth"
                data={data}
              />
            </Col>
          </Row>
          <Row
            style={styles.row}
            gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
            type="flex"
          >
            <Col xs={24} xl={12}>
              <ProfileCards
                title={<FormattedMessage id="profile.talent.management" />}
                content={<TalentManagement data={data} style={styles.card} />}
                cardName="talentManagement"
                id="card-profile-talent-management"
                editUrl="/secured/profile/edit/personal-growth"
                data={data}
              />
              <div style={{ paddingTop: "16px" }}>
                <ProfileCards
                  title={<ExFeeder data={data} style={styles.card} />}
                  content={null}
                  cardName="exFeeder"
                  id="card-profile-ex-feeder"
                  editUrl="/secured/profile/edit/personal-growth"
                  forceDisabled={!data.exFeeder}
                  data={data}
                />
              </div>
            </Col>
            <Col xs={24} xl={12}>
              <ProfileCards
                title={<FormattedMessage id="profile.career.interests" />}
                content={<CareerInterests data={data} style={styles.card} />}
                cardName="careerInterests"
                id="card-profile-career-interests"
                editUrl="/secured/profile/edit/personal-growth"
                data={data}
              />
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
              <ProfileCards
                title={<FormattedMessage id="profile.education" />}
                content={<Education data={data} style={styles.card} />}
                cardName="education"
                id="card-profile-education"
                editUrl="/secured/profile/edit/qualifications"
                data={data}
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.experience" />}
                content={<Experience data={data} style={styles.card} />}
                cardName="experience"
                id="card-profile-experience"
                editUrl="/secured/profile/edit/qualifications"
                data={data}
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.projects" />}
                content={<Projects data={data} style={styles.card} />}
                cardName="projects"
                id="card-profile-projects"
                editUrl="/secured/profile/edit/qualifications"
                data={data}
              />
            </Col>
          </Row>
          {/** ********** Friends *********** */}
          <Title level={2} style={styles.sectionHeader} id="divider-friends">
            <TeamOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
            <FormattedMessage id="profile.friends" />
          </Title>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.friends" />}
                content={<Friends data={data} style={styles.card} />}
                cardName="friends"
                id="card-profile-friends"
                data={data}
              />
            </Col>
          </Row>
        </div>
      );
    }

    // Display profile cards when current user looking at other users profiles
    // This only display cards that are visible
    return (
      <div>
        {!visibleCards.info && (
          <Row style={styles.row}>
            <Col span={24}>
              <BasicInfo data={data} style={styles.card} />
            </Col>
          </Row>
        )}
        {visibleCards.info && (
          <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
            <Col xs={24} xl={14}>
              <BasicInfo data={data} style={styles.card} />
            </Col>
            <Col xs={24} xl={10}>
              <ProfileCards
                title={<FormattedMessage id="profile.employee.summary" />}
                content={<EmployeeSummary data={data} />}
                cardName="info"
                id="card-profile-employee-summary"
                data={data}
              />
            </Col>
          </Row>
        )}

        {(visibleCards.skills ||
          visibleCards.mentorshipSkills ||
          visibleCards.competencies) && (
          <Title
            level={2}
            style={styles.sectionHeader}
            id="divider-skills-and-comp"
          >
            <TagsTwoTone twoToneColor="#3CBAB3" style={styles.sectionIcon} />
            <FormattedMessage id="profile.employee.skills.competencies" />
          </Title>
        )}
        {visibleCards.skills && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.skills" />}
                content={<Skills data={data} />}
                cardName="skills"
                id="card-profile-skills"
                data={data}
              />
            </Col>
          </Row>
        )}
        {visibleCards.mentorshipSkills && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.mentorship.skills" />}
                content={<Mentorship data={data} />}
                cardName="mentorshipSkills"
                id="card-profile-mentorship-skills"
                data={data}
              />
            </Col>
          </Row>
        )}
        {visibleCards.competencies && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.competencies" />}
                content={<Competencies data={data} />}
                cardName="competencies"
                id="card-profile-competency"
                data={data}
              />
            </Col>
          </Row>
        )}

        {(visibleCards.developmentalGoals ||
          visibleCards.talentManagement ||
          visibleCards.careerInterests) && (
          <Title
            level={2}
            style={styles.sectionHeader}
            id="divider-employee-growth"
          >
            <RiseOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
            <FormattedMessage id="profile.employee.growth.interests" />
          </Title>
        )}

        {visibleCards.developmentalGoals && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.developmental.goals" />}
                content={<DevelopmentalGoals data={data} />}
                cardName="developmentalGoals"
                id="card-profile-dev-goals"
                data={data}
              />
            </Col>
          </Row>
        )}

        {(visibleCards.talentManagement ||
          (visibleCards.exFeeder && data.exFeeder)) &&
        visibleCards.careerInterests ? (
          <Row
            style={styles.row}
            gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
            type="flex"
          >
            <Col xs={24} xl={12}>
              {visibleCards.talentManagement && (
                <ProfileCards
                  title={<FormattedMessage id="profile.talent.management" />}
                  content={<TalentManagement data={data} style={styles.card} />}
                  cardName="talentManagement"
                  id="card-profile-talent-management"
                  data={data}
                />
              )}
              {visibleCards.exFeeder && data.exFeeder && (
                <div
                  style={{
                    paddingTop: visibleCards.talentManagement ? "16px" : "0px",
                  }}
                >
                  <ProfileCards
                    title={<ExFeeder data={data} style={styles.card} />}
                    content={null}
                    cardName="exFeeder"
                    id="card-profile-ex-feeder"
                    data={data}
                  />
                </div>
              )}
            </Col>
            <Col xs={24} xl={12}>
              <ProfileCards
                title={<FormattedMessage id="profile.career.interests" />}
                content={<CareerInterests data={data} style={styles.card} />}
                cardName="careerInterests"
                id="card-profile-career-interests"
                data={data}
              />
            </Col>
          </Row>
        ) : (
          <>
            {visibleCards.talentManagement && (
              <Row style={styles.row}>
                <Col span={24}>
                  <ProfileCards
                    title={<FormattedMessage id="profile.talent.management" />}
                    content={
                      <TalentManagement data={data} style={styles.card} />
                    }
                    cardName="talentManagement"
                    id="card-profile-talent-management"
                    data={data}
                  />
                </Col>
              </Row>
            )}
            {visibleCards.exFeeder && data.exFeeder && (
              <Row style={styles.row}>
                <Col span={24}>
                  <ProfileCards
                    title={<FormattedMessage id="profile.exFeeder" />}
                    content={<ExFeeder data={data} style={styles.card} />}
                    cardName="exFeeder"
                    id="card-profile-ex-feeder"
                    data={data}
                  />
                </Col>
              </Row>
            )}
            {visibleCards.careerInterests && (
              <Row style={styles.row}>
                <Col span={24}>
                  <ProfileCards
                    title={<FormattedMessage id="profile.career.interests" />}
                    content={
                      <CareerInterests data={data} style={styles.card} />
                    }
                    cardName="careerInterests"
                    id="card-profile-career-interests"
                    data={data}
                  />
                </Col>
              </Row>
            )}
          </>
        )}

        {(visibleCards.education ||
          visibleCards.experience ||
          visibleCards.projects) && (
          <Title
            level={2}
            style={styles.sectionHeader}
            id="divider-qualifications"
          >
            <TrophyOutlined twoToneColor="#3CBAB3" style={styles.sectionIcon} />
            <FormattedMessage id="profile.employee.qualifications" />
          </Title>
        )}
        {visibleCards.education && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.education" />}
                content={<Education data={data} style={styles.card} />}
                cardName="education"
                id="card-profile-education"
                data={data}
              />
            </Col>
          </Row>
        )}
        {visibleCards.experience && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.experience" />}
                content={<Experience data={data} style={styles.card} />}
                cardName="experience"
                id="card-profile-experience"
                data={data}
              />
            </Col>
          </Row>
        )}
        {visibleCards.projects && (
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.projects" />}
                content={<Projects data={data} style={styles.card} />}
                cardName="projects"
                id="card-profile-projects"
                data={data}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  };

  /*
   * Generate sidebar items on Profile Page Sidebar
   *
   * Handle displaying/generating sidebar items on Profile Page Sidebar depending on whether the corresponding
   * card is hidden or not
   */
  const generateProfileSidebarContent = () => {
    if (!visibleCards) {
      return (
        <Row justify="center" style={styles.sideBarRow}>
          <Col flex={1} offset={1} />
        </Row>
      );
    }

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
            {(visibleCards.skills ||
              visibleCards.mentorshipSkills ||
              visibleCards.competencies) && (
              <Link
                href="#divider-skills-and-comp"
                title={
                  <Text strong style={styles.sideBarText}>
                    <FormattedMessage id="profile.employee.skills.competencies" />
                  </Text>
                }
              >
                {visibleCards.skills && (
                  <Link
                    href="#card-profile-skills"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.skills" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.mentorshipSkills && (
                  <Link
                    href="#card-profile-mentorship-skills"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.mentorship.skills" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.competencies && (
                  <Link
                    href="#card-profile-competency"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.competencies" />
                      </Text>
                    }
                  />
                )}
              </Link>
            )}
            {(visibleCards.developmentalGoals ||
              visibleCards.talentManagement ||
              visibleCards.careerInterests ||
              visibleCards.exFeeder) && (
              <Link
                href="#divider-employee-growth"
                title={
                  <Text strong style={styles.sideBarText}>
                    <FormattedMessage id="profile.employee.growth.interests" />
                  </Text>
                }
              >
                {visibleCards.developmentalGoals && (
                  <Link
                    href="#card-profile-dev-goals"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.developmental.goals" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.talentManagement && (
                  <Link
                    href="#card-profile-talent-management"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.talent.management" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.exFeeder && (
                  <Link
                    href="#card-profile-ex-feeder"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.ex.feeder.title" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.careerInterests && (
                  <Link
                    href="#card-profile-career-interests"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.career.interests" />
                      </Text>
                    }
                  />
                )}
              </Link>
            )}
            {(visibleCards.education ||
              visibleCards.experience ||
              visibleCards.projects) && (
              <Link
                href="#divider-qualifications"
                title={
                  <Text strong style={styles.sideBarText}>
                    <FormattedMessage id="profile.employee.qualifications" />
                  </Text>
                }
              >
                {visibleCards.education && (
                  <Link
                    href="#card-profile-education"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.education" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.experience && (
                  <Link
                    href="#card-profile-experience"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.experience" />
                      </Text>
                    }
                  />
                )}
                {visibleCards.projects && (
                  <Link
                    href="#card-profile-projects"
                    title={
                      <Text style={styles.sideBarText}>
                        <FormattedMessage id="profile.projects" />
                      </Text>
                    }
                  />
                )}
              </Link>
            )}
            {urlID === userID && (
              <Link
                href="#card-profile-friends"
                title={
                  <Text strong style={styles.sideBarText}>
                    <FormattedMessage id="profile.friends" />
                  </Text>
                }
              />
            )}
          </Anchor>
        </Col>
      </Row>
    );
  };

  const addFriend = async () => {
    await axios
      .post(`${backendAddress}api/friends/${urlID}`)
      .catch((error) => handleError(error, "message"));
    setFriends(true);
  };

  const removeFriend = async () => {
    await axios
      .delete(`${backendAddress}api/friends/${urlID}`)
      .catch((error) => handleError(error, "message"));
    setFriends(false);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get(`${backendAddress}api/friends/${urlID}`)
        .catch((error) => handleError(error, "message"));
      setFriends(response.data.friend);
    }
    if (urlID !== userID) fetchData();
  }, [urlID, userID]);

  const getButton = () => {
    if (userID === urlID) return "";
    if (friends) {
      return (
        <Popconfirm
          title={<FormattedMessage id="profile.removeFriend.confirm" />}
          placement="topRight"
          okText={<FormattedMessage id="profile.yes" />}
          cancelText={<FormattedMessage id="profile.no" />}
          icon={<WarningOutlined style={{ color: "orange" }} />}
          onConfirm={removeFriend}
        >
          <Button type="primary" style={{ float: "right" }}>
            <FormattedMessage id="profile.removeFriend" />
          </Button>
        </Popconfirm>
      );
    }
    return (
      <Button type="primary" style={{ float: "right" }} onClick={addFriend}>
        <FormattedMessage id="profile.addFriend" />
      </Button>
    );
  };

  return (
    <AppLayout sideBarContent={generateProfileSidebarContent()} displaySideBar>
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
        }}
        title={
          <FormattedMessage
            id={userID === urlID ? "my.profile" : "other.profile"}
          />
        }
        extra={getButton()}
      />
      {data ? displayAllProfileCards() : <ProfileNotFound />}
    </AppLayout>
  );
};

ProfileLayoutView.propTypes = {
  data: ProfileInfoPropType,
};

ProfileLayoutView.defaultProps = {
  data: null,
};

export default ProfileLayoutView;
