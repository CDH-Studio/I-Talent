import React from "react";
import { Row, Col, Form, Select, Button, Tooltip, Input } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./LinkAttachmentView.scss";

import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const { Option } = Select;

const LinkAttachmentView = ({ fieldElement, removeElement, NameOptions }) => {
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
          <Input placeholder="Attachment URL - ex. www.google.com" />
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
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  NameOptions: KeyNameOptionsPropType.isRequired,
};
export default LinkAttachmentView;
