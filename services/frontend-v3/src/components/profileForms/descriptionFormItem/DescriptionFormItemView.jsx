import React from "react";
import { Input, Form } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const { TextArea } = Input;

const DescriptionFormItem = ({
  name,
  fieldKey,
  rule,
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
      rules={[rule]}
      extra={
        <div>
          <FormattedMessage id="profile.rules.max.1000" />
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
  rule: PropTypes.shape({ max: PropTypes.number, message: PropTypes.element })
    .isRequired,
  charsLeft: PropTypes.number.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
};

export default DescriptionFormItem;
