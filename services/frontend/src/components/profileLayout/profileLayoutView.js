import React, { Component } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import moment from "moment";
import map from "lodash/map";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Checkbox,
  Confirm,
  Dimmer,
  Grid,
  Icon,
  Label,
  List,
  Loader,
  Menu,
  Popup,
  Sidebar,
  Table
} from "semantic-ui-react";

import tempProfilePic from "./../../assets/tempProfilePicture.png";
import NavigationBar from "../navigationBar/navigationBarController";
import ProfileCardController from "./profileCard/profileCardController";
import EditWrapperController from "./editWrapper/editWrapperController";
import { renderValue } from "../../functions/profileTools";
import { EditableProvider } from "./editableProvider/editableProvider";

import CareerInterestsFormController from "../editForms/careerInterestsForm/careerInterestsFormController";
import CareerOverviewFormController from "../editForms/careerOverviewForm/careerOverviewFormController";
import CompetenciesFormController from "../editForms/competenciesForm/competenciesFormController";
import DevelopmentalGoalsFormController from "../editForms/developmentalGoalsForm/developmentalGoalsFormController";
import EducationFormController from "../editForms/educationForm/educationFormController";
import LabelCardsFormController from "../editForms/labelCardForm/labelCardFormController";
import LanguageProficiencyFormController from "../editForms/languageProficiencyForm/languageProficiencyFormController";
import ManagerFormController from "../editForms/managerForm/managerFormController";
import PrimaryInformationFormController from "../editForms/primaryInformationForm/primaryInformationFormController";
import ProjectsFormController from "../editForms/projectsForm/projectsFormController";
import SkillsFormController from "../editForms/skillsForm/skillsFormController";
import TalentManagementFormController from "../editForms/talentManagementForm/talentManagementFormController";

import HistoryCardController from "./historyCard/historyCardController";

import "./common/common.css";
import "./profileLayout.css";

//Used to determine which layout to use for the profile cards
const SMALL_WIDTH = 750;
const MEDIUM_WIDTH = 1250;

//Determines if sidebar should push or shrink body
const SIDEBAR_ANIMATION_DETERMINING_WIDTH = 1800;

/** UI for the /profile route */
class ProfileLayoutView extends Component {
  static propTypes = {
    /** Applys changes made to publicly visible cards */
    applyVisibleProfileCards: PropTypes.func,
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** Clears the item being confirmed in the Confirm modal */
    clearConfirmItem: PropTypes.func,
    /** Disables the button to apply changes to publicly visible cards*/
    disableApplyVisibleProfileCards: PropTypes.bool,
    /** Whether or not the current profile is editabled */
    editable: PropTypes.bool,
    /** Function to handle clicking deactivate profile button */
    handleClickDeactivate: PropTypes.func,
    /** Function to handle clicking delete profile button */
    handleClickDelete: PropTypes.func,
    /** React-Intl's translation object */
    intl: PropTypes.object.isRequired,
    /** Object representing Keycloak autherization */
    keycloak: PropTypes.object,
    /** Whether the profile is private and being previewed as public or not */
    previewPublic: PropTypes.bool,
    /** Object containing data to display on profile */
    profileInfo: PropTypes.object,
    /** Whether this is a public profile view or not*/
    publicLayout: PropTypes.bool,
    /** function to set the value of previewPublic */
    setPreviewPublicState: PropTypes.func,
    /** function to set the value of settingsSidebar */
    setSidebarOpenState: PropTypes.func,
    /** Function to call in order to apply changes made to publicly visible cards */
    updateCardVisibility: PropTypes.func,
    /** List of publicly visible cards ( This will include unapplied changes when on your own profile) */
    visibleProfileCards: PropTypes.objectOf(PropTypes.bool),
    /** Width of the browser window */
    windowWidth: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    const { intl } = this.props;

    this.alwaysUngroupedCards = [
      {
        visibilityKey: "skills",
        renderFunction: this.renderSkillsCard
      },
      {
        visibilityKey: "competencies",
        renderFunction: this.renderCompetenciesCard
      },
      {
        visibilityKey: "developmentalGoals",
        renderFunction: this.renderDevelopmentalGoalsCard
      },
      {
        visibilityKey: "education",
        renderFunction: this.renderEducationCard
      },
      {
        visibilityKey: "careerOverview",
        renderFunction: this.renderCareerOverviewCard
      },
      {
        visibilityKey: "projects",
        renderFunction: this.renderProjectsCard
      },
      {
        visibilityKey: "careerInterests",
        renderFunction: this.renderCareerInterests
      }
    ];

    this.renderValue = renderValue.bind(this, intl);
  }

  render() {
    const {
      changeLanguage,
      confirmItem,
      clearConfirmItem,
      editable,
      keycloak,
      previewPublic,
      profileInfo,
      publicLayout,
      setSidebarOpenState,
      settingsSidebar
    } = this.props;

    if (profileInfo === undefined) {
      return (
        <Dimmer active>
          <Grid>
            <Grid.Row>
              <Loader />
            </Grid.Row>

            <Grid.Row>
              <FormattedMessage id="profile.gathering.profile.info" />
            </Grid.Row>
          </Grid>
        </Dimmer>
      );
    }

    return (
      <EditableProvider value={{ editable, profileInfo }}>
        <NavigationBar
          changeLanguage={changeLanguage}
          keycloak={keycloak}
          logoRedirectHome={true}
        />

        <Confirm
          content={confirmItem && confirmItem.content}
          header={confirmItem && confirmItem.header}
          onCancel={clearConfirmItem}
          onConfirm={() => {
            confirmItem &&
              confirmItem.handleConfirm &&
              confirmItem.handleConfirm();
            clearConfirmItem(); /*NOTE: I realised clearing the confirmItem after running it's handleConfirm
                                  makes it impossible for a confirmItem to open another confirmItem.
                                  I am not sure if clearing the item first could cause other unexpected behavior */
          }}
          open={Boolean(confirmItem)}
        />

        <Sidebar.Pushable>
          {this.renderSidebar()}
          <Sidebar.Pusher>
            <div style={{ minHeight: "calc(100vh - 53px)" }}>
              <div className="body">
                {settingsSidebar !== null && (
                  <Button
                    color="blue"
                    onClick={() => setSidebarOpenState(!settingsSidebar)}
                  >
                    <FormattedMessage id="profile.settings.and.privacy" />
                  </Button>
                )}

                {publicLayout || (settingsSidebar && previewPublic)
                  ? this.renderPublicProfileBody()
                  : this.renderPrivateProfileBody()}
              </div>
            </div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </EditableProvider>
    );
  }

  renderSidebar() {
    const {
      applyVisibleProfileCards,
      disableApplyVisibleProfileCards,
      handleClickDeactivate,
      handleClickDelete,
      intl,
      settingsSidebar,
      updateCardVisibility,
      visibleProfileCards,
      windowWidth,
      setSidebarOpenState
    } = this.props;

    return (
      <Sidebar
        as={Menu}
        animation={
          windowWidth > SIDEBAR_ANIMATION_DETERMINING_WIDTH
            ? "push"
            : "scale down"
        }
        visible={settingsSidebar}
        vertical
      >
        <Menu.Menu>
          <Menu.Header>
            <FormattedMessage id="profile.preview.public.view" />
          </Menu.Header>
          <Menu.Item>
            <Checkbox
              label="Use Public View"
              toggle
              onChange={(e, { checked }) =>
                this.setState({ previewPublic: checked })
              }
            />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Header>
            <FormattedMessage id="profile.select.publicly.visible.cards" />
          </Menu.Header>
          {map(visibleProfileCards, (value, key) => (
            <Menu.Item position="right">
              <Checkbox
                defaultChecked={value}
                label={intl.formatMessage({
                  id:
                    "profile." +
                    key
                      .toString()
                      .replace(/([A-Z])/g, ".$1")
                      .toLowerCase()
                })}
                id={intl.formatMessage({
                  id:
                    "profile." +
                    key
                      .toString()
                      .replace(/([A-Z])/g, ".$1")
                      .toLowerCase()
                })}
                defaultChecked={value}
                toggle
                onChange={(e, { checked }) =>
                  updateCardVisibility(key, checked)
                }
                toggle
              />
            </Menu.Item>
          ))}
          <Menu.Item>
            <Button
              color="blue"
              disabled={disableApplyVisibleProfileCards}
              fluid
              onClick={applyVisibleProfileCards}
            >
              <FormattedMessage id="button.apply" />
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              color="blue"
              fluid
              onClick={() => setSidebarOpenState(!settingsSidebar)}
            >
              <FormattedMessage id="button.close" />
            </Button>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu>
          <Menu.Header>
            <FormattedMessage id="profile.account.hide.and.deactivate" />
          </Menu.Header>
          <Menu.Item>
            <Button
              color="blue"
              fluid
              onClick={() =>
                this.setState({
                  confirmItem: {
                    header: intl.formatMessage({
                      id: "profile.hide.account.confirm.header"
                    }),
                    content: intl.formatMessage({
                      id: "profile.hide.account.confirm.content"
                    }),
                    handleConfirm: handleClickDelete
                  }
                })
              }
            >
              <FormattedMessage id="button.hide.account" />
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              color="blue"
              fluid
              onClick={() =>
                this.setState({
                  confirmItem: {
                    header: intl.formatMessage({
                      id: "profile.deactivate.account.confirm.header"
                    }),
                    content: intl.formatMessage({
                      id: "profile.deactivate.account.confirm.content"
                    }),
                    handleConfirm: handleClickDeactivate
                  }
                })
              }
            >
              <FormattedMessage id="button.deactivate.account" />
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Sidebar>
    );
  }

  /** Renders the profile body layout shown on a public profile or when previewing the public display */
  renderPublicProfileBody() {
    const { windowWidth, visibleProfileCards } = this.props;

    let ungroupedCardItems;
    let groupedCardRows;

    //Wide width - some cards up top need to be grouped
    if (windowWidth > MEDIUM_WIDTH) {
      ungroupedCardItems = this.alwaysUngroupedCards;

      //generate primary group cards
      const infoVisible = visibleProfileCards["info"];
      const primaryGroupRow = (
        <Grid.Row>
          <Grid.Column width={infoVisible ? 11 : 16}>
            {this.renderPrimaryCard()}
          </Grid.Column>
          {infoVisible && (
            <Grid.Column width={5}> {this.renderInfoCard()} </Grid.Column>
          )}
        </Grid.Row>
      );

      //Generate secondary group of cards
      let secondaryGroupRow;
      const hasLeftCol =
        visibleProfileCards["manager"] ||
        visibleProfileCards["talentManagement"];
      const hasRightCol = visibleProfileCards["officialLanguage"];

      if (hasLeftCol || hasRightCol) {
        secondaryGroupRow = (
          <Grid.Row>
            {hasLeftCol && (
              <Grid.Column width={hasRightCol ? 11 : 16}>
                {visibleProfileCards["manager"] && this.renderManagerCard()}
                {visibleProfileCards["manager"] &&
                  visibleProfileCards["talentManagement"] && (
                    <div style={{ height: "2em" }} />
                  )}
                {visibleProfileCards["talentManagement"] &&
                  this.renderTalentManagementCard()}
              </Grid.Column>
            )}
            {hasRightCol && (
              <Grid.Column width={hasLeftCol ? 5 : 16}>
                {this.renderLanguageProficiencyCard()}
              </Grid.Column>
            )}
          </Grid.Row>
        );
      }

      groupedCardRows = [primaryGroupRow, secondaryGroupRow];

      //Narrow view - no cards are grouped
    } else {
      groupedCardRows = null;

      ungroupedCardItems = [
        { visibilityKey: null, renderFunction: this.renderPrimaryCard },
        { visibilityKey: "info", renderFunction: this.renderInfoCard },
        { visibilityKey: "manager", renderFunction: this.renderManagerCard },
        {
          visibilityKey: "officialLanguage",
          renderFunction: this.renderLanguageProficiencyCard
        },
        {
          visibilityKey: "talentManagement",
          renderFunction: this.renderTalentManagementCard
        },
        ...this.alwaysUngroupedCards
      ];
    }

    return (
      <Grid className="bodyGrid">
        {groupedCardRows}
        {ungroupedCardItems
          .filter(
            ({ visibilityKey }) =>
              !visibilityKey || visibleProfileCards[visibilityKey]
          )
          .map(({ renderFunction }) => (
            <Grid.Row>
              <Grid.Column>{renderFunction.bind(this)()}</Grid.Column>
            </Grid.Row>
          ))}
      </Grid>
    );
  }

  /** Renderes the private profile layout when on own profile or possibly in future for HR */
  renderPrivateProfileBody() {
    const { windowWidth } = this.props;

    let ungroupedCardItems;
    let groupedCardRows;

    //Wide width - some cards up top need to be grouped
    if (windowWidth > MEDIUM_WIDTH) {
      ungroupedCardItems = this.alwaysUngroupedCards;

      groupedCardRows = [
        <Grid.Row>
          <Grid.Column width={11}> {this.renderPrimaryCard()} </Grid.Column>
          <Grid.Column width={5}> {this.renderInfoCard()} </Grid.Column>
        </Grid.Row>,
        <Grid.Row className="noGapBelow">
          <Grid.Column className="noGapAbove noGapBelow" width={11}>
            {this.renderManagerCard()}
            <div style={{ height: "2em" }} />
            {this.renderTalentManagementCard()}
          </Grid.Column>
          <Grid.Column className="noGapAbove noGapBelow" width={5}>
            {this.renderLanguageProficiencyCard()}
          </Grid.Column>
        </Grid.Row>
      ];

      //Narrow view - no cards are grouped
    } else {
      groupedCardRows = null;

      ungroupedCardItems = [
        { visibilityKey: null, renderFunction: this.renderPrimaryCard },
        { visibilityKey: "info", renderFunction: this.renderInfoCard },
        { visibilityKey: "manager", renderFunction: this.renderManagerCard },
        {
          visibilityKey: "officialLanguage",
          renderFunction: this.renderLanguageProficiencyCard
        },
        {
          visibilityKey: "talentManagement",
          renderFunction: this.renderTalentManagementCard
        },
        ...this.alwaysUngroupedCards
      ];
    }

    return (
      <Grid className="bodyGrid">
        {groupedCardRows}
        {ungroupedCardItems.map(({ renderFunction }) => (
          <Grid.Row>
            <Grid.Column>{renderFunction.bind(this)()}</Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    );
  }

  renderPrimaryCard() {
    const { intl, profileInfo } = this.props;

    const {
      branch,
      cellphone,
      email,
      firstName,
      githubUrl,
      jobTitle,
      lastName,
      linkedinUrl,
      location,
      organizationList,
      team,
      telephone,
      gcconnexUrl,
      manager
    } = profileInfo;

    return (
      <EditWrapperController
        id="primaryCard"
        editOptionPaths={{
          location: "api/option/getLocation"
        }}
        form={PrimaryInformationFormController}
        formName={intl.formatMessage({
          id: "profile.edit.primary.information"
        })}
      >
        <Card className="profileCard compactCard" fluid>
          <Card.Content>
            <Grid>
              <Grid.Row>
                <h1
                  style={{
                    display: "inline-flex",
                    marginBottom: "6px",
                    marginLeft: "25px",
                    marginTop: "0px"
                  }}
                >
                  {firstName} {lastName}
                </h1>
              </Grid.Row>

              <Grid.Row className="noGapBelow">
                <EditWrapperController
                  form={null}
                  formName="TODO profile picture form"
                  buttonType="profilePictureButton"
                  wrapperType="compactWrapper"
                >
                  <img
                    alt="missing profile"
                    src={tempProfilePic}
                    style={{
                      maxHeight: "200px",
                      maxWidth: "250px",
                      paddingLeft: "50px",
                      width: "100%"
                    }}
                  />
                </EditWrapperController>
                <div
                  style={{
                    display: "inline",
                    float: "right",
                    minWidth: "450px",
                    overflow: "hidden",
                    paddingLeft: "50px"
                  }}
                >
                  <h3 style={{ marginBottom: "3px" }}>{jobTitle}</h3>

                  <Popup
                    on="hover"
                    wide="very"
                    trigger={
                      <p className="noGapAbove" style={{ fontSize: "25px" }}>
                        <b>
                          {branch} <Icon name="fork" />
                        </b>
                      </p>
                    }
                  >
                    <Popup.Content>
                      {this.renderOrganizationList(
                        team ? [...organizationList, team] : organizationList
                      )}
                    </Popup.Content>
                  </Popup>

                  <div className="phoneNumberArea">
                    <b>
                      <FormattedMessage id="profile.telephone" />:
                    </b>
                    {this.renderValue(telephone)}
                  </div>
                  <div className="phoneNumberArea">
                    <b>
                      <FormattedMessage id="profile.cellphone" />:
                    </b>

                    {this.renderValue(cellphone)}
                  </div>
                  <div>{email}</div>

                  <div>{this.renderValue(location.description)}</div>
                </div>
              </Grid.Row>
            </Grid>
          </Card.Content>

          <Menu
            color="blue"
            inverted
            widths={
              [linkedinUrl, githubUrl, gcconnexUrl].filter(word => word)
                .length + 1
            }
          >
            {linkedinUrl && (
              <Menu.Item href={linkedinUrl} target="_blank">
                <Icon name="linkedin" />
                <FormattedMessage id="profile.linkedin" />
              </Menu.Item>
            )}

            {githubUrl && (
              <Menu.Item href={githubUrl} target="_blank">
                <Icon name="github" />
                <FormattedMessage id="profile.github" />
              </Menu.Item>
            )}
            {gcconnexUrl && (
              <Menu.Item href={gcconnexUrl} target="_blank">
                <Icon name="linkify" />
                <FormattedMessage id="profile.gcconnex" />
              </Menu.Item>
            )}
            <Menu.Item href={"mailto:" + email}>
              <Icon name="envelope" />
              <FormattedMessage id="profile.email" />
            </Menu.Item>
          </Menu>
        </Card>
      </EditWrapperController>
    );
  }

  renderInfoCard() {
    const { intl, profileInfo, windowWidth } = this.props;
    const {
      acting,
      actingPeriodEndDate,
      actingPeriodStartDate,
      classification,
      indeterminate,
      security,
      temporaryRole
    } = profileInfo;

    const substantiveItem = this.renderLabeledItem(
      intl.formatMessage({ id: "profile.substantive" }),
      this.renderValue(
        {
          [true]: intl.formatMessage({ id: "profile.indeterminate" }),
          [false]: intl.formatMessage({ id: "profile.term" }),
          [null]: null
        }[indeterminate]
      )
    );

    const classificationItem = this.renderLabeledItem(
      intl.formatMessage({
        id: "profile.classification"
      }),
      this.renderValue(classification.description)
    );

    const tempRoleItem = this.renderLabeledItem(
      intl.formatMessage({
        id: "profile.temporary.role"
      }),
      this.renderValue(temporaryRole.description)
    );

    const actingDisabled = !(acting && actingPeriodStartDate);

    const startDateString = moment(actingPeriodStartDate).format("DD/MM/YYYY");
    const endDateString =
      actingPeriodEndDate !== "Undefined"
        ? moment(actingPeriodEndDate).format("DD/MM/YYYY")
        : intl.formatMessage({ id: "profile.ongoing" });
    const actingDateText = actingDisabled ? (
      <span className="greyedOut">
        {intl.formatMessage({ id: "profile.na" })}
      </span>
    ) : (
      startDateString + " - " + endDateString
    );

    const actingItem = (
      <React.Fragment>
        {this.renderLabeledItem(
          intl.formatMessage({ id: "profile.acting.label.only" }),
          this.renderValue(acting.description, "profile.na", actingDisabled)
        )}

        {acting.description ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              paddingBottom: "16px"
            }}
          >
            {actingDateText}
          </div>
        ) : null}
      </React.Fragment>
    );

    const securityItem = this.renderLabeledItem(
      intl.formatMessage({ id: "profile.security" }),
      this.renderValue(security.description)
    );

    // When using the medium wideness view there are 2 columns of labeled cards
    if (windowWidth <= MEDIUM_WIDTH && windowWidth > SMALL_WIDTH) {
      return (
        <ProfileCardController
          editOptionPaths={{
            classification: "api/option/getGroupLevel",
            security: "api/option/getSecurityClearance",
            temporaryRole: "api/option/getTenure"
          }}
          form={LabelCardsFormController}
          formName={intl.formatMessage({ id: "profile.edit.info" })}
          cardName={intl.formatMessage({ id: "profile.info" })}
          className="labeledItemCard compactCard"
        >
          <Grid>
            <Grid.Column width={8}>
              <Grid>
                {substantiveItem}
                {classificationItem}
                {tempRoleItem}
              </Grid>
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid>
                {actingItem}
                {securityItem}
              </Grid>
            </Grid.Column>
          </Grid>
        </ProfileCardController>
      );
    }
    //When using the most wide or most skinny view there is only one column of labeled cards

    return (
      <ProfileCardController
        form={LabelCardsFormController}
        editOptionPaths={{
          classification: "api/option/getGroupLevel",
          security: "api/option/getSecurityClearance",
          temporaryRole: "api/option/getTenure"
        }}
        formName={intl.formatMessage({ id: "profile.edit.info" })}
        cardName={intl.formatMessage({ id: "profile.info" })}
        className="labeledItemCard compactCard"
        fullHeight={true}
      >
        <Grid columns={2} style={{ paddingTop: "16px" }}>
          {substantiveItem}
          {classificationItem}
          {tempRoleItem}
          {actingItem}
          {securityItem}
        </Grid>
      </ProfileCardController>
    );
  }

  renderManagerCard() {
    const { profileInfo, intl } = this.props;
    const { manager, team } = profileInfo;

    return (
      <ProfileCardController
        form={ManagerFormController}
        formName={intl.formatMessage({ id: "profile.edit.manager" })}
        cardName={intl.formatMessage({ id: "profile.team" })}
        className="noGapAbove"
      >
        <div>
          <span className="colorLabel" style={{ fontWeight: "bold" }}>
            <FormattedMessage id="profile.manager" />:
          </span>
          <span>{this.renderValue(manager)}</span>
        </div>
        <div>
          <span className="colorLabel" style={{ fontWeight: "bold" }}>
            <FormattedMessage id="profile.team" />:
          </span>
          <span>{this.renderValue(team)}</span>
        </div>
      </ProfileCardController>
    );
  }

  renderLanguageProficiencyCard() {
    const { intl, profileInfo, windowWidth } = this.props;
    const {
      firstLanguage,
      secondaryOralDate,
      secondaryOralProficiency,
      secondaryReadingDate,
      secondaryReadingProficiency,
      secondaryWritingDate,
      secondaryWritingProficiency
    } = profileInfo;

    return (
      <ProfileCardController
        form={LanguageProficiencyFormController}
        formName={intl.formatMessage({
          id: "profile.edit.language.proficiency"
        })}
        cardName={intl.formatMessage({ id: "profile.official.language" })}
        className={windowWidth > MEDIUM_WIDTH ? "compactCard" : null}
        fullHeight={windowWidth > MEDIUM_WIDTH}
      >
        <div>
          <span className="boldLabel">
            <FormattedMessage id="profile.first.language" />
          </span>
          <span>{this.renderValue(firstLanguage)}</span>
        </div>
        <p className="boldLabel noGapBelow">
          <FormattedMessage id="profile.second.language.proficiency" />
        </p>
        <Table
          basic="very"
          celled
          className="noGapAbove"
          collapsing
          style={{ margin: "0px auto" }}
          unstackable
        >
          <Table.Body id="proficiencyTableBody">
            <Table.Row>
              <Table.Cell>
                <FormattedMessage
                  className={secondaryReadingProficiency ? "greyedOut" : null}
                  id="profile.reading"
                />
              </Table.Cell>
              <Table.Cell>{secondaryReadingProficiency}</Table.Cell>
              <Table.Cell>
                {moment(secondaryReadingDate).isValid()
                  ? moment(secondaryReadingDate).format("ll")
                  : null}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <FormattedMessage
                  className={secondaryWritingProficiency ? "greyedOut" : null}
                  id="profile.writing"
                />
              </Table.Cell>
              <Table.Cell>{secondaryWritingProficiency}</Table.Cell>
              <Table.Cell>
                {moment(secondaryWritingDate).isValid()
                  ? moment(secondaryWritingDate).format("ll")
                  : null}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <FormattedMessage
                  className={secondaryOralProficiency ? "greyedOut" : null}
                  id="profile.oral"
                />
              </Table.Cell>
              <Table.Cell>{secondaryOralProficiency}</Table.Cell>
              <Table.Cell>
                {moment(secondaryOralDate).isValid()
                  ? moment(secondaryOralDate).format("ll")
                  : null}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </ProfileCardController>
    );
  }

  renderTalentManagementCard() {
    const { intl, profileInfo } = this.props;
    const { careerMobility, talentMatrixResult, exFeeder } = profileInfo;

    return (
      <ProfileCardController
        form={TalentManagementFormController}
        editOptionPaths={{
          careerMobility: "api/option/getCareerMobility",
          talentMatrixResult: "api/option/getTalentMatrixResult"
        }}
        formName={intl.formatMessage({ id: "profile.edit.talent.management" })}
        cardName={intl.formatMessage({ id: "profile.talent.management" })}
        className="noGapBelow"
      >
        <div>
          <span className="boldLabel">
            <FormattedMessage id="profile.career.mobility" />
          </span>
          <span>{this.renderValue(careerMobility.description)}</span>
        </div>
        <div>
          <span className="boldLabel">
            <FormattedMessage id="profile.talent.matrix.result" />
          </span>
          <span>{this.renderValue(talentMatrixResult.description)}</span>
        </div>
        {exFeeder && intl.formatMessage({ id: "profile.is.ex.feeder" })}
      </ProfileCardController>
    );
  }

  renderSkillsCard() {
    const { intl, profileInfo } = this.props;
    const currentSkills = profileInfo.skills;

    return this.renderGenericTagsCard(
      intl.formatMessage({ id: "profile.skills" }),
      intl.formatMessage({ id: "profile.edit.skills" }),
      currentSkills,
      SkillsFormController,
      {
        skills: "api/option/getSkill"
      }
    );
  }

  renderCompetenciesCard() {
    const { intl, profileInfo } = this.props;
    const { competencies } = profileInfo;

    return this.renderGenericTagsCard(
      intl.formatMessage({ id: "profile.competencies" }),
      intl.formatMessage({ id: "profile.edit.competencies" }),
      competencies,
      CompetenciesFormController,
      {
        competencies: "api/option/getCompetency"
      }
    );
  }

  renderDevelopmentalGoalsCard() {
    const { intl, profileInfo } = this.props;
    const { developmentalGoals } = profileInfo;

    return this.renderGenericTagsCard(
      intl.formatMessage({ id: "profile.developmental.goals" }),
      intl.formatMessage({ id: "profile.edit.developmental.goals" }),
      developmentalGoals,
      DevelopmentalGoalsFormController,
      {
        developmentalGoals: "api/option/getDevelopmentalGoals"
      }
    );
  }

  renderEducationCard() {
    const { intl, profileInfo } = this.props;
    const { education } = profileInfo;

    return (
      <HistoryCardController
        editOptionPaths={{
          school: "api/option/getSchool",
          diploma: "api/option/getDiploma"
        }}
        form={EducationFormController}
        cardEntries={education}
        formName={intl.formatMessage({ id: "profile.edit.education" })}
        cardName={intl.formatMessage({ id: "profile.education" })}
      />
    );
  }

  renderCareerOverviewCard() {
    const { intl, profileInfo } = this.props;
    const { careerSummary } = profileInfo;

    return (
      <HistoryCardController
        cardEntries={careerSummary}
        cardName={intl.formatMessage({ id: "profile.experience" })}
        form={CareerOverviewFormController}
        formName={intl.formatMessage({ id: "profile.edit.experience" })}
      />
    );
  }

  renderProjectsCard() {
    const { intl, profileInfo } = this.props;
    const currentProjects = profileInfo.projects || [];

    return this.renderGenericTagsCard(
      intl.formatMessage({ id: "profile.projects" }),
      intl.formatMessage({ id: "profile.edit.projects" }),
      currentProjects,
      ProjectsFormController
    );
  }

  renderCareerInterests() {
    const { intl, profileInfo } = this.props;

    const {
      interestedInRemote,
      relocationLocations,
      lookingForNewJob
    } = profileInfo;

    return (
      <ProfileCardController
        form={CareerInterestsFormController}
        formName={"Edit career interests"}
        cardName={"Career Interests"}
      >
        <div>
          <span className="boldLabel">
            <FormattedMessage id="profile.interested.in.remote" />
          </span>
          <span>
            {this.renderValue(
              {
                [null]: null,
                [true]: intl.formatMessage({ id: "profile.yes" }),
                [false]: intl.formatMessage({ id: "profile.no" })
              }[interestedInRemote]
            )}
          </span>
        </div>
        <div className="boldLabel">
          <FormattedMessage id="profile.willing.to.relocate.to" />
        </div>
        <div>
          {relocationLocations
            ? relocationLocations.map(element => (
                <Label color="blue" basic>
                  <p style={{ color: "black" }}>{element.description}</p>
                </Label>
              ))
            : null}
        </div>
        <span className="boldLabel">
          <FormattedMessage id="profile.looking.for.new.job" />
        </span>
        <span>
          {this.renderValue(lookingForNewJob && lookingForNewJob.description)}
        </span>
      </ProfileCardController>
    );
  }

  /**
   * Render a card that displays a list of tags
   * @param {PropTypes.string} cardName The string to use for the name of the profile card
   * @param {PropTypes.string} formName This string to use for the header of the edit modal form
   * @param {PropTypes.arrayOf(PropTypes.object)} cardTags Array of objects that contain a property text or description that contains the translated text for the tag
   * @param {PropTypes.element} form The form element to display in the modal
   * @param {PropTypes.objectOf(PropTypes.string)} editOptionPaths Object representing necessary requests for field options. Expects key value pairs of <optionName>:<backendRequestSubUrl>
   */
  renderGenericTagsCard(cardName, formName, cardTags, form, editOptionPaths) {
    return (
      <ProfileCardController
        form={form}
        formName={formName}
        cardName={cardName}
        editOptionPaths={editOptionPaths}
      >
        {cardTags.map((value, index) => (
          <Label color="blue" basic>
            <p style={{ color: "black" }}>{value.text || value.description}</p>
          </Label>
        ))}
      </ProfileCardController>
    );
  }

  /**
   * Renders a row with a Label text in the first column and a content elemenet or a fallback message in the second column
   * @param {PropTypes.string} labelText The text to place in the label
   * @param {PropTypes.element} contentElement The content element
   * @param {PropTypes.bool} disabled Whether the fallback message should be used even if a content element was provided or not
   */
  renderLabeledItem(labelText, contentElement, disabled) {
    const { intl } = this.props;
    return (
      <Grid.Row columns={2} style={{ padding: "3px 0px" }}>
        <Grid.Column
          style={{ textAlign: "center", padding: "3px 0px 3px 3px" }}
        >
          <Label
            basic
            color="blue"
            className={disabled ? "disabled" : null}
            fluid
            style={{
              fontSize: "12pt",
              fontWeight: "bold",
              width: "90%",
              padding: "5px"
            }}
          >
            <p style={{ color: "black" }}>{labelText}</p>
          </Label>
        </Grid.Column>
        <Grid.Column style={{ padding: "10px" }}>
          {disabled ? intl.formatMessage({ id: "profile.na" }) : contentElement}
        </Grid.Column>
      </Grid.Row>
    );
  }

  /**
   * Recursively creates a list out of an array of string items
   * @param {PropTypes.arrayOf(PropTypes.string)} unlistedItems The array of strings to display in the list
   * @param {PropTyles.element} generatedElement The currently generated element
   */
  renderOrganizationList(unlistedItems, generatedElement) {
    if (unlistedItems.length === 0) {
      return <List className="organizationList"> {generatedElement} </List>;
    }

    const nextItem = unlistedItems[0];

    generatedElement = (
      <List.Item>
        {unlistedItems.length > 1 ? (
          <List.Icon
            color="grey"
            flipped="horizontally"
            name="level up alternate"
          />
        ) : null}
        <List.Content>
          <List.Description>{nextItem}</List.Description>
          <List.List>{generatedElement}</List.List>
        </List.Content>
      </List.Item>
    );

    return this.renderOrganizationList(
      unlistedItems.slice(1, unlistedItems.length),
      generatedElement
    );
  }
}

export default injectIntl(ProfileLayoutView);
