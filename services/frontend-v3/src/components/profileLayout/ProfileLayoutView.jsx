import React from "react";
import { PageHeader, Card } from "antd";
import AppLayout from "../layouts/appLayout/AppLayout";

// import ProfileHeader from "./profileHeader/ProfileHeader";
import BasicInfo from "./basicInfo/BasicInfo";
import TalentManagement from "./talentManagement/TalentManagement";
import OfficialLanguage from "./officialLanguage/OfficialLanguage";
import CareerInterests from "./careerInterests/CareerInterests";

import Experience from "./experience/Experience";
import Education from "./education/Education";
import Projects from "./projects/Projects";
import { Row, Col } from "antd";
import EmploymentInfo from "./employmentInfo/EmploymentInfo";

class ProfileLayoutView extends React.Component {
  displayAllProfileCards() {
    const { data } = this.props;
    data.acronym = getAcronym(data.firstName + " " + data.lastName);
    data.color = stringToHslColor(data.acronym);

    return (
      <div>
        {/* <ProfileHeader data={data} /> 
         Note for my future self: Remove line above and delete ProfileHeader and ProfileHeaderView 
         components.
         */}
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col span={16}>
            <BasicInfo data={data} style={{ height: "100%" }} />
          </Col>
          <Col span={8}>
            <EmploymentInfo data={data} style={{ height: "100%" }} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24}>
            <Card
              style={{ height: "100%" }}
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
        <Row style={{ marginTop: 15 }} type="flex">
          <Col span={24}>
            <TalentManagement data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24}>
            <OfficialLanguage data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24}>
            <CareerInterests data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24}>
            <Education data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24}>
            <Experience data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
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

//Needed when using this.props.intl
export default ProfileLayoutView;
