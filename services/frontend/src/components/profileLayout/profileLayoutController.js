import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import omit from "lodash/omit";

import prepareInfo from "../../functions/prepareInfo";

import ProfileLayoutView from "./profileLayoutView";
import { injectIntl } from "react-intl";

import config from "../../config";
const { backendAddress } = config;

/** Logic for the layout of the /profile route */
class ProfileLayoutController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** Clears the item being confirmed in the Confirm modal */
    editable: PropTypes.bool,
    /** React-Intl's translation object */
    intl: PropTypes.object.isRequired,
    /** Object representing Keycloak autherization */
    keycloak: PropTypes.object,
    /** Object containing data to display on profile */
    profileInfo: PropTypes.object,
    /** Whether this is a public profile view or not*/
    publicLayout: PropTypes.bool,
    /** List of publicly visible cards
     * ( This will NOT include unapplied changes when on your own profile, unlike the visbleProfileCards prop this component passes to the view) */
    visibleProfileCards: PropTypes.objectOf(PropTypes.bool),
  };

  constructor(props) {
    super(props);

    const { editable } = this.props;

    this.state = {
      changedCardVisibilities: [], // Tracks which profile cards have had their visibilities changes and their new values
      confirmItem: null, // The confirmation item to display in a Confirm modal
      previewPublic: false, // Whether the profile is private and being previewed as public or not
      settingsSidebar: editable ? false : null, // Whether the settings sidebar is visible or not
      windowWidth: window.innerWidth, // Tracks the width of the browser window
    };

    this.applyVisibleProfileCards = this.applyVisibleProfileCards.bind(this);
    this.clearConfirmItem = this.clearConfirmItem.bind(this);
    this.determineWidth = this.determineWidth.bind(this);
    this.handleClickDeactivate = this.handleClickDeactivate.bind(this);
    this.handleClickDeactivate = this.handleClickDeactivate.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.setPreviewPublicState = this.setPreviewPublicState.bind(this);
    this.setSidebarOpenState = this.setSidebarOpenState.bind(this);
    this.updateCardVisibility = this.updateCardVisibility.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.determineWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.determineWidth);
  }

  render() {
    const {
      changeLanguage,
      editable,
      keycloak,
      profileInfo,
      updateProfileInfo,
      visibleProfileCards,
    } = this.props;

    if (profileInfo)
      document.title =
        profileInfo.firstName + " " + profileInfo.lastName + " | UpSkill";

    return (
      <ProfileLayoutView
        applyVisibleProfileCards={this.applyVisibleProfileCards}
        changeLanguage={changeLanguage}
        clearConfirmItem={this.clearConfirmItem}
        confirmItem={this.state.confirmItem}
        disableApplyVisibleProfileCards={
          this.state.changedCardVisibilities.length === 0
        }
        editable={editable}
        handleClickDeactivate={this.handleClickDeactivate}
        handleClickDelete={this.handleClickDelete}
        keycloak={keycloak}
        previewPublic={this.state.previewPublic}
        profileInfo={prepareInfo(
          profileInfo,
          localStorage.getItem("lang") || "en",
          {
            acting: undefined,
            actingPeriodStartDate: undefined,
            developmentalGoals: [],
            careerSummary: [],
            competencies: [],
            education: [],
            organizationList: [],
            projects: [],
            skills: [],
          }
        )}
        publicLayout={!editable} // note: will probably need to change when special roles work
        setPreviewPublicState={this.setPreviewPublic}
        setSidebarOpenState={this.setSidebarOpenState}
        settingsSidebar={this.state.settingsSidebar}
        updateCardVisibility={this.updateCardVisibility}
        updateProfileInfo={updateProfileInfo}
        visibleProfileCards={{
          ...visibleProfileCards,
          ...this.state.changedCardVisibilities,
        }}
        windowWidth={this.state.windowWidth}
      />
    );
  }

  /**
   * Updates the public visibility of a card
   * @param {PropTypes.string} visibilityKey
   * @param {Prop.bool} value
   */
  updateCardVisibility(visibilityKey, value) {
    const { visibleProfileCards } = this.props;

    if (visibleProfileCards[visibilityKey] === value) {
      this.setState((oldState) => ({
        changedCardVisibilities: omit(
          oldState.changedCardVisibilities,
          visibilityKey
        ),
      }));
    } else {
      this.setState((oldState) => ({
        changedCardVisibilities: {
          ...oldState.changedCardVisibilities,
          [visibilityKey]: value,
        },
      }));
    }
  }

  /** Updates the visible profile cards on the backend and refreshes the page */
  applyVisibleProfileCards() {
    const { visibleProfileCards } = this.props;
    let url = backendAddress + "api/profile/" + localStorage.getItem("userId");
    axios
      .put(url, {
        visibleProfileCards: {
          ...visibleProfileCards,
          ...this.state.changedCardVisibilities,
        },
      })
      .then((response) => window.location.reload())
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      changedCardVisibilities: [],
    });
  }

  /** updates the window width state */
  determineWidth() {
    this.setState({ windowWidth: window.innerWidth });
  }

  /** Clears the item being confirmed in the Confirm modal */
  clearConfirmItem() {
    this.setState({ confirmItem: null });
  }

  /** Sets whether this is a private profile and previewing public view or not */
  setPreviewPublicState(value) {
    this.setState({ previewPublic: value });
  }

  /** Sets whether the profile settings sidebar is open*/
  setSidebarOpenState(value) {
    this.setState({ settingsSidebar: value });
  }

  /** TODO */
  handleClickDelete() {}

  /** TODO */
  handleClickDeactivate() {}
}

export default injectIntl(ProfileLayoutController);
