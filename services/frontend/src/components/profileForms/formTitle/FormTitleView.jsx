import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

const { Title, Text } = Typography;

const FormTitleView = ({ title, formType, stepNumber, fieldsChanged }) => {
  if (formType === "create") {
    return (
      <Title level={2} className="pgf-formTitle">
        {stepNumber}. {title}
      </Title>
    );
  }
  return (
    <Title level={2} className="pgf-formTitle">
      {title}
      {fieldsChanged && (
        <Text className="pgf-unsavedText">
          (<FormattedMessage id="profile.form.unsaved" />)
        </Text>
      )}
    </Title>
  );
};

FormTitleView.propTypes = {
  title: PropTypes.node.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).required,
  stepNumber: PropTypes.number,
  fieldsChanged: PropTypes.boolean,
};

export default FormTitleView;
