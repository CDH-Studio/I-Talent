import "./FormTitleView.less";

import { Typography } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

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
