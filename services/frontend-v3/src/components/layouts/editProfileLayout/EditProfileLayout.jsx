import React from "react";
import { Menu } from "antd";
import { FormattedMessage } from "react-intl";
import EditProfileLayoutView from "./EditProfileLayoutView";
import { RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import {
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  PersonalGrowthForm,
  QualificationsForm,
} from "../../profileForms";

const EditProfileLayout = (props) => {
  const history = useHistory();

  // Get correct form for current step
  const profileFormSelect = (step) => {
    switch (step) {
      case "primary-info":
        return <PrimaryInfoForm formType="edit" />;
      case "employment":
        return <EmploymentDataForm formType="edit" />;
      case "language-proficiency":
        return <LangProficiencyForm formType="edit" />;
      case "talent":
        return <TalentForm formType="edit" />;
      case "personal-growth":
        return <PersonalGrowthForm formType="edit" />;
      case "qualifications":
        return <QualificationsForm formType="edit" />;
      default:
        return <div>Hello</div>;
    }
  };

  // Get correct form for current step
  const redirectToForm = (data) => {
    console.log(data.key);
    let url = "/secured/profile/edit/" + data.key;
    history.push(url);
  };

  // return side bar contents
  const getSideBarContent = (step) => {
    return (
      <Menu onClick={redirectToForm} selectedKeys={step}>
        <Menu.Item key="primary-info">
          <RightOutlined />
          <FormattedMessage id="setup.primary.information" />
        </Menu.Item>
        <Menu.Item key="employment">
          <RightOutlined />
          <FormattedMessage id="setup.employment" />
        </Menu.Item>
        <Menu.Item key="language-proficiency">
          <RightOutlined />
          <FormattedMessage id="setup.language.proficiency" />
        </Menu.Item>
        <Menu.Item key="talent">
          <RightOutlined />
          <FormattedMessage id="setup.talent" />
        </Menu.Item>
        <Menu.Item key="personal-growth">
          <RightOutlined />
          <FormattedMessage id="profile.employee.growth.interests" />
        </Menu.Item>
        <Menu.Item key="qualifications">
          <RightOutlined />
          <FormattedMessage id="profile.employee.qualifications" />
        </Menu.Item>
      </Menu>
    );
  };

  // Get Sidebar Content
  let sideBarContent = getSideBarContent(props.step);
  // Get correct form for current step
  let form = profileFormSelect(props.step);

  return (
    <EditProfileLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={props.displaySideBar}
      sideBarContent={sideBarContent}
      form={form}
    />
  );
};

export default EditProfileLayout;
