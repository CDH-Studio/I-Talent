import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Grid, Button, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

import PropTypes from "prop-types";

import FormButtonsController from "../formButtons/formButtonsController";
import "./historyItemsContainer.css";
import "../form.css";

/** UI for a list of form items.
 *
 * NOTE: Code could be reworked to remove props like contentName, subheader name, etc.
 * these were made when I though it would be possible to use the same form type for education and experience items
 */
class HistoryItemsContainerView extends Component {
  static propTypes = {
    /** Function to add a new item */
    addItem: PropTypes.func.isRequired,
    /** Name for the content field */
    contentName: PropTypes.string,
    /** Object with key value pairs of <field name>:<array of field objects */
    editProfileOptions: PropTypes.objectOf(PropTypes.array),
    /** Function to apply changes when editing a card */
    handleApply: PropTypes.func,
    /** Function to cancel editing a card */
    handleCancel: PropTypes.func,
    /** Function to go to next form when on /setup route */
    handleNext: PropTypes.func,
    /** Function to go to previous form when on /setup route */
    handlePrevious: PropTypes.func,
    /** Function to handle register when on /setup route */
    handleRegister: PropTypes.func,
    /** Name of the header field */
    headerName: PropTypes.string,
    /** Whether the user is on the /setup route and is not on the final setup form or not */
    isEarlyRegister: PropTypes.bool,
    /** The element type to use for items */
    itemType: PropTypes.element,
    /** objects represeting field values for items */
    items: PropTypes.arrayOf(PropTypes.object),
    /** Function to remove an item */
    removeItem: PropTypes.func,
    /** String to use for the sub header */
    subheaderName: PropTypes.string
  };

  render() {
    const {
      addItem,
      contentName,
      editProfileOptions,
      handleApply,
      handleCancel,
      handleNext,
      handlePrevious,
      handleRegister,
      headerName,
      isEarlyRegister,
      itemType,
      items,
      removeItem,
      setContainerField,
      subheaderName
    } = this.props;
    return (
      <Grid divided="vertically">
        {items.map((item, index) =>
          React.createElement(itemType, {
            addItem: addItem,
            contentName: contentName,
            editProfileOptions: editProfileOptions,
            headerName: headerName,
            index: index,
            item: item,
            removeItem: removeItem,
            setContainerField: setContainerField,
            subheaderName: subheaderName
          })
        )}

        <Grid.Row>
          <Button
            className="addHistoryItemButton"
            color="green"
            onClick={e => {
              addItem();
            }}
          >
            <Icon name="add" />

            <FormattedMessage id="setup.add.item" />
          </Button>
        </Grid.Row>

        <FormButtonsController
          handleApply={handleApply}
          handleCancel={handleCancel}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleRegister={handleRegister}
          isEarlyRegister={isEarlyRegister}
        />
      </Grid>
    );
  }
}

export default injectIntl(HistoryItemsContainerView);
