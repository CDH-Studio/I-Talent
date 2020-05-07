import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import prepareInfo from "../../functions/prepareInfo";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import config from "../../config";
import { Popup, Message } from "semantic-ui-react";

import SearchFormView from "./searchFormView";

const backendAddress = config.backendAddress;

/** Logic for search forms used in /home and /results routes */
class SearchFormController extends Component {
  propTypes = {
    /** Whether to display advanced fields by default or not */
    defaultAdvanced: PropTypes.bool,
    /** The maximum width of the form */
    maxFormWidth: PropTypes.number,
    /** Whether the search bar is using the navigation bar layout. NOTE: the way I wrote the code you still need to specify advancedSearch to get advanced fields */
    navBarLayout: PropTypes.bool,
    /** Whether to display a toggle button or not */
    toggleButton: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    const { defaultAdvanced } = this.props;

    const windowLocation = window.location.toString();

    if (windowLocation.includes("/results")) {
      this.fields = queryString.parseUrl(decodeURI(windowLocation), {
        arrayFormat: "bracket",
      }).query;
    } else {
      this.fields = {};
    }

    this.state = {
      advancedOptions: null,
      advancedSearch: defaultAdvanced,
      disableSearch: Object.entries(this.fields).length === 0,
    };

    this.checkDisabled = this.checkDisabled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getAdvancedOptions = this.getAdvancedOptions.bind(this);
  }

  /** Gathers the options for advanced search fields */
  async getAdvancedOptions() {
    const lang = localStorage.getItem("lang") || "en";
    let advancedOptions = {
      classification: prepareInfo(
        (await axios.get(backendAddress + "api/option/getGroupLevel")).data,
        lang
      ).map((obj) => ({
        key: obj.id, //obj.description,
        text: obj.description,
        value: obj.id,
      })),
      developmentalGoals: prepareInfo(
        (await axios.get(backendAddress + "api/option/getDevelopmentalGoals"))
          .data,
        lang
      ).map((obj) => ({
        key: obj.id, //obj.description,
        text: obj.description,
        value: obj.id,
      })),
      location: prepareInfo(
        (await axios.get(backendAddress + "api/option/getLocation")).data,
        lang
      ).map((obj) => ({
        key: obj.id, //obj.description,
        text: obj.description,
        value: obj.id,
      })),
      branch: (await axios.get(backendAddress + "api/option/getBranch")).data
        .filter((elem) => elem.description && elem.description.en)
        .map((obj) => ({
          key: obj.description.en,
          text: obj.description[lang],
          value: obj.description.en,
        })),
    };

    this.setState({ advancedOptions: advancedOptions });
  }

  /** Updates whether the search button should be disabled */
  checkDisabled() {
    const { navBarLayout } = this.props;
    const { advancedSearch } = this.state;
    const fieldKeys = Object.keys(this.fields);
    const navBarEmpty = navBarLayout && fieldKeys.length === 0;
    const basicHomeEmpty =
      !navBarLayout && !advancedSearch && !fieldKeys.includes("searchValue");

    const advancedKeyLengthTarget = +fieldKeys.includes("searchValue");
    const advancedHomeEmpty =
      !navBarLayout &&
      advancedSearch &&
      !(fieldKeys.length > advancedKeyLengthTarget);
    const isDisabled = Boolean(
      navBarEmpty || basicHomeEmpty || advancedHomeEmpty
    );
    this.setState({
      disableSearch: isDisabled,
    });
  }

  /**
   * Handles updates to the values of fields
   * @param {PropTypes.object} e unused event object
   * @param {PropTypes.string} name The name of the field being updated
   * @param {PropTypes.node} value The new field value for inputs and dropdowns
   * @param {PropTypes.bool} checked The new field value for checkboxes
   */
  handleChange(e, { name, value, checked }) {
    const newVal = value || checked;
    if (!newVal || newVal.length === 0) {
      delete this.fields[name];
      this.checkDisabled();
    } else {
      this.fields[name] = newVal;
      this.setState({
        disableSearch: false,
      });
    }
  }

  /**
   * redirects to /route with the search encoded in a query string
   */
  handleSubmit() {
    const { redirectFunction } = this.props;
    const oldUrl = window.location.toString();
    let query;

    const { navBarLayout } = this.props;
    const { advancedSearch } = this.state;
    const fieldKeys = Object.keys(this.fields);
    const basicHomeEmpty =
      !navBarLayout && !advancedSearch && !fieldKeys.includes("searchValue");
    const advancedKeyLengthTarget = +fieldKeys.includes("searchValue");
    const advancedHomeEmpty =
      !navBarLayout &&
      advancedSearch &&
      !(fieldKeys.length > advancedKeyLengthTarget);
    console.log("NAV BAR LAYOUT: ", this.props.navBarLayout);
    if (this.state.advancedSearch) {
      if (advancedHomeEmpty) {
        this.props.setEmpty(true);
      } else {
        delete this.fields.fuzzySearch;

        query = queryString.stringify(this.fields, { arrayFormat: "bracket" });
        redirectFunction("/secured/results/fuzzySearch?" + encodeURI(query));
      }
    } else if (basicHomeEmpty) {
      this.props.setEmpty(true);
    } else {
      query = queryString.stringify(
        {
          searchValue: this.fields.searchValue,
        },
        { arrayFormat: "bracket" }
      );

      redirectFunction("/secured/results/fuzzySearch?" + encodeURI(query));
    }

    if (oldUrl.includes("/results")) {
      window.location.reload();
    }
  }

  /**
   * Toggles between basic and advanced search forms
   */
  handleToggle() {
    this.setState(
      (oldState) => ({
        advancedSearch: !oldState.advancedSearch,
      }),
      () => this.checkDisabled()
    );
  }

  render() {
    const { navBarLayout, maxFormWidth, toggleButton } = this.props;

    return (
      <SearchFormView
        advancedOptions={this.state.advancedOptions}
        advancedSearch={this.state.advancedSearch}
        defaultValues={this.fields}
        disableSearch={this.state.disableSearch}
        getAdvancedOptions={this.getAdvancedOptions}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleToggle={toggleButton ? this.handleToggle : null}
        maxFormWidth={maxFormWidth}
        navBarLayout={navBarLayout}
        defaultValues={this.fields}
        disableSearch={this.state.disableSearch}
        isEmpty={this.isEmpty}
      />
    );
  }
}
SearchFormController.defaultProps = {
  advancedFieldWidth: "400px",
  invertLabels: false,
  departments: [
    { key: "department1", text: "department1", value: "department1" },
    { key: "department2", text: "department2", value: "department2" },
  ],
  invertLabels: true,
  jobTitles: [
    { key: "Job1", text: "Job1", value: "Job1" },
    { key: "Job2", text: "Job2", value: "Job2" },
  ],
  locations: [
    { key: "locations1", text: "locations1", value: "locations1" },
    { key: "locations2", text: "locations2", value: "locations2" },
  ],
  primaryFieldWidth: "800px",
  showAdvancedFields: true,
};

export default injectIntl(SearchFormController);
