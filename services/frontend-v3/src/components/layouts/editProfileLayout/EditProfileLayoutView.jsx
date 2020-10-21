import React from "react";
import { Menu, Card } from "antd";
import {
  TagsOutlined,
  CompassOutlined,
  GlobalOutlined,
  SolutionOutlined,
  TrophyOutlined,
  ProjectOutlined,
  EditOutlined,
} from "@ant-design/icons";
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
import "./EditProfileLayoutView.scss";

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

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
  const getSideBarContent = (step) => {
    return (
      <Menu onClick={redirectToForm} selectedKeys={step}>
        <Menu.Item tabIndex={0} key="primary-info" className="menu-item">
          <div className="menu-item-header">
            <SolutionOutlined />
            <strong>
              <FormattedMessage id="setup.primary.information" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="setup.step.2.description" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.employment.equity.groups" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="setup.gc.directory" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex={0} key="employment" className="menu-item">
          <div className="menu-item-header">
            <CompassOutlined />
            <strong>
              <FormattedMessage id="profile.employee.status" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="setup.step.3.description" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.description" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item
          tabIndex={0}
          key="language-proficiency"
          className="menu-item"
        >
          <div className="menu-item-header">
            <GlobalOutlined />
            <strong>
              <FormattedMessage id="setup.language.proficiency" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="setup.first.language" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="setup.second.language" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex={0} key="talent" className="menu-item">
          <div className="menu-item-header">
            <TagsOutlined />
            <strong>
              <FormattedMessage id="setup.talent" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="setup.skills" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.mentorship.skills" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="setup.competencies" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex={0} key="qualifications" className="menu-item">
          <div className="menu-item-header">
            <TrophyOutlined />
            <strong>
              <FormattedMessage id="profile.employee.qualifications" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="setup.education" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="setup.experience" />
            </li>
          </ul>
        </Menu.Item>
        <Menu.Item tabIndex="0" key="personal-growth" className="menu-item">
          <div className="menu-item-header">
            <ProjectOutlined />
            <strong>
              <FormattedMessage id="profile.employee.growth.interests" />
            </strong>
          </div>
          <ul className="menu-list">
            <li className="menu-list-item">
              - <FormattedMessage id="profile.learning.development" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.qualified.pools" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.career.interests" />
            </li>
            <li className="menu-list-item">
              - <FormattedMessage id="profile.talent.management" />
            </li>
            <li className="menu-list-item">
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
      <Header
        title={
          <>
            <EditOutlined />
            <FormattedMessage id="edit.profile" />
          </>
        }
      />
      <Card className="edit-profile-card">{form}</Card>
    </AppLayout>
  );
};

EditProfileLayoutView.propTypes = {
  formStep: PropTypes.string.isRequired,
  history: HistoryPropType.isRequired,
};

export default EditProfileLayoutView;
