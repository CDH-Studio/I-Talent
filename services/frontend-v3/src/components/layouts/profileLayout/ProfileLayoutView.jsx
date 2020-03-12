import React from "react";
import { FormattedMessage } from "react-intl";
import { PageHeader } from "antd";
import AppLayout from "../appLayout/AppLayout";

import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
import Competencies from "../../competenciesCard/Competencies";
import DevelopmentalGoals from "../../developmentalGoals/DevelopmentalGoals";
import TalentManagement from "../../talentManagement/TalentManagement";
import OfficialLanguage from "../../officialLanguage/OfficialLanguage";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Projects from "../../projects/Projects";
import EmploymentInfo from "../../employmentInfo/EmploymentInfo";

import { Row, Col, Typography, Divider } from "antd";
const { Title } = Typography;

class ProfileLayoutView extends React.Component {
  displayAllProfileCards() {
    const { data } = this.props;
    data.acronym = getAcronym(data.firstName + " " + data.lastName);
    data.color = stringToHslColor(data.acronym);

    return (
      <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col xs={24} xl={16}>
            <BasicInfo data={data} style={styles.card} />
          </Col>
          <Col xs={24} xl={8}>
            <EmploymentInfo data={data} style={styles.card} />
          </Col>
        </Row>
        <Row style={styles.row} type="flex">
          <Col span={24}>
            <OfficialLanguage data={data} />
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
  }

  render() {
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        // sideBarContent={this.props.sideBarContent}
      >
        <PageHeader
          style={{
            padding: "0 0 15px 7px"
          }}
          title="User Profile"
        />
        {this.displayAllProfileCards()}
      </AppLayout>
    );
  }
}

function stringToHslColor(str) {
  var hash = 0;
  var s = 90;
  var l = 45;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

function getAcronym(name) {
  const i = name.lastIndexOf(" ") + 1;
  return name.substring(0, 1) + name.substring(i, i + 1);
}

/* Component Styles */
const styles = {
  card: {
    height: "100%"
  },
  row: {
    marginTop: 15
  }
};

//Needed when using this.props.intl
export default ProfileLayoutView;
