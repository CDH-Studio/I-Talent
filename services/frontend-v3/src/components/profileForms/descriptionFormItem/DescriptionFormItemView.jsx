import React from "react";
import { Input, Form } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const { TextArea } = Input;

const DescriptionFormItem = ({
  name,
  fieldKey,
  rules,
  charsLeft,
  maxLengthMessage,
  handleDescriptionChange,
  label,
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
          {maxLengthMessage}
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
  name: PropTypes.string.isRequired,
  fieldKey: PropTypes.oneOf([PropTypes.string, PropTypes.array]).isRequired,
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  charsLeft: PropTypes.number.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  label: PropTypes.element,
  maxLengthMessage: PropTypes.element.isRequired,
};

DescriptionFormItem.defaultProps = {
  label: null,
};

export default DescriptionFormItem;
