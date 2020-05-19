import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Menu } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
const EditProfileLayoutView = ({ formStep }) => {
  const history = useHistory();

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
    const url = `/secured/profile/edit/${data.key}`;
    history.push(url);
  };

  const styles = {
    menuList: {
      paddingLeft: "30px",
      listStyle: "none",
    },
    menuListItem: {
      marginTop: "-20px",
    },
    menuItem: {
      height: "auto",
    },
  };

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
  const getSideBarContent = (step) => {
    return (
      <Menu onClick={redirectToForm} selectedKeys={step}>
        <Menu.Item key="primary-info" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="setup.primary.information" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.step.2.description" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item key="employment" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="setup.employment" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.step.3.description" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item key="language-proficiency" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="setup.language.proficiency" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.step.4.description" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item key="talent" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="setup.talent" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.competencies" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.skills" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.mentorship.skills" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item key="personal-growth" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="profile.employee.growth.interests" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.developmental.goals" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.career.interests" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.talent.management" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item key="qualifications" style={styles.menuItem}>
          <RightOutlined />
          <b>
            <FormattedMessage id="profile.employee.qualifications" />
          </b>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.education" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.experience" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.projects" />
            </li>
          </ul>
        </Menu.Item>
      </Menu>
    );
  };

  // Get Sidebar Content
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar>
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
};

export default EditProfileLayoutView;
