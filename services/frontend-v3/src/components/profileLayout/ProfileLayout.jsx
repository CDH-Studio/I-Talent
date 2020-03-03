import React from "react";
import BasicInfo from "./basicInfo/BasicInfo";
import Experience from "./experience/Experience";
import { Row, Col } from "antd";

class Profile extends React.Component {
  render() {
    const { data } = this.props;
    data.acronym = getAcronym(data.firstName + " " + data.lastName);
    data.color = stringToHslColor(data.acronym);
    console.log(data);

    return (
      <div>
        <Row>
          <Col xs={24} xl={16}>
            <BasicInfo data={data} />
          </Col>
          <Col xs={24} xl={8}>
            Info Card Goes Here
          </Col>
        </Row>
        {/* <Skills data={data} /> */}
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
            Education Card Goes Here
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            <Experience data={data} />
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col xs={24} xl={16}>
            Projets Goes Here
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
