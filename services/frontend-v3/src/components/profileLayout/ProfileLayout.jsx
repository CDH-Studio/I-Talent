import React from "react";
import BasicInfo from "./basicInfo/BasicInfo";
import Skills from "./skills/Skills";
import { Row, Col } from "antd";

class Profile extends React.Component {
  render() {
    const { name, data } = this.props;
    console.log(data);

    return (
      <div>
        <Row>
          <Col xs={24} xl={16}>
            <BasicInfo name={name} data={data} change />
          </Col>
          <Col xs={24} xl={8}></Col>
        </Row>
        {/* <Skills data={data} /> */}
      </div>
    );
  }
}

//Needed when using this.props.intl
export default Profile;
