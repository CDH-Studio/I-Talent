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
  CareerManagementForm,
  QualificationsForm,
} from "../../profileForms";
import Header from "../../header/Header";
import "./EditProfileLayoutView.less";

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
      case "career-management":
        return <CareerManagementForm formType="edit" />;
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
  const getSideBarContent = (step) => (
    <Menu onClick={redirectToForm} selectedKeys={step}>
      <Menu.Item tabIndex={0} key="primary-info" className="menu-item">
        <div className="menu-item-header">
          <SolutionOutlined />
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
      <Menu.Item tabIndex={0} key="employment" className="menu-item">
        <div className="menu-item-header">
          <CompassOutlined />
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
      <Menu.Item tabIndex={0} key="language-proficiency" className="menu-item">
        <div className="menu-item-header">
          <GlobalOutlined />
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
      <Menu.Item tabIndex={0} key="talent" className="menu-item">
        <div className="menu-item-header">
          <TagsOutlined />
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
      <Menu.Item tabIndex={0} key="qualifications" className="menu-item">
        <div className="menu-item-header">
          <TrophyOutlined />
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
      <Menu.Item tabIndex="0" key="career-management" className="menu-item">
        <div className="menu-item-header">
          <ProjectOutlined />
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

  // Get Sidebar Content
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar>
      <Header
        title={<FormattedMessage id="edit.profile" />}
        icon={<EditOutlined />}
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
