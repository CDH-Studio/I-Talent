import React, { Component } from "react";
import DateInputFieldsView from "./dateInputFieldGroupView.js";
import PropTypes from "prop-types";

/**
 * Logic for a dateInputField used by editForms
 */
export default class DateInputFieldGroupController extends Component {
  static propTypes = {
    /** Whether the date group should be disabled or not */
    disabled: PropTypes.bool,
    /** UI label for the date field group */
    groupLabelText: PropTypes.string,
    /** The initial month */
    initialMonth: PropTypes.number,
    /** The initial year */
    initialYear: PropTypes.number,
    /** the name to prepend form fields with*/
    name: PropTypes.string,
    /** Function to call when the field is changed */
    updateField: PropTypes.func
  };
  render() {
    return <DateInputFieldsView {...this.props} />;
  }
}
