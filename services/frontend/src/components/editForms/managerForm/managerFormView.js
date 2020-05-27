import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Form, Input } from "semantic-ui-react";

import { generateCommonFormProps } from "../../../functions/formTools";
import FormButtonsController from "../common/formButtons/formButtonsController";

import "../common/form.css";

class ManagerFormView extends Component {
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
        <Form.Field {...generateProps("manager", Input)} />
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

export default injectIntl(ManagerFormView);
