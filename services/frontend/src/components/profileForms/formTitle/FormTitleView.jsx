import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";

import "./FormTitle.scss";

const { Title, Text } = Typography;

const FormTitleView = ({
  title,
  formType,
  stepNumber,
  fieldsChanged,
  extra,
}) => {
  if (formType === "create") {
    return (
      <Title level={2} className="pgf-formTitle">
        {stepNumber}. {title}
      </Title>
    );
  }
  return (
    <>
      <Title level={2} className="pgf-formTitle">
        {title}
        {fieldsChanged && (
          <Text className="pgf-unsavedText">
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
      {extra && <div className="prim-gedsInfoLink">{extra}</div>}
    </>
  );
};

FormTitleView.propTypes = {
  title: PropTypes.node.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  stepNumber: PropTypes.number,
  fieldsChanged: PropTypes.bool,
  extra: PropTypes.node,
};

FormTitleView.defaultProps = {
  stepNumber: null,
  fieldsChanged: false,
  extra: null,
};

export default FormTitleView;
