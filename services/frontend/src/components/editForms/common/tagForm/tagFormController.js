import React from "react";
import PropTypes from "prop-types";
import FieldManagingComponent from "../formManagingComponent";
import TagFormView from "./tagFormView";

/**
 * Logic for forms that consist of a single list of tags
 */
export default class TagFormController extends FieldManagingComponent {
  static propTypes = {
    /** The name for the dropdown field*/
    dropdownName: PropTypes.string,
    /** Object containing a key value pair of [dropdownName]:<dropdown option object> */
    editProfileOptions: PropTypes.objectOf(PropTypes.object),
    /** The function to handle canceling editing a profile on /profile route*/
    handleCancel: PropTypes.func,
    /** The function to handle going to the next form on /setup route */
    handleNext: PropTypes.func,
    /** The functiion to handle going to the previous form on /setup route */
    handlePrevious: PropTypes.func,
    /** The function to handle registering on the /setup route */
    handleRegister: PropTypes.func,
    /** react-intl translation object */
    intl: PropTypes.object,
    /** Whether this is a form on the /setup route that is not the last form or not */
    isEarlyRegister: PropTypes.bool,
    /** Object containing the current profile info */
    profileInfo: PropTypes.object,
    /** Whether or not to allow the user to add their own tags */
    useCustomTags: PropTypes.bool
  };
  constructor(props) {
    super(props);

    const { profileInfo, dropdownName } = this.props;

    this.state = {
      tooManyItems: false,
      addedItems: [],
      currentValue: profileInfo[dropdownName]
        ? profileInfo[dropdownName].map(
            element => element.value || element.text || element
          ) //if useCustomTags needs to use text as value, otherwise use the value property
        : []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  /** handles added a new custom tag */
  handleAddItem(e, { value }) {
    const { useCustomTags } = this.props;

    if (useCustomTags) {
      this.setState(prevState => ({
        addedItems: [{ text: value, value: value }, ...prevState.addedItems]
      }));
    }
  }

  /**
   * handles changing the list of selected tags
   * @param {PropTypes.object} e unused even object
   * @param {PropTypes.object} o object containing the new value
   */
  handleChange(e, o) {
    this.setState({ currentValue: o.value });
    const { maxItems } = this.props;

    this.onFieldChange(e, o);

    if (o.value.length > maxItems !== this.state.tooManyItems) {
      this.setState({ tooManyItems: !this.state.tooManyItems });
    }
  }

  render() {
    return (
      <TagFormView
        addedItems={this.state.addedItems}
        currentValue={this.state.currentValue}
        fields={this.fields}
        handleAddItem={this.handleAddItem}
        handleApply={this.onSubmit}
        handleChange={this.handleChange}
        onSubmit={this.onSubmit}
        tooManyItems={this.state.tooManyItems}
        {...this.props}
      />
    );
  }
}
