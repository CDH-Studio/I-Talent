import React from "react";
import { FormattedMessage } from "react-intl";
import { PageHeader, Anchor } from "antd";
import AppLayout from "../appLayout/AppLayout";

import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
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
            <EmployeeSummary data={data} />
          </Col>
        </Row>

        <Divider orientation="left">
          {<FormattedMessage id="profile.employee.skills.competencies" />}
        </Divider>
        <Row style={styles.row}>
          <Col span={24}>
            <Skills data={data}></Skills>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Competencies data={data}></Competencies>
          </Col>
        </Row>
        <Divider orientation="left">
          {<FormattedMessage id="profile.employee.growth.interests" />}
        </Divider>
        <Row style={styles.row}>
          <Col span={24}>
            <DevelopmentalGoals data={data}></DevelopmentalGoals>
          </Col>
        </Row>
        <Row
          style={styles.row}
          gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
          type="flex"
        >
          <Col xs={24} xl={12}>
            <TalentManagement data={data} />
          </Col>
          <Col xs={24} xl={12}>
            <CareerInterests data={data} />
          </Col>
        </Row>

        <Divider orientation="left">
          {<FormattedMessage id="profile.employee.qualifications" />}
        </Divider>

        <Row style={styles.row}>
          <Col span={24}>
            <Education data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Experience data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Projects data={data} />
          </Col>
        </Row>
      </div>
    );
  };

  const sider = () => {
    return (
      <Anchor>
        <Link href="#basic-info" title="Talent Management" />
        <Link href="#talent-management" title="Talent Management" />
      </Anchor>
    );
  };

  const styles = {
    card: {
      height: "100%"
    },
    row: {
      marginTop: 15
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
export default ProfileLayoutView;
