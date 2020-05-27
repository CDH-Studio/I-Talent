import React, { Component } from "react";
import { generateCommonFormProps } from "../../../functions/formTools";
import { Checkbox, Form, Grid, Select } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { DateInput } from "semantic-ui-calendar-react";
import FormButtonsController from "../common/formButtons/formButtonsController";
import "../common/form.css";

class LanguageProficiencyFormView extends Component {
  render() {
    const {
      handleCancel,
      handleNext,
      handlePrevious,
      handleRegister,
      intl,
      isEarlyRegister,
      onSubmit
    } = this.props;

    this.generateProps = generateCommonFormProps.bind(this, this.props);

    return (
      <Form onSubmit={onSubmit}>
        <Grid columns="one" divided>
          <Grid.Row>
            <Grid.Column>
              <Form.Field
                {...this.generateProps("firstLanguage", Select)}
                options={[
                  {
                    key: null,
                    value: null,
                    text: intl.formatMessage({ id: "profile.do.not.specify" })
                  },
                  {
                    key: "en",
                    value: "en",
                    text: intl.formatMessage({ id: "language.english" })
                  },
                  {
                    key: "fr",
                    value: "fr",
                    text: intl.formatMessage({ id: "language.french" })
                  }
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field
                {...this.generateProps("gradedOnSecondLanguage", Checkbox)}
              />
            </Grid.Column>
          </Grid.Row>
          {this.renderSecondaryGrading()}
        </Grid>
        <FormButtonsController
          handleApply={onSubmit}
          handleCancel={handleCancel}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleRegister={handleRegister}
          isEarlyRegister={isEarlyRegister}
        />
      </Form>
    );
  }

  renderSecondaryGrading() {
    const { intl, secondaryGradingDisabled } = this.props;
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            {["Reading", "Writing", "Oral"].map((value, index) => (
              <Form.Group>
                <Form.Field
                  {...this.generateProps(
                    "secondary" + value + "Proficiency",
                    Select
                  )}
                  disabled={secondaryGradingDisabled}
                  options={[
                    {
                      key: null,
                      value: null,
                      text: intl.formatMessage({ id: "profile.do.not.specify" })
                    },
                    { key: "A", value: "A", text: "A" },
                    { key: "B", value: "B", text: "B" },
                    { key: "C", value: "C", text: "C" },
                    { key: "E", value: "E", text: "E" },
                    { key: "X", value: "X", text: "X" }
                  ]}
                  width={8}
                />
                <Form.Field
                  width={8}
                  className="dateField"
                  {...this.generateProps(
                    "secondary" + value + "Date",
                    DateInput
                  )}
                  disabled={secondaryGradingDisabled}
                />
              </Form.Group>
            ))}
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}

export default injectIntl(LanguageProficiencyFormView);
