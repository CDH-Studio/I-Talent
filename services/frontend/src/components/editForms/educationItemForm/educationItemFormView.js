import React, { Component } from "react";

import { Checkbox, Form, Grid, Icon, Select } from "semantic-ui-react";

import { injectIntl } from "react-intl";

import { generateCommonFormProps } from "../../../functions/formTools";

import DateInputFieldGroup from "../common/dateInputFieldGroup/dateInputFieldGroupController";

import "./historyItemForm.css";
import "../common/form.css";

class EducationItemFormView extends Component {
  render() {
    const {
      endDateMonth,
      endDateYear,
      index,
      intl,
      isOngoing,
      item,
      onTempFieldChange,
      removeItem,
      startDateMonth,
      startDateYear
    } = this.props;

    const generateProps = generateCommonFormProps.bind(this, {
      ...this.props,
      profileInfo: item
    });

    return (
      <Grid.Row style={{ position: "relative" }} width={16}>
        <div className="removeHistoryItemButton">
          <Icon
            href={null}
            name="trash alternate"
            onClick={e => removeItem(index)}
          />
        </div>

        <Form style={{ margin: "0px auto", width: "95%" }}>
          <Form.Group widths="equal">
            <Form.Field {...generateProps("diploma", Select, false, true)} />
            <Form.Field {...generateProps("school", Select, false, true)} />
          </Form.Group>
          <Form.Group
            className="noHorizontalGaps"
            style={{ marginBottom: "1em" }}
          >
            <Grid
              style={{ width: "100%", marginLeft: "0px", marginBottom: "1em" }}
              className="noHorizonalGaps"
            >
              <Grid.Column className="noHorizontalGaps" width={5}>
                <DateInputFieldGroup
                  groupLabelText={intl.formatMessage({
                    id: "profile.history.item.start.date"
                  })}
                  initialMonth={startDateMonth}
                  initialYear={startDateYear}
                  name="startDate"
                  updateField={onTempFieldChange}
                />
              </Grid.Column>
              <Grid.Column className="noHorizontalGaps" width={3}>
                <Form.Field
                  {...generateProps("isOngoing", Checkbox, true)}
                  defaultChecked={isOngoing}
                />
              </Grid.Column>
              <Grid.Column className="smallLeftPadding" width={8}>
                <DateInputFieldGroup
                  disabled={isOngoing}
                  groupLabelText={intl.formatMessage({
                    id: "profile.history.item.end.date"
                  })}
                  initialMonth={endDateMonth}
                  initialYear={endDateYear}
                  name="endDate"
                  updateField={onTempFieldChange}
                />
              </Grid.Column>
            </Grid>
          </Form.Group>
        </Form>
      </Grid.Row>
    );
  }
}

export default injectIntl(EducationItemFormView);
