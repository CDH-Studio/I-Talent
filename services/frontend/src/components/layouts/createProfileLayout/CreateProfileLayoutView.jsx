import { Steps, Card } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AppLayout from "../appLayout/AppLayout";
import {
  Welcome,
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  CareerManagementForm,
  QualificationsForm,
  DoneSetup,
} from "../../profileForms";
import Header from "../../header/Header";

import "./CreateProfileLayoutView.less";

const { Step } = Steps;

/**
 *  CreateProfileLayoutView(props)
 *  Render the layout for the create profile forms
 */
const CreateProfileLayoutView = ({ formStep, highestStep }) => {
  const history = useHistory();
  const int = useIntl();

  /*
   * On change
   *
   * action to take if sidebar steps are clicked
   */
  const onChange = (current) => {
    const url = `/profile/create/step/${current + 1}`;
    history.push(url);
  };

  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a step in the sidebar
   */

  const handleKeyPress = (e, current) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      const url = `/profile/create/step/${current + 2}`;
      history.push(url);
    }
  };

  /*
   * Profile Form Select
   *
   * Generate the correct form based on the step
   */
  const profileFormSelect = (step) => {
    const stepInt = parseInt(step, 10);
    switch (stepInt) {
      case 1:
        return <Welcome />;
      case 2:
        return <PrimaryInfoForm formType="create" />;
      case 3:
        return <EmploymentDataForm formType="create" />;
      case 4:
        return <LangProficiencyForm formType="create" />;
      case 5:
        return <TalentForm formType="create" />;
      case 6:
        return <QualificationsForm formType="create" />;
      case 7:
        return <CareerManagementForm formType="create" />;
      case 8:
        return <DoneSetup formType="create" />;
      default:
        return <Redirect to={`/profile/create/step/${highestStep}`} />;
    }
  };
  /**
   * Creates a description for each step
   * @param {*} descriptions
   */
  const createDescription = (descriptions) => {
    if (descriptions.length > 0) {
      const modifiedDescriptions = descriptions.map((description) => (
        <li key={description}>
          <FormattedMessage id={description} />
        </li>
      ));
      return <ul className="stepList">{modifiedDescriptions}</ul>;
    }

    return undefined;
  };
  /**
   * creates the steps for the side menu
   * @param {*} titleId
   * @param {*} descriptions
   * @param {*} disabled
   */
  const createProfileStep = ({ titleId, descriptions, disabled }) => (
    <Step
      title={<FormattedMessage id={titleId} />}
      description={createDescription(descriptions)}
      disabled={disabled}
    />
  );

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
  const getSideBarContent = (step) => {
    const stepInt = parseInt(step, 10) - 1;
    return (
      <div style={{ margin: "20px 25px" }}>
        <Steps
          direction="vertical"
          size="small"
          current={stepInt}
          onChange={onChange}
          onKeyPress={(e) => handleKeyPress(e, stepInt)}
          role="navigation"
          aria-label={intl.formatMessage({ id: "create.profile.side.nav" })}
        >
          {createProfileStep({
            titleId: "welcome",
            descriptions: [],
            disabled: false,
          })}
          {createProfileStep({
            titleId: "primary.contact.information",
            descriptions: ["general.profile.info", "employment.equity.groups"],
            disabled: false,
          })}
          {createProfileStep({
            titleId: "employment.status",
            descriptions: ["current.position", "about.me"],
            disabled: highestStep < 3,
          })}
          {createProfileStep({
            titleId: "official.languages",
            descriptions: [
              "first.official.language",
              "second.official.language.results",
            ],
            disabled: highestStep < 3,
          })}
          {createProfileStep({
            titleId: "skills.and.competencies",
            descriptions: ["skills", "mentorship.skills", "competencies"],
            disabled: highestStep < 3,
          })}
          {createProfileStep({
            titleId: "employee.qualifications",
            descriptions: ["education", "experience"],
            disabled: highestStep < 3,
          })}
          {createProfileStep({
            titleId: "employee.growth.interests",
            descriptions: [
              "developmental.goals",
              "qualified.pools",
              "career.interests",
              "talent.management",
              "ex.feeder",
            ],
            disabled: highestStep < 3,
          })}
          {createProfileStep({
            titleId: "setup.done",
            descriptions: [],
            disabled: highestStep < 3,
          })}
        </Steps>
      </div>
    );
  };

  // Get Sidebar Content
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  return (
    <AppLayout
      sideBarContent={sideBarContent}
      displaySideBar
      displaySearch={false}
    >
      <Header
        title={<FormattedMessage id="create.profile" />}
        icon={<UserAddOutlined />}
      />
      <Card className="edit-profile-card">{form}</Card>
    </AppLayout>
  );
};

CreateProfileLayoutView.propTypes = {
  formStep: PropTypes.string,
  highestStep: PropTypes.number,
};

CreateProfileLayoutView.defaultProps = {
  formStep: "1",
  highestStep: 1,
};

export default CreateProfileLayoutView;
