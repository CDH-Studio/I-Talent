import React, { Component } from "react";
import { Checkbox, Form, Grid, Icon, Input, TextArea } from "semantic-ui-react";

import { injectIntl } from "react-intl";
import DateInputFieldGroup from "../dateInputFieldGroup/dateInputFieldGroupController";

import "./experienceItemForm.css";
import "../form.css";

class ExperienceItemFormView extends Component {
  render() {
    const {
      contentName,
      endDateMonth,
      endDateYear,
      headerName,
      index,
      intl,
      isOngoing,
      item,
      onFieldChange,
      onTempFieldChange,
      removeItem,
      startDateMonth,
      startDateYear,
      subheaderName
    } = this.props;

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
            <Form.Field
              control={Input}
              label={headerName}
              name="header"
              onChange={onFieldChange}
              value={item.header}
            />
            <Form.Field
              control={Input}
              label={subheaderName}
              name="subheader"
              onChange={onFieldChange}
              value={item.subheader}
            />
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
                  control={Checkbox}
                  defaultChecked={isOngoing}
                  label={intl.formatMessage({
                    id: "profile.history.item.is.ongoing"
                  })}
                  name="isOngoing"
                  onChange={onTempFieldChange}
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

          <Form.Field>
            <label>{contentName}</label>
            <TextArea
              name="content"
              onChange={onFieldChange}
              value={item.content}
            />
          </Form.Field>
        </Form>
      </Grid.Row>
    );
  }
}

export default injectIntl(ExperienceItemFormView);
