import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Dimmer, Grid, Icon, Loader, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./editModal.css";

/** UI for modals used to edit a profile card */
export const renderEditButton = buttonType => {
  return (
    <div className={buttonType ? "editButton " + buttonType : "editButton"}>
      <Icon name="pencil alternate" />
    </div>
  );
};

/** UI for modals used to edit a profile card */
class editModalView extends Component {
  static propTypes = {
    /** Object of <optionName>:<backendRequestSubUrl> pairs */
    editOptionPaths: PropTypes.objectOf(PropTypes.string),
    /** function to call when opening modal */
    handleOpen: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const { buttonType, handleClose, handleOpen, name, open } = this.props;

    return (
      <Modal
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        trigger={renderEditButton(buttonType)}
      >
        <Modal.Header>{name}</Modal.Header>
        <Modal.Content>{this.renderContents()}</Modal.Content>
      </Modal>
    );
  }

  /** renders the modal contents
   * If editProfileOptions is null then a loading indicator is displayed
   * Otherwise it will render the edit form as long as the edit form was provided
   */
  renderContents() {
    const { editProfileOptions, form } = this.props;
    if (editProfileOptions === null) {
      return (
        <Dimmer active>
          <Grid>
            <Grid.Row>
              <Loader />
            </Grid.Row>

            <Grid.Row>Gathering edit options...</Grid.Row>
          </Grid>
        </Dimmer>
      );
    } else {
      return (
        form &&
        React.createElement(form, {
          handleCancel: e => this.setState({ open: false }),
          ...this.props
        })
      );
    }
  }
}

export default injectIntl(editModalView);
