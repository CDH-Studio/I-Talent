import React, { Component } from "react";

import { EditableConsumer } from "../editableProvider/editableProvider";
import PropTypes from "prop-types";
import EditWrapperView from "./editWrapperView";

/** Logic for the edit wrapper
 * Displays a profile section's edit button
 */
export default class EditWrapperController extends Component {
  static propTypes = {
    /** Extra class name to assign to button compontent */
    buttonType: PropTypes.string,
    /** Whether the children are editable and should be wrapped or the children should be rendered unwrapped */
    editOptionPaths: PropTypes.objectOf(PropTypes.string),
    /** The form component to render in the edit modal that gets displayed */
    form: PropTypes.func,
    /** The header text of the modal that displays the edit form */
    formName: PropTypes.string.isRequired,
    /** The current values of the object to be edited (Not all pairs in the object have to be editable by the form) */
    style: PropTypes.objectOf(PropTypes.string),
    /** The class name to assign to the wrapper div */
    wrapperType: PropTypes.string
  };

  render() {
    return (
      <EditableConsumer>
        {props => <EditWrapperView {...Object.assign({}, props, this.props)} />}
      </EditableConsumer>
    );
  }
}

EditWrapperController.defaultProps = {
  wrapperType: "defaultWrapper"
};
