import { Row, Col, Form, Select, Button, Tooltip, Input } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  IntlPropType,
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../utils/customPropTypes";
import "./LinkAttachmentView.less";

const { Option } = Select;

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="rules.required" />,
  },
  url: {
    type: "url",
    message: <FormattedMessage id="rules.url" />,
  },
};

const LinkAttachmentView = ({
  fieldElement,
  removeElement,
  nameOptions,
  intl,
}) => (
  <Row
    span={24}
    gutter={12}
    className="my-2 px-2 rounded"
    style={{ backgroundColor: "red" }}
  >
    <Col className="gutter-row" span={5}>
      <Form.Item
        rules={[Rules.required]}
        className="formItem"
        name={[fieldElement.name, "nameId"]}
        fieldKey={[fieldElement.fieldKey, "nameId"]}
        label="Nickname"
      >
        <Select
          optionFilterProp="children"
          placeholder={<FormattedMessage id="select" />}
        >
          {nameOptions.map((value) => (
            <Option key={value.id}>{value.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col className="gutter-row" span={18}>
      <Form.Item
        name={[fieldElement.name, "url"]}
        fieldKey={[fieldElement.fieldKey, "url"]}
        className="formItem"
        rules={[Rules.required, Rules.url]}
        label="Nickname"
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
        <Tooltip placement="top" title={<FormattedMessage id="delete" />}>
          <Button
            type="link"
            shape="circle"
            icon={<DeleteOutlined className="deleted" />}
            onClick={() => {
              removeElement(fieldElement.name);
            }}
            size="small"
            className="deleteButton mt-4"
          />
        </Tooltip>
      </Form.Item>
    </Col>
  </Row>
);

LinkAttachmentView.propTypes = {
  intl: IntlPropType,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  nameOptions: KeyNameOptionsPropType.isRequired,
};

LinkAttachmentView.defaultProps = {
  intl: undefined,
};

export default injectIntl(LinkAttachmentView);
