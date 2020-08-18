import React from "react";
import { Row, Col, Form, Select, Button, Tooltip, Input } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  IntlPropType,
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import "./LinkAttachmentView.scss";

const { Option } = Select;

const LinkAttachmentView = ({
  fieldElement,
  removeElement,
  NameOptions,
  intl,
}) => {
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
  };
  return (
    <Row span={24}>
      <Col className="gutter-row" span={5}>
        <Form.Item
          rules={[Rules.required]}
          className="formItem"
          name={[fieldElement.name, "nameId"]}
          fieldKey={[fieldElement.fieldKey, "nameId"]}
        >
          <Select
            optionFilterProp="children"
            placeholder={<FormattedMessage id="admin.select" />}
          >
            {NameOptions.map((value) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={18}>
        <Form.Item
          name={[fieldElement.name, "url"]}
          fieldKey={[fieldElement.fieldKey, "url"]}
          className="formItem"
          rules={[Rules.required]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "attachment.placeholder",
            })}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={1}>
        <Form.Item>
          <Tooltip
            placement="top"
            title={<FormattedMessage id="admin.delete" />}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                removeElement(fieldElement.name);
              }}
              size="small"
              className="deleteButton"
            />
          </Tooltip>
        </Form.Item>
      </Col>
    </Row>
  );
};

LinkAttachmentView.propTypes = {
  intl: IntlPropType,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  NameOptions: KeyNameOptionsPropType.isRequired,
};

LinkAttachmentView.defaultProps = {
  intl: undefined,
};

export default injectIntl(LinkAttachmentView);
