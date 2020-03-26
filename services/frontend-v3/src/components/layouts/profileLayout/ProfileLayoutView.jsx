import React from "react";
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
  const displayAllProfileCards = () => {
    const { data } = props;
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
            <Col span={24}>
              <ProfileCards
                title={<FormattedMessage id="profile.developmental.goals" />}
                content={<DevelopmentalGoals data={data}></DevelopmentalGoals>}
                cardName={"developmentalGoals"}
                id="card-profile-dev-goals"
              />
            </Col>
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
  };

  const sider = () => {
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
            <Link
              href="#card-profile-employee-summary"
              title={props.intl.formatMessage({
                id: "profile.employee.summary"
              })}
            />
            <Link
              href="#divider-skills-and-comp"
              title={props.intl.formatMessage({
                id: "profile.employee.skills.competencies"
              })}
            >
              <Link
                href="#card-profile-skills"
                title={props.intl.formatMessage({
                  id: "profile.skills"
                })}
              />
              <Link
                href="#card-profile-mentorship-skills"
                title={props.intl.formatMessage({
                  id: "profile.mentorship.skills"
                })}
              />
              <Link
                href="#card-profile-competency"
                title={props.intl.formatMessage({
                  id: "profile.competencies"
                })}
              />
            </Link>
            <Link
              href="#divider-employee-growth"
              title={props.intl.formatMessage({
                id: "profile.employee.growth.interests"
              })}
            >
              <Link
                href="#card-profile-dev-goals"
                title={props.intl.formatMessage({
                  id: "profile.developmental.goals"
                })}
              />
              <Link
                href="#card-profile-talent-management"
                title={props.intl.formatMessage({
                  id: "profile.talent.management"
                })}
              />
              <Link
                href="#card-profile-career-interests"
                title={props.intl.formatMessage({
                  id: "profile.career.interests"
                })}
              />
            </Link>
            <Link
              href="#divider-qualifications"
              title={props.intl.formatMessage({
                id: "profile.employee.qualifications"
              })}
            >
              <Link
                href="#card-profile-education"
                title={props.intl.formatMessage({
                  id: "profile.education"
                })}
              />
              <Link
                href="#card-profile-experience"
                title={props.intl.formatMessage({
                  id: "profile.experience"
                })}
              />
              <Link
                href="#card-profile-projects"
                title={props.intl.formatMessage({
                  id: "profile.projects"
                })}
              />
            </Link>
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
      sideBarContent={sider()}
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
