import React from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { PageHeader, Anchor } from "antd";
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

import { Row, Col, Divider } from "antd";
const { Link } = Anchor;

function ProfileLayoutView(props) {
  //useParams returns an object of key/value pairs from URL parameters
  const { id } = useParams();
  const urlID = id;
  const userID = localStorage.getItem("userId");

  //Visibility values
  const { data } = props;
  const visibleCards = data.visibleCards;

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
              />
            </Col>
          </Row>

          <Divider orientation="left" id="divider-skills-and-comp">
            {<FormattedMessage id="profile.employee.skills.competencies" />}
          </Divider>
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
          <Row style={styles.row}>
            <Col span={24}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.competencies" />}
                  content={<Competencies data={data}></Competencies>}
                  cardName={"competencies"}
                  id="card-profile-competency"
                />
              </Col>
            </Col>
          </Row>

          <Divider orientation="left" id="divider-employee-growth">
            {<FormattedMessage id="profile.employee.growth.interests" />}
          </Divider>

          <Row style={styles.row}>
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.developmental.goals" />}
                content={<DevelopmentalGoals data={data}></DevelopmentalGoals>}
                cardName={"developmentalGoals"}
                id="card-profile-dev-goals"
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

          <Divider orientation="left" id="divider-qualifications">
            {<FormattedMessage id="profile.employee.qualifications" />}
          </Divider>

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
            <Divider orientation="left" id="divider-skills-and-comp">
              {<FormattedMessage id="profile.employee.skills.competencies" />}
            </Divider>
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
            <Divider orientation="left" id="divider-employee-growth">
              {<FormattedMessage id="profile.employee.growth.interests" />}
            </Divider>
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

          {visibleCards.talentManagement && visibleCards.careerInterests && (
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
          )}
          {visibleCards.talentManagement && (
            <Row style={styles.row}>
              <Col span={24}>
                <ProfileCards
                  title={<FormattedMessage id="profile.talent.management" />}
                  content={<TalentManagement data={data} style={styles.card} />}
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
                  content={<CareerInterests data={data} style={styles.card} />}
                  cardName={"careerInterests"}
                  id="card-profile-career-interests"
                />
              </Col>
            </Row>
          )}

          {(visibleCards.education ||
            visibleCards.experience ||
            visibleCards.projects) && (
            <Divider orientation="left" id="divider-qualifications">
              {<FormattedMessage id="profile.employee.qualifications" />}
            </Divider>
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
   * Handle displaying/generating sidebar items on Profile Page Sidebar depending on wheter the corresponding
   * card is hidden or not
   */
  const generateProfileSidebarContent = () => {
    return (
      <Row justify="center" style={styles.sideBarRow}>
        <Col flex={1} offset={1}>
          <Anchor>
            <Link
              href="#card-profile-basic-info"
              title={props.intl.formatMessage({
                id: "profile.basic"
              })}
            />
            {visibleCards.info && (
              <Link
                href="#card-profile-employee-summary"
                title={props.intl.formatMessage({
                  id: "profile.employee.summary"
                })}
              />
            )}
            {(visibleCards.skills ||
              visibleCards.mentorshipSkills ||
              visibleCards.competencies) && (
              <Link
                href="#divider-skills-and-comp"
                title={props.intl.formatMessage({
                  id: "profile.employee.skills.competencies"
                })}
              >
                {visibleCards.skills && (
                  <Link
                    href="#card-profile-skills"
                    title={props.intl.formatMessage({
                      id: "profile.skills"
                    })}
                  />
                )}
                {visibleCards.mentorshipSkills && (
                  <Link
                    href="#card-profile-mentorship-skills"
                    title={props.intl.formatMessage({
                      id: "profile.mentorship.skills"
                    })}
                  />
                )}
                {visibleCards.competencies && (
                  <Link
                    href="#card-profile-competency"
                    title={props.intl.formatMessage({
                      id: "profile.competencies"
                    })}
                  />
                )}
              </Link>
            )}
            {(visibleCards.developmentalGoals ||
              visibleCards.talentManagement ||
              visibleCards.careerInterests) && (
              <Link
                href="#divider-employee-growth"
                title={props.intl.formatMessage({
                  id: "profile.employee.growth.interests"
                })}
              >
                {visibleCards.developmentalGoals && (
                  <Link
                    href="#card-profile-dev-goals"
                    title={props.intl.formatMessage({
                      id: "profile.developmental.goals"
                    })}
                  />
                )}
                {visibleCards.talentManagement && (
                  <Link
                    href="#card-profile-talent-management"
                    title={props.intl.formatMessage({
                      id: "profile.talent.management"
                    })}
                  />
                )}
                {visibleCards.careerInterests && (
                  <Link
                    href="#card-profile-career-interests"
                    title={props.intl.formatMessage({
                      id: "profile.career.interests"
                    })}
                  />
                )}
              </Link>
            )}
            {(visibleCards.education ||
              visibleCards.experience ||
              visibleCards.projects) && (
              <Link
                href="#divider-qualifications"
                title={props.intl.formatMessage({
                  id: "profile.employee.qualifications"
                })}
              >
                {visibleCards.education && (
                  <Link
                    href="#card-profile-education"
                    title={props.intl.formatMessage({
                      id: "profile.education"
                    })}
                  />
                )}
                {visibleCards.experience && (
                  <Link
                    href="#card-profile-experience"
                    title={props.intl.formatMessage({
                      id: "profile.experience"
                    })}
                  />
                )}
                {visibleCards.projects && (
                  <Link
                    href="#card-profile-projects"
                    title={props.intl.formatMessage({
                      id: "profile.projects"
                    })}
                  />
                )}
              </Link>
            )}
          </Anchor>
        </Col>
      </Row>
    );
  };

  const styles = {
    card: {
      height: "100%"
    },
    row: {
      marginTop: 15
    },
    sideBarRow: {
      marginTop: 20,
      marginLeft: 10
    }
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
          padding: "0 0 15px 7px"
        }}
        title="User Profile"
      />
      {displayAllProfileCards()}
    </AppLayout>
  );
}

/* Component Styles */

//Needed when using props.intl
export default injectIntl(ProfileLayoutView);
