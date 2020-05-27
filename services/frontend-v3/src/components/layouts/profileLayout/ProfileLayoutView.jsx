import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { PageHeader, Anchor, Typography } from "antd";
import { TagsTwoTone, RiseOutlined, TrophyOutlined } from "@ant-design/icons";
import AppLayout from "../appLayout/AppLayout";

import ProfileCards from "../../profileCards/ProfileCards";
import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
import Mentorship from "../../mentorshipCard/Mentorship";
import Competencies from "../../competenciesCard/Competencies";
import DevelopmentalGoals from "../../developmentalGoals/DevelopmentalGoals";
import TalentManagement from "../../talentManagement/TalentManagement";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Projects from "../../projects/Projects";
import EmployeeSummary from "../../employeeSummary/EmployeeSummary";

import { Row, Col } from "antd";
const { Link } = Anchor;
const { Title, Text } = Typography;

function ProfileLayoutView(props) {
  //useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = localStorage.getItem("userId");

  //Visibility values
  const { data } = props;
  const visibleCards = data.visibleCards;

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
  };

  /*
   * Display Cards on Profile Page
   *
   * Handle displaying the profile depending on wheter the user looking at his
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
                content={<EmployeeSummary data={data}></EmployeeSummary>}
                cardName={"info"}
                id="card-profile-employee-summary"
                editUrl="/secured/profile/edit/employment"
              />
            </Col>
          </Row>

          {/************ Skills and competencies ************/}
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
                content={<Skills data={data}></Skills>}
                cardName={"skills"}
                id="card-profile-skills"
                editUrl="/secured/profile/edit/talent"
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.mentorship.skills" />}
                content={<Mentorship data={data}></Mentorship>}
                cardName={"mentorshipSkills"}
                id="card-profile-mentorship-skills"
                editUrl="/secured/profile/edit/talent"
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.competencies" />}
                  content={<Competencies data={data}></Competencies>}
                  cardName={"competencies"}
                  id="card-profile-competency"
                  editUrl="/secured/profile/edit/talent"
                />
              </Col>
            </Col>
          </Row>

          {/************ Personal Growth ************/}
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
                content={<DevelopmentalGoals data={data}></DevelopmentalGoals>}
                cardName={"developmentalGoals"}
                id="card-profile-dev-goals"
                editUrl="/secured/profile/edit/personal-growth"
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
                cardName={"talentManagement"}
                id="card-profile-talent-management"
                editUrl="/secured/profile/edit/personal-growth"
              />
            </Col>
            <Col xs={24} xl={12}>
              <ProfileCards
                title={<FormattedMessage id="profile.career.interests" />}
                content={<CareerInterests data={data} style={styles.card} />}
                cardName={"careerInterests"}
                id="card-profile-career-interests"
                editUrl="/secured/profile/edit/personal-growth"
              />
            </Col>
          </Row>

          {/************ Qualifications ************/}
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
                cardName={"education"}
                id="card-profile-education"
                editUrl="/secured/profile/edit/qualifications"
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.experience" />}
                content={<Experience data={data} style={styles.card} />}
                cardName={"experience"}
                id="card-profile-experience"
                editUrl="/secured/profile/edit/qualifications"
              />
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.projects" />}
                content={<Projects data={data} style={styles.card} />}
                cardName={"projects"}
                id="card-profile-projects"
                editUrl="/secured/profile/edit/qualifications"
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      // Display profile cards when current user looking at other users profiles
      //This only display cards that are visible
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
                  content={<EmployeeSummary data={data}></EmployeeSummary>}
                  cardName={"info"}
                  id="card-profile-employee-summary"
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
                  content={<Skills data={data}></Skills>}
                  cardName={"skills"}
                  id="card-profile-skills"
                />
              </Col>
            </Row>
          )}
          {visibleCards.mentorshipSkills && (
            <Row style={styles.row}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.mentorship.skills" />}
                  content={<Mentorship data={data}></Mentorship>}
                  cardName={"mentorshipSkills"}
                  id="card-profile-mentorship-skills"
                />
              </Col>
            </Row>
          )}
          {visibleCards.competencies && (
            <Row style={styles.row}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.competencies" />}
                  content={<Competencies data={data}></Competencies>}
                  cardName={"competencies"}
                  id="card-profile-competency"
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
                  content={
                    <DevelopmentalGoals data={data}></DevelopmentalGoals>
                  }
                  cardName={"developmentalGoals"}
                  id="card-profile-dev-goals"
                />
              </Col>
            </Row>
          )}

          {visibleCards.talentManagement && visibleCards.careerInterests ? (
            <Row
              style={styles.row}
              gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
              type="flex"
            >
              <Col xs={24} xl={12}>
                <ProfileCards
                  title={<FormattedMessage id="profile.talent.management" />}
                  content={<TalentManagement data={data} style={styles.card} />}
                  cardName={"talentManagement"}
                  id="card-profile-talent-management"
                />
              </Col>
              <Col xs={24} xl={12}>
                <ProfileCards
                  title={<FormattedMessage id="profile.career.interests" />}
                  content={<CareerInterests data={data} style={styles.card} />}
                  cardName={"careerInterests"}
                  id="card-profile-career-interests"
                />
              </Col>
            </Row>
          ) : (
            <>
              {visibleCards.talentManagement && (
                <Row style={styles.row}>
                  <Col span={24}>
                    <ProfileCards
                      title={
                        <FormattedMessage id="profile.talent.management" />
                      }
                      content={
                        <TalentManagement data={data} style={styles.card} />
                      }
                      cardName={"talentManagement"}
                      id="card-profile-talent-management"
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
                      cardName={"careerInterests"}
                      id="card-profile-career-interests"
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
              <TrophyOutlined
                twoToneColor="#3CBAB3"
                style={styles.sectionIcon}
              />
              <FormattedMessage id="profile.employee.qualifications" />
            </Title>
          )}
          {visibleCards.education && (
            <Row style={styles.row}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.education" />}
                  content={<Education data={data} style={styles.card} />}
                  cardName={"education"}
                  id="card-profile-education"
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
                  cardName={"experience"}
                  id="card-profile-experience"
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
                  cardName={"projects"}
                  id="card-profile-projects"
                />
              </Col>
            </Row>
          )}
        </div>
      );
    }
  };

  /*
   * Generate sidebar items on Profile Page Sidebar
   *
   * Handle displaying/generating sidebar items on Profile Page Sidebar depending on whether the corresponding
   * card is hidden or not
   */
  const generateProfileSidebarContent = () => {
    return (
      <Row justify="center" style={styles.sideBarRow}>
        <Col flex={1} offset={1}>
          <Anchor>
            <Link
              href="#card-profile-basic-info"
              title={
                <Text strong>
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
                  <Text strong>
                    <FormattedMessage id="profile.employee.skills.competencies" />
                  </Text>
                }
              >
                {visibleCards.skills && (
                  <Link
                    href="#card-profile-skills"
                    title={<FormattedMessage id="profile.skills" />}
                  />
                )}
                {visibleCards.mentorshipSkills && (
                  <Link
                    href="#card-profile-mentorship-skills"
                    title={<FormattedMessage id="profile.mentorship.skills" />}
                  />
                )}
                {visibleCards.competencies && (
                  <Link
                    href="#card-profile-competency"
                    title={<FormattedMessage id="profile.competencies" />}
                  />
                )}
              </Link>
            )}
            {(visibleCards.developmentalGoals ||
              visibleCards.talentManagement ||
              visibleCards.careerInterests) && (
              <Link
                href="#divider-employee-growth"
                title={
                  <Text strong>
                    <FormattedMessage id="profile.employee.growth.interests" />
                  </Text>
                }
              >
                {visibleCards.developmentalGoals && (
                  <Link
                    href="#card-profile-dev-goals"
                    title={
                      <FormattedMessage id="profile.developmental.goals" />
                    }
                  />
                )}
                {visibleCards.talentManagement && (
                  <Link
                    href="#card-profile-talent-management"
                    title={<FormattedMessage id="profile.talent.management" />}
                  />
                )}
                {visibleCards.careerInterests && (
                  <Link
                    href="#card-profile-career-interests"
                    title={<FormattedMessage id="profile.career.interests" />}
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
                  <Text strong>
                    <FormattedMessage id="profile.employee.qualifications" />
                  </Text>
                }
              >
                {visibleCards.education && (
                  <Link
                    href="#card-profile-education"
                    title={<FormattedMessage id="profile.education" />}
                  />
                )}
                {visibleCards.experience && (
                  <Link
                    href="#card-profile-experience"
                    title={<FormattedMessage id="profile.experience" />}
                  />
                )}
                {visibleCards.projects && (
                  <Link
                    href="#card-profile-projects"
                    title={<FormattedMessage id="profile.projects" />}
                  />
                )}
              </Link>
            )}
          </Anchor>
        </Col>
      </Row>
    );
  };

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={true}
      sideBarContent={generateProfileSidebarContent()}
    >
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
        }}
        title="User Profile"
      />
      {displayAllProfileCards()}
    </AppLayout>
  );
}

export default ProfileLayoutView;
