import React, { Component } from "react";
import { injectIntl } from "react-intl";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import { formatOptions, formatSkillOptions } from "../../functions/formTools";
import config from "../../config";
import prepareInfo from "../../functions/prepareInfo";

import SetupLayoutView from "./setupLayoutView";

import CareerOverviewFormController from "../editForms/careerOverviewForm/careerOverviewFormController";
import CompetenciesFormController from "../editForms/competenciesForm/competenciesFormController";
import DevelopmentalGoalsFormController from "../editForms/developmentalGoalsForm/developmentalGoalsFormController";
import EducationFormController from "../editForms/educationForm/educationFormController";
import LabelCardFormController from "../editForms/labelCardForm/labelCardFormController";
import LanguageProficiencyFormController from "../editForms/languageProficiencyForm/languageProficiencyFormController";
import ManagerFormController from "../editForms/managerForm/managerFormController";
import PrimaryInformationFormController from "../editForms/primaryInformationForm/primaryInformationFormController";
import SkillsFormController from "../editForms/skillsForm/skillsFormController";
import TalentManagmentController from "../editForms/talentManagementForm/talentManagementFormController";
import ProjectsFormController from "../editForms/projectsForm/projectsFormController";
import CareerInterestsFormController from "../editForms/careerInterestsForm/careerInterestsFormController";

const { backendAddress } = config;

const formList = [
  {
    name: <FormattedMessage id="setup.primary.information" />,
    form: PrimaryInformationFormController
  },
  {
    name: <FormattedMessage id="setup.labeled" />,
    form: LabelCardFormController
  },
  {
    name: <FormattedMessage id="setup.manager" />,
    form: ManagerFormController
  },
  {
    name: <FormattedMessage id="setup.language.proficiency" />,
    form: LanguageProficiencyFormController
  },
  {
    name: <FormattedMessage id="setup.talent.management" />,
    form: TalentManagmentController
  },
  { name: <FormattedMessage id="setup.skills" />, form: SkillsFormController },
  {
    name: <FormattedMessage id="setup.competencies" />,
    form: CompetenciesFormController
  },
  {
    name: <FormattedMessage id="setup.developmental.goals" />,
    form: DevelopmentalGoalsFormController
  },
  {
    name: <FormattedMessage id="setup.education" />,
    form: EducationFormController
  },
  {
    name: <FormattedMessage id="setup.experience" />,
    form: CareerOverviewFormController
  },
  {
    name: <FormattedMessage id="setup.projects" />,
    form: ProjectsFormController
  },
  {
    name: <FormattedMessage id="setup.career.interests" />,
    form: CareerInterestsFormController
  }
];

/** Logic for the /setup route */
class SetupLayoutController extends Component {
  static propTypes = {
    /** Function to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** react-intl translation object */
    intl: PropTypes.object.isRequired,
    /** keycloak autherization object */
    keycloak: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func
  };

  constructor(props) {
    super(props);

    const { intl, keycloak } = this.props;

    keycloak
      .loadUserInfo()
      .then(async userInfo => this.setState({ email: userInfo.email }));

    this.state = {
      editProfileOptions: null, //object with key value parts of <field name>:<array of field options>
      formIndex: 0, //Which form the user is being displayed
      gedsIndex: null, //The index the user selects to be their information from gedsInfoList
      gedsInfoList: null //The list of potential matches for user in GEDS
    };

    this.changes = {};
    this.getSetupData = this.getSetupData.bind(this);
    this.setFormIndex = this.setFormIndex.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.setGedsIndex = this.setGedsIndex.bind(this);
    this.formList = [];
    formList.forEach((element, index) =>
      this.formList.push({
        ...element,
        name: intl.formatMessage({ id: element.name })
      })
    );

    this.getSetupData();
  }

  render() {
    const gedsInfoList = prepareInfo(
      this.state.gedsInfoList,
      localStorage.getItem("lang")
    );
    const { changeLanguage } = this.props;

    return (
      <SetupLayoutView
        changeLanguage={changeLanguage}
        editProfileOptions={this.state.editProfileOptions}
        formIndex={this.state.formIndex}
        formList={this.formList}
        gedsIndex={this.state.gedsIndex}
        gedsInfoList={gedsInfoList}
        handleRegister={this.handleRegister}
        isEarlyRegister={this.state.formIndex !== formList.length - 1}
        keycloakEmail={this.state.email}
        profileInfo={this.changes}
        setFormChanges={this.setFormChanges.bind(this, this.state.formIndex)}
        setFormIndex={this.setFormIndex}
        setGedsIndex={this.setGedsIndex}
      />
    );
  }

  /**
   * Select user's information from gedsInfoList
   * @param {PropTypes.number} index The index selected
   */
  setGedsIndex(index) {
    const gedsInfo = this.state.gedsInfoList[index];
    this.changes = {
      ...this.changes,
      ...gedsInfo,
      location: {
        ...gedsInfo.location,
        description: gedsInfo.location.description[localStorage.getItem("lang")]
      }
    };

    this.setState({ gedsIndex: index });
  }

  /**
   * Gathers the information needed from geds and the form options
   */
  async getSetupData() {
    let skillOptions = formatOptions(
      (await axios.get(backendAddress + "api/option/getSkill")).data
    );
    let categorizedList = formatSkillOptions(
      (await axios.get(backendAddress + "api/option/getCategorySkills")).data
    );
    let competencyOptions = formatOptions(
      (await axios.get(backendAddress + "api/option/getCompetency")).data
    );

    let gedsInfoList = await axios
      .get(backendAddress + "api/profGen/" + localStorage.getItem("userId"))
      .then(response => response.data);

    let epo = {
      categorized: categorizedList,
      skills: skillOptions,
      careerMobility: formatOptions(
        (await axios.get(backendAddress + "api/option/getCareerMobility")).data
      ),
      diploma: formatOptions(
        (await axios.get(backendAddress + "api/option/getDiploma")).data
      ),
      classification: formatOptions(
        (await axios.get(backendAddress + "api/option/getGroupLevel")).data
      ),
      competencies: competencyOptions,
      developmentalGoals: formatOptions(
        (await axios.get(backendAddress + "api/option/getDevelopmentalGoals"))
          .data
      ),
      location: formatOptions(
        (await axios.get(backendAddress + "api/option/getLocation")).data
      ),
      school: formatOptions(
        (await axios.get(backendAddress + "api/option/getSchool")).data
      ),
      security: formatOptions(
        (await axios.get(backendAddress + "api/option/getSecurityClearance"))
          .data
      ),
      talentMatrixResult: formatOptions(
        (await axios.get(backendAddress + "api/option/getTalentMatrixResult"))
          .data
      ),
      temporaryRole: formatOptions(
        (await axios.get(backendAddress + "api/option/getTenure")).data
      ),
      willingToRelocateTo: formatOptions(
        (await axios.get(backendAddress + "api/option/getWillingToRelocateTo"))
          .data
      ),
      lookingForNewJob: formatOptions(
        (await axios.get(backendAddress + "api/option/getLookingForANewJob"))
          .data
      )
    };

    this.setState({
      editProfileOptions: epo,
      gedsInfoList
    });
  }

  /**
   * communicates user's profile setup information to backend
   */
  handleRegister() {
    const { redirectFunction } = this.props;
    axios
      .post(
        backendAddress + "api/profile/" + localStorage.getItem("userId"),
        this.changes
      )
      .then(response => {
        redirectFunction("/secured/home");
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  /**
   * Sets the form currently being displayed to the user
   * @param {PropTypes.number.isRequired} index The index of the form to display
   */
  setFormIndex(index) {
    this.setState({ formIndex: index });
  }

  /** Handles storing of changes made to profile setup forms
   * @param {PropTypes.number} index the index of the form being changed.
   * @param {PropTypes.object} changes key value pairs of type <field name>:<new value>
   */
  setFormChanges(index, changes) {
    this.changes = { ...this.changes, ...changes };
  }
}

export default injectIntl(SetupLayoutController);
