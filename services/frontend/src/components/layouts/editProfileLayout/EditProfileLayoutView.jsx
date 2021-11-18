import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import {
  CompassOutlined,
  EditOutlined,
  GlobalOutlined,
  ProjectOutlined,
  SolutionOutlined,
  TagsOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Card, Menu } from "antd";
import PropTypes from "prop-types";

import Header from "../../header/Header";
import {
  CareerManagementForm,
  DoneSetup,
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  QualificationsForm,
  TalentForm,
} from "../../profileForms";
import ProfileVisibilityAlert from "../../profileVisibilityAlert/ProfileVisibilityAlert";
import AppLayout from "../appLayout/AppLayout";

import "./EditProfileLayoutView.less";

/**
 * Generate the sidebar steps for create profile
 * @param {Object} props - component props
 * @param {string} props.step - the selected step
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const SideBarContent = ({ step = "primary-info" }) => {
  const intl = useIntl();
  const history = useHistory();

  /**
   * Action to redirect to form step
   * @param {Object} data
   */
  const redirectToForm = (data) => {
    const url = `/profile/edit/${data.key}`;
    history.push(url);
  };

  return (
    <Menu
      aria-label={intl.formatMessage({ id: "edit.profile.side.nav" })}
      onClick={redirectToForm}
      role="menu"
      selectedKeys={step}
    >
      <Menu.Item key="primary-info" className="menu-item" tabIndex={0}>
        <div className="menu-item-header">
          <SolutionOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="primary.contact.information" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="general.profile.info" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="employment.equity.groups" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="gcdirectory.sync" />
          </li>
        </ul>
      </Menu.Item>
      <Menu.Item key="employment" className="menu-item" tabIndex={0}>
        <div className="menu-item-header">
          <CompassOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="employment.status" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="current.position" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="about.me" />
          </li>
        </ul>
      </Menu.Item>
      <Menu.Item key="language-proficiency" className="menu-item" tabIndex={0}>
        <div className="menu-item-header">
          <GlobalOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="official.languages" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="first.official.language" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="second.official.language.results" />
          </li>
        </ul>
      </Menu.Item>
      <Menu.Item key="talent" className="menu-item" tabIndex={0}>
        <div className="menu-item-header">
          <TagsOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="skills.and.competencies" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="skills" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="mentorship.skills" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="competencies" />
          </li>
        </ul>
      </Menu.Item>
      <Menu.Item key="qualifications" className="menu-item" tabIndex={0}>
        <div className="menu-item-header">
          <TrophyOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="employee.qualifications" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="education" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="experience" />
          </li>
        </ul>
      </Menu.Item>
      <Menu.Item key="career-management" className="menu-item" tabIndex="0">
        <div className="menu-item-header">
          <ProjectOutlined aria-hidden="true" className="mr-1" />
          <strong>
            <FormattedMessage id="employee.growth.interests" />
          </strong>
        </div>
        <ul className="menu-list">
          <li className="menu-list-item">
            - <FormattedMessage id="learning.development" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="qualified.pools" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="career.interests" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="talent.management" />
          </li>
          <li className="menu-list-item">
            - <FormattedMessage id="ex.feeder" />
          </li>
        </ul>
      </Menu.Item>
    </Menu>
  );
};

/**
 * Generate Edit Profile form based on selected step
 * @param {Object} props - component props
 * @param {string} props.step - the selected step
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const EditProfileForm = ({ step = "primary-info" }) => {
  switch (step) {
    case "primary-info":
      return <PrimaryInfoForm formType="edit" />;
    case "employment":
      return <EmploymentDataForm formType="edit" />;
    case "language-proficiency":
      return <LangProficiencyForm formType="edit" />;
    case "talent":
      return <TalentForm formType="edit" />;
    case "career-management":
      return <CareerManagementForm formType="edit" />;
    case "qualifications":
      return <QualificationsForm formType="edit" />;
    case "finish":
      return <DoneSetup formType="edit" />;
    default:
      return <Redirect to="/profile/edit/primary-info" />;
  }
};

/*
 *  EditProfileLayoutView(props)
 *  Render the layout for the edit profile forms
 */
const EditProfileLayoutView = ({ formStep }) => {
  const { status } = useSelector((state) => state.user);

  return (
    <AppLayout displaySideBar sideBarContent={<SideBarContent />}>
      <ProfileVisibilityAlert
        isProfileHidden={status === "HIDDEN"}
        isProfileInactive={status === "INACTIVE"}
        isUsersProfile
      />
      <Header
        icon={<EditOutlined />}
        title={<FormattedMessage id="edit.profile" />}
      />

      <Card className="edit-profile-card">
        <EditProfileForm step={formStep} />
      </Card>
    </AppLayout>
  );
};

EditProfileLayoutView.propTypes = {
  formStep: PropTypes.string.isRequired,
};

export default EditProfileLayoutView;
