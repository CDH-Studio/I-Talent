import React, { Component } from "react";
import { Form, Grid, Input, Select } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./dateInputFieldGroup.css";
import moment from "moment";

/**
 * UI for a dateInputField used by editForms
 */
export default class DateInputFieldGroupView extends Component {
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
    const {
      disabled,
      groupLabelText,
      initialMonth,
      initialYear,
      name,
      updateField
    } = this.props;
    return (
      <Grid className="dateNumberGroup">
        <Grid.Row className="noGapAbove noGapBelow">
          {groupLabelText && (
            <React.Fragment>
              <label
                className={
                  disabled
                    ? "looksLikeFieldLabel disabled"
                    : "looksLikeFieldLabel"
                }
              >
                {groupLabelText}
              </label>
              <br />
            </React.Fragment>
          )}
        </Grid.Row>
        <Grid.Row className="noGapAbove noGapBelow">
          <Form.Group>
            <Form.Field>
              <Select
                className="dateDropdown"
                disabled={disabled}
                name={name + "Month"}
                onChange={updateField}
                options={moment.months().map((value, index) => ({
                  key: index + 1,
                  text: value,
                  value: index + 1
                }))}
                placeholder="MM"
                search
                value={initialMonth}
              />
            </Form.Field>
            <Form.Field>
              <Input
                className="dateNumberInput"
                disabled={disabled}
                name={name + "Year"}
                onChange={updateField}
                placeholder="YYYY"
                type="number"
                value={initialYear}
              />
            </Form.Field>
          </Form.Group>
        </Grid.Row>
      </Grid>
    );
  }
}
