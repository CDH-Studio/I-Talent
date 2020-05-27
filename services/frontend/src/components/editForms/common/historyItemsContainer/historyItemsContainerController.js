import React, { Component } from "react";
import axios from "axios";

import HistoryItemsContainerView from "./historyItemsContainerView";

import config from "../../../../config";
const { backendAddress } = config;

/** Logic for a list of form items.
 *
 * NOTE: Code could be reworked to remove props like contentName, subheader name, etc.
 * these were made when I though it would be possible to use the same form type for education and experience items
 */
export default class HistoryItemsContainerController extends Component {
  constructor(props) {
    super(props);

    const { profileInfo, infoName } = this.props;

    const items = profileInfo[infoName] || [];

    this.fields = items.slice(0); //clone items

    this.addItem = this.addItem.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateListField = this.updateListField.bind(this);
  }

  /** Adds an item at a specified index
   * @param {PropTypes.number} index the index the item should be added at
   * @param {PropTypes.object} item the item to add
   */
  addItem(index, item) {
    const { itemType } = this.props;
    if (typeof index === "number") {
      this.fields.splice(index, 0, item);
    } else {
      let newItem = {};
      itemType.getFieldNames().forEach(element => (newItem[element] = null));
      this.fields.push(newItem);
    }

    this.updateRegisterComponent();
    this.forceUpdate();
  }

  /** function to send edited data to backend */
  onSubmit() {
    const { infoName } = this.props;
    let url = backendAddress + "api/profile/" + localStorage.getItem("userId");
    axios
      .put(url, { [infoName]: this.fields })
      .then(response => window.location.reload())
      .catch(function(error) {
        console.error(error);
      });
  }

  /** function to delete an item from the list */
  removeItem(index) {
    const fields = this.fields;

    this.fields = fields
      .slice(0, index)
      .concat(fields.slice(index + 1, fields.length));

    this.updateRegisterComponent();
    this.forceUpdate();
  }

  render() {
    return (
      <HistoryItemsContainerView
        {...this.props}
        addItem={this.addItem}
        handleApply={this.onSubmit}
        items={this.fields}
        removeItem={this.removeItem}
      />
    );
  }

  handleApply() {
    console.log("why is this being called", this.fields);
  }

  /**
   * calls the prop setFormChanges with changes made to the form.
   * (This is currently used on the /setup route to remember the changes made to the form if the user returns to it.)
   */
  updateRegisterComponent() {
    const { setFormChanges, infoName } = this.props;
    if (setFormChanges) {
      let changes = {};
      changes[infoName] = this.fields;
      setFormChanges(changes);
    }
  }

  updateListField(index, name, value) {
    this.fields[index][name] = value;
    this.updateRegisterComponent();
  }
}
