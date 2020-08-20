import React from "react";
import { Input, Form } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const { TextArea } = Input;

const DescriptionFormItem = ({
  label,
  name,
  fieldKey,
  rules,
  lengthMessage,
  charsLeft,
  handleDescriptionChange,
}) => {
  const styles = {
    space: {
      paddingLeft: "0.25em",
    },
  };

  return (
    <Form.Item
      name={name}
      fieldKey={fieldKey}
      rules={rules}
      label={label}
      extra={
        <div>
          {lengthMessage}
          {charsLeft >= 0 && (
            <span style={styles.space}>
              ({charsLeft}
              <span style={styles.space}>
                <FormattedMessage id="count.remaining" />
              </span>
              )
            </span>
          )}
        </div>
      }
    >
      <TextArea name="content" onChange={handleDescriptionChange} rows={4} />
    </Form.Item>
  );
};

DescriptionFormItem.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]).isRequired,
  fieldKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  charsLeft: PropTypes.number.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  label: PropTypes.element,
  lengthMessage: PropTypes.element.isRequired,
};

DescriptionFormItem.defaultProps = {
  label: null,
  fieldKey: undefined,
};

export default DescriptionFormItem;
