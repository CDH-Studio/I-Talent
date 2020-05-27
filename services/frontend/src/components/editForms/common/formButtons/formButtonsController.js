import React, { Component } from "react";
import PropTypes from "prop-types";
import FormButtonsView from "./formButtonsView";

/**
 * logic for buttons to include in forms
 */
export default class FormButtonsController extends Component {
  static propTypes = {
    /** I'm not sure if this is needed */
    fields: PropTypes.any,
    /** function to apply an edit to a card */
    handleApply: PropTypes.func,
    /** function to cancel editting a card */
    handleCancel: PropTypes.func,
    /** function to go to next form on /setup route */
    handleNext: PropTypes.func,
    /** function to go to previous form on /setup route */
    handlePrevious: PropTypes.func,
    /** intl-react translation object */
    intl: PropTypes.object,
    /** Whether this is an early register or not */
    isEarlyRegister: PropTypes.bool
  };

  render() {
    return <FormButtonsView {...this.props} />;
  }
}
