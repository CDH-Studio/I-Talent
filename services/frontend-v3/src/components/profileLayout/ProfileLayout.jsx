import React from "react";
import ProfileHeader from "./profileHeader/ProfileHeader";
import BasicInfo from "./basicInfo/BasicInfo";
import Experience from "./experience/Experience";
import Education from "./education/Education";
import Projects from "./projects/Projects";
import Skills from "./skills/Skills";
import { Row, Col } from "antd";
import EmploymentInfo from "./employmentInfo/EmploymentInfo";

class Profile extends React.Component {
  render() {
    const { data } = this.props;
    data.acronym = getAcronym(data.firstName + " " + data.lastName);
    data.color = stringToHslColor(data.acronym);
    console.log(data);

    return (
      <div>
        <ProfileHeader data={data} />
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col xs={24} xl={16}>
            <BasicInfo data={data} style={{ height: "100%" }} />
          </Col>
          <Col xs={24} xl={8}>
            <EmploymentInfo data={data} style={{ height: "100%" }} />
          </Col>
        </Row>
        <Skills data={data} />
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            Talent management and Career Interest Card Goes Here
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            Skills, Competency, Developmental goals and Mentor Card Goes Here
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            <Education data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            <Experience data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            <Projects data={data} />
          </Col>
        </Row>
      </div>
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
export default Profile;
