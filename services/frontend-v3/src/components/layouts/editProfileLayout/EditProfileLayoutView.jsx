import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Menu } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import {
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  PersonalGrowthForm,
  QualificationsForm,
} from "../../profileForms";

/*
 *  EditProfileLayoutView(props)
 *  Render the layout for the edit profile forms
 */
const EditProfileLayoutView = (props) => {
  let history = useHistory();

  /*
   * Profile Form Select
   *
   * Generate the correct form based on the step
   */
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

  /*
   * Redirect To Form
   *
   * Redirect to form based on sidebar selection
   */
  const redirectToForm = (data) => {
    console.log(data.key);
    let url = "/secured/profile/edit/" + data.key;
    history.push(url);
  };

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
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
  let sideBarContent = getSideBarContent(props.formStep);
  // Get correct form for current step
  let form = profileFormSelect(props.formStep);

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={true}
      sideBarContent={sideBarContent}
    >
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
          textTransform: "capitalize",
        }}
        title={<FormattedMessage id="edit.profile" />}
      />
      {form}
    </AppLayout>
  );
};
export default EditProfileLayoutView;
