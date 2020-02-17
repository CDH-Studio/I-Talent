import React, { Component } from "react";
import HistoryCardView from "./historyCardView";
import PropTypes from "prop-types";

/** Logic for profile cards used to display education and experience */
export default class HistoryCardController extends Component {
  static propTypes = {
    /** Array of history items */
    cardEntries: PropTypes.arrayOf(PropTypes.object),
    /** Name displayed on the card */
    cardName: PropTypes.string.isRequired,
    /** Key value pairs of <field name>:<backend suburl to get array of options from> */
    editOptionPaths: PropTypes.objectOf(PropTypes.string),
    /** The form to display for editing */
    form: PropTypes.func.isRequired,
    /** Name displayed on the form */
    formName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleToggleExpanded = this.handleToggleExpanded.bind(this);
  }

  /** toggles whether the card should expand to show more than 2 items or not */
  handleToggleExpanded() {
    this.setState(oldState => ({ expanded: !oldState.expanded }));
  }

  render() {
    return (
      <HistoryCardView
        expanded={this.state.expanded}
        handleToggleExpanded={this.handleToggleExpanded}
        {...this.props}
      />
    );
  }
}
