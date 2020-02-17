import React, { Component } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import "./editWrapper.css";

import EditModalController from "../editModal/editModalController";

/** UI for the edit wrapper
 * Displays a profile section's edit button
 */
class EditWrapperView extends Component {
  static propTypes = {
    /** Extra class name to assign to button compontent */
    buttonType: PropTypes.string,
    /** Whether the children are editable and should be wrapped or the children should be rendered unwrapped */
    editable: PropTypes.bool,
    /** Object of <optionName>:<backendRequestSubUrl> pairs */
    editOptionPaths: PropTypes.objectOf(PropTypes.string),
    /** The form component to render in the edit modal that gets displayed */
    form: PropTypes.func,
    /** The header text of the modal that displays the edit form */
    formName: PropTypes.string.isRequired,
    /** The current values of the object to be edited (Not all pairs in the object have to be editable by the form) */
    profileInfo: PropTypes.object.isRequired,
    /** Extra styling options for the wrapper. Note: I don't think this is needed any more? */
    style: PropTypes.objectOf(PropTypes.string),
    /** The class name to assign to the wrapper div */
    wrapperType: PropTypes.string
  };

  render() {
    const { children } = this.props;

    return this.renderEditWrappedChildren() || children;
  }

  /**
   * returns the wrapped children if they should be wrapped
   */
  renderEditWrappedChildren() {
    const {
      buttonType,
      children,
      editable,
      editOptionPaths,
      form,
      formName,
      profileInfo,
      style,
      wrapperType
    } = this.props;

    if (editable) {
      return (
        <div className={wrapperType} style={style}>
          <EditModalController
            buttonType={buttonType}
            editOptionPaths={editOptionPaths}
            form={form}
            name={formName}
            profileInfo={profileInfo}
          />
          {children}
        </div>
      );
    }
  }
}

export default injectIntl(EditWrapperView);
