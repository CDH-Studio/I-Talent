import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";

import "./FormTitleView.less";

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
      <>
        <Title level={2} className="profileForm-title">
          {stepNumber}. {title}
        </Title>
        {extra && <div className="profileForm-extra">{extra}</div>}
      </>
    );
  }
  return (
    <>
      <Title level={2} className="profileForm-title">
        {title}
        {fieldsChanged && (
          <Text className="profileForm-unsavedText">
            (<FormattedMessage id="form.unsaved" />)
          </Text>
        )}
      </Title>
      {extra && <div className="profileForm-extra">{extra}</div>}
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
