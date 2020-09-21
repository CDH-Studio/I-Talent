import React from "react";
import { Menu } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import AppLayout from "../appLayout/AppLayout";
import { HistoryPropType } from "../../../utils/customPropTypes";
import {
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  PersonalGrowthForm,
  QualificationsForm,
} from "../../profileForms";
import Header from "../../header/Header";

/*
 *  EditProfileLayoutView(props)
 *  Render the layout for the edit profile forms
 */
const EditProfileLayoutView = ({ formStep, history }) => {
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
        return <Redirect to="/profile/edit/primary-info" />;
    }
  };

  /*
   * Redirect To Form
   *
   * Redirect to form based on sidebar selection
   */
  const redirectToForm = (data) => {
    const url = `/profile/edit/${data.key}`;
    history.push(url);
  };

  const styles = {
    menuList: {
      paddingLeft: "30px",
      listStyle: "none",
      paddingTop: "5px",
      paddingBottom: "5px",
      backgroundColor: "#ffffff60",
    },
    menuListItem: {
      whiteSpace: "normal",
      lineHeight: "20px",
      padding: "0 16px",
    },
    menuItem: {
      height: "auto",
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    menuItemHeader: {
      padding: "10px 16px",
      whiteSpace: "normal",
      lineHeight: "20px",
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
        <Menu.Item tabIndex="0" key="primary-info" style={styles.menuItem}>
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="setup.primary.information" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.step.2.description" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.employment.equity.groups" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex="0" key="employment" style={styles.menuItem}>
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="profile.employee.status" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.step.3.description" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item
          tabIndex="0"
          key="language-proficiency"
          style={styles.menuItem}
        >
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="setup.language.proficiency" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.first.language" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.second.language" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex="0" key="talent" style={styles.menuItem}>
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="setup.talent" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.skills" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.mentorship.skills" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.competencies" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex="0" key="qualifications" style={styles.menuItem}>
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="profile.employee.qualifications" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.education" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="setup.experience" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex="0" key="personal-growth" style={styles.menuItem}>
          <div style={styles.menuItemHeader}>
            <RightOutlined />
            <b>
              <FormattedMessage id="profile.employee.growth.interests" />
            </b>
          </div>
          <ul style={styles.menuList}>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.learning.development" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.career.interests" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.talent.management" />
            </li>
            <li style={styles.menuListItem}>
              - <FormattedMessage id="profile.ex.feeder.title" />
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

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar>
      <Header title={<FormattedMessage id="edit.profile" />} />
      {form}
    </AppLayout>
  );
};

EditProfileLayoutView.propTypes = {
  formStep: PropTypes.string.isRequired,
  history: HistoryPropType.isRequired,
};

export default EditProfileLayoutView;
