import { Row, Col, Form, Select, Button, Input, Divider } from "antd";
import { CloseCircleOutlined, PaperClipOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
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

const LinkAttachmentView = ({ fieldElement, removeElement, nameOptions }) => {
  const intl = useIntl();
  return (
    <Row span={24} gutter={12} className="my-1">
      {fieldElement.name !== 0 && <Divider className="mt-0 mb-2" />}
      <Col span={24}>
        <PaperClipOutlined className="mr-1" aria-hidden="true" />
        {`${intl.formatMessage({ id: "document" })}: ${fieldElement.name + 1}`}
        <Button
          icon={
            <CloseCircleOutlined className="deleted mr-1" aria-hidden="true" />
          }
          onClick={() => {
            removeElement(fieldElement.name);
          }}
          size="small"
          className="deleteAttachmentButton"
          type="primary"
          aria-label={`${intl.formatMessage({
            id: "delete",
          })} ${intl.formatMessage({ id: "document" })} ${
            fieldElement.name + 1
          }`}
        >
          <FormattedMessage id="delete" />
        </Button>
      </Col>

      <Col className="gutter-row" xs={24} lg={5}>
        <Form.Item
          rules={[Rules.required]}
          className="formItem"
          name={[fieldElement.name, "nameId"]}
          fieldKey={[fieldElement.fieldKey, "nameId"]}
          label={<FormattedMessage id="type" />}
        >
          <Select
            optionFilterProp="children"
            placeholder={<FormattedMessage id="select" />}
            dropdownMatchSelectWidth={false}
            aria-required="true"
            aria-label={` ${intl.formatMessage({ id: "document" })} ${
              fieldElement.name + 1
            } ${intl.formatMessage({
              id: "type",
            })} `}
          >
            {nameOptions.map((value) => (
              <Option key={value.id}>{value.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} lg={19}>
        <Form.Item
          name={[fieldElement.name, "url"]}
          fieldKey={[fieldElement.fieldKey, "url"]}
          className="formItem"
          rules={[Rules.required, Rules.url]}
          label={<FormattedMessage id="link.to.document" />}
        >
          <Input
            placeholder={intl.formatMessage({
              id: "attachment.placeholder",
            })}
            aria-required="true"
            aria-label={` ${intl.formatMessage({ id: "document" })} ${
              fieldElement.name + 1
            } ${intl.formatMessage({
              id: "link.to.document",
            })} `}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

LinkAttachmentView.propTypes = {
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  nameOptions: KeyNameOptionsPropType.isRequired,
};

export default LinkAttachmentView;
