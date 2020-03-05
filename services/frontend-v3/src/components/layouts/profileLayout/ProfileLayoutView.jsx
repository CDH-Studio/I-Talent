import React from "react";
import { PageHeader, Card } from "antd";
import AppLayout from "../appLayout/AppLayout";

import BasicInfo from "../../basicInfo/BasicInfo";
import TalentManagement from "../../talentManagement/TalentManagement";
import OfficialLanguage from "../../officialLanguage/OfficialLanguage";
import CareerInterests from "../../careerInterests/CareerInterests";
import Experience from "../../experience/Experience";
import Education from "../../education/Education";
import Projects from "../../projects/Projects";
import EmploymentInfo from "../../employmentInfo/EmploymentInfo";

import { Row, Col } from "antd";

class ProfileLayoutView extends React.Component {
  displayAllProfileCards() {
    const { data } = this.props;
    data.acronym = getAcronym(data.firstName + " " + data.lastName);
    data.color = stringToHslColor(data.acronym);

    return (
      <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col span={16}>
            <BasicInfo data={data} style={styles.card} />
          </Col>
          <Col span={8}>
            <EmploymentInfo data={data} style={styles.card} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Card
              style={styles.card}
              title={
                "Skills | Competency | Developmental goals | Mentor Card Goes Here"
              }
            >
              <Row>
                <Col xs={24} lg={24}>
                  Skills...
                </Col>
              </Row>
              <Row>
                <Col xs={24} lg={24}>
                  Competencies ...
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={styles.row} type="flex">
          <Col span={24}>
            <TalentManagement data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <OfficialLanguage data={data} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <CareerInterests data={data} />
          </Col>
        </Row>
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
