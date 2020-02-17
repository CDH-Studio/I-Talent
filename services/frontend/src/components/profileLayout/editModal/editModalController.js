import React, { Component } from "react";
import axios from "axios";
import { Checkbox, Input, Select } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import PropTypes from "prop-types";

import { formatOptions } from "../../../functions/formTools";
import EditGenericModalView from "./editModalView";
import config from "../../../config";
const { backendAddress } = config;

/** Logic for modals used to edit a profile card */
export default class EditModalController extends Component {
  static propTypes = {
    /** Object representing necessary requests for field options. Expects key value pairs of <optionName>:<backendRequestSubUrl> */
    editOptionPaths: PropTypes.objectOf(PropTypes.string)
  };

  constructor(props) {
    super(props);
    const { editOptionPaths } = this.props;

    this.state = {
      editProfileOptions: editOptionPaths ? null : {},
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /** Initiate gathering editProfileOptions if they are not already provided.
   * The setup page gathers all the options upon loading so the user doesn't need to keep waiting for options to load every time they go to the next form.
   * On the profile page options are only gathered upon the first time the edit modal is opened.
   */
  handleOpen() {
    if (this.state.editProfileOptions === null) {
      this.getEditOptions();
    }
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  /** asyncronously gathers edit options and then updates then assigns this.state.editProfileOptions a non null value. When this state change happens the form will be displayed instead of a loading indicator */
  async getEditOptions() {
    const { editOptionPaths } = this.props;
    let editProfileOptions = {};
    for (let key in editOptionPaths) {
      editProfileOptions[key] = formatOptions(
        (await axios.get(backendAddress + editOptionPaths[key])).data
      );
    }

    this.setState({
      editProfileOptions: editProfileOptions
    });
  }

  render() {
    return (
      <EditGenericModalView
        {...this.props}
        editProfileOptions={this.state.editProfileOptions}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        open={this.state.open}
      />
    );
  }
}

/** Generates the common props used by profile form fields
 */
export const generateCommonProps = (name, control, props, dropdownControl) => {
  const { editProfileOptions, fields, intl, profileInfo, updateField } = props;

  //convert camelcase to `.` seperated and add `profile.` to beginning
  let intlId = "profile." + name.replace(/([A-Z])/g, ".$1").toLowerCase();

  let commonProps = {
    control: control,
    fluid: true,
    label: intl.formatMessage({ id: intlId }),
    name: name,
    onChange: updateField,
    placeholder: profileInfo[name]
  };

  if (dropdownControl) {
    commonProps.options = editProfileOptions[name];
    commonProps.defaultValue = profileInfo[name];
    commonProps.placeholder = null;
  } else if (control === Checkbox) {
    commonProps.defaultChecked = profileInfo[name];
  } else if (control === Select) {
    commonProps.defaultValue = profileInfo[name];
    commonProps.options = editProfileOptions[name];
  } else if (control === Input) {
    commonProps.defaultValue = profileInfo[name];
  } else if (control === DateInput) {
    commonProps.value = fields[name];
    commonProps.iconPosition = "right";
    commonProps.closable = true;
    commonProps.dateFormat = "MMM DD YYYY";
  }

  return commonProps;
};
