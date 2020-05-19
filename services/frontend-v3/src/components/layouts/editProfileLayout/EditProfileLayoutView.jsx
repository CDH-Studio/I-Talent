import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Menu } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { IntlPropType } from "../../../customPropTypes";
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
const EditProfileLayoutView = ({ formStep, intl }) => {
  const history = useHistory();

  /*
   * Profile Form Select
   *
   * Generate the correct form based on the step
   */
  const profileFormSelect = step => {
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
  const redirectToForm = data => {
    const url = `/secured/profile/edit/${data.key}`;
    history.push(url);
  };

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
  const getSideBarContent = step => {
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
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  // get current language code
  const locale = intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  return (
    <AppLayout
      sideBarContent={sideBarContent}
      displaySideBar
    >
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
          textTransform: locale === "en" ? "capitalize" : "",
        }}
        title={<FormattedMessage id="edit.profile" />}
      />
      {form}
    </AppLayout>
  );
};

EditProfileLayoutView.propTypes = {
  formStep: PropTypes.string.isRequired,
  intl: IntlPropType,
};

EditProfileLayoutView.defaultProps = {
  intl: undefined,
};

export default injectIntl(EditProfileLayoutView);
