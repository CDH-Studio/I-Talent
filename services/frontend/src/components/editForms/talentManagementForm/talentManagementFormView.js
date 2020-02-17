import React, { Component } from "react";
import { generateCommonFormProps } from "../../../functions/formTools";
import { Form, Checkbox, Select } from "semantic-ui-react";
import FormButtonsController from "../common/formButtons/formButtonsController";
import { injectIntl } from "react-intl";

import "../common/form.css";
class TalentManagementFormView extends Component {
  render() {
    const {
      handleCancel,
      handleNext,
      handlePrevious,
      handleRegister,
      isEarlyRegister,
      onSubmit
    } = this.props;
    const generateProps = generateCommonFormProps.bind(this, this.props);

    return (
      <Form onSubmit={onSubmit}>
        <Form.Field {...generateProps("careerMobility", Select)} />
        <Form.Field {...generateProps("talentMatrixResult", Select)} />
        <Form.Field {...generateProps("exFeeder", Checkbox)} />
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
}

export default injectIntl(TalentManagementFormView);
