import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import PropTypes from "prop-types";

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
        <Title className="profileForm-title" level={2}>
          {stepNumber}. {title}
        </Title>
        {extra && <div className="profileForm-extra">{extra}</div>}
      </>
    );
  }
  return (
    <>
      <Title className="profileForm-title" level={2}>
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
  extra: PropTypes.node,
  fieldsChanged: PropTypes.bool,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  stepNumber: PropTypes.number,
  title: PropTypes.node.isRequired,
};

FormTitleView.defaultProps = {
  extra: null,
  fieldsChanged: false,
  stepNumber: null,
};

export default FormTitleView;
