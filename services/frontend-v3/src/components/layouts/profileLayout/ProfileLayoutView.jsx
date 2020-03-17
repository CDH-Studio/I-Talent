import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import { PageHeader } from "antd";
import AppLayout from "../appLayout/AppLayout";

import ProfileCards from "../../profileCards/ProfileCards";
import BasicInfo from "../../basicInfo/BasicInfo";
import Skills from "../../skillsCard/Skills";
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

    return (
      <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]} type="flex">
          <Col xs={24} xl={16}>
            <BasicInfo data={data} style={styles.card} />
            {/* <ProfileCards
              title={<FormattedMessage id="profile.info" />}
              content={<BasicInfo data={data} style={styles.card} />}
            /> */}
          </Col>
          <Col xs={24} xl={8}>
            {/* <EmploymentInfo data={data} style={styles.card} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.info" />}
              content={<EmploymentInfo data={data} style={styles.card} />}
              cardName={"info"}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            <Skills data={data}></Skills>
          </Col>
        </Row>
        <Row style={styles.row} type="flex">
          <Col span={24}>
            {/* <TalentManagement data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.talent.management" />}
              content={<TalentManagement data={data} style={styles.card} />}
              cardName={"talentManagement"}
            />
          </Col>
        </Row>
        <Row
          style={styles.row}
          gutter={[{ xs: 8, sm: 16, md: 16, lg: 16 }, 20]}
          type="flex"
        >
          <Col xs={24} xl={12}>
            {/* <OfficialLanguage data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.official.language" />}
              content={<OfficialLanguage data={data} style={styles.card} />}
              cardName={"officialLanguage"}
            />
          </Col>
          <Col xs={24} xl={12}>
            {/* <CareerInterests data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.career.interests" />}
              content={<CareerInterests data={data} style={styles.card} />}
              cardName={"careerInterests"}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            {/* <Education data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.education" />}
              content={<Education data={data} style={styles.card} />}
              cardName={"education"}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            {/* <Experience data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.experience" />}
              content={<Experience data={data} style={styles.card} />}
              cardName={"experience"}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col span={24}>
            {/* <Projects data={data} /> */}
            <ProfileCards
              title={<FormattedMessage id="profile.projects" />}
              content={<Projects data={data} style={styles.card} />}
              cardName={"projects"}
            />
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
export default injectIntl(ProfileLayoutView);
