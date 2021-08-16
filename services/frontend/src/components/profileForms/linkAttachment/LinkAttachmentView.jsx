import { FormattedMessage, useIntl } from "react-intl";
import { CloseCircleOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PropTypes from "prop-types";

import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../utils/customPropTypes";
import CustomDropdown from "../../formItems/CustomDropdown";

import "./LinkAttachmentView.less";

const Rules = {
  required: {
    message: <FormattedMessage id="rules.required" />,
    required: true,
  },
  url: {
    message: <FormattedMessage id="rules.url" />,
    type: "url",
  },
};

const LinkAttachmentView = ({
  fieldElement,
  removeElement,
  attachmentNamesOptions,
  attachmentNameDefault,
}) => {
  const intl = useIntl();
  return (
    <Row className="my-1" gutter={12} span={24}>
      {fieldElement.name !== 0 && <Divider className="mt-0 mb-2" />}
      <Col span={24}>
        <PaperClipOutlined aria-hidden="true" className="mr-1" />
        {`${intl.formatMessage({ id: "document" })}: ${fieldElement.name + 1}`}
        <Button
          aria-label={`${intl.formatMessage({
            id: "delete",
          })} ${intl.formatMessage({ id: "document" })} ${
            fieldElement.name + 1
          }`}
          className="deleteAttachmentButton"
          icon={
            <CloseCircleOutlined aria-hidden="true" className="deleted mr-1" />
          }
          onClick={() => {
            removeElement(fieldElement.name);
          }}
          size="small"
          type="primary"
        >
          <FormattedMessage id="delete" />
        </Button>
      </Col>

      <Col className="gutter-row" lg={8} xs={24}>
        <Form.Item
          className="formItem"
          fieldKey={[fieldElement.fieldKey, "nameId"]}
          label={<FormattedMessage id="type" />}
          name={[fieldElement.name, "nameId"]}
          rules={[Rules.required]}
        >
          <CustomDropdown
            ariaLabel={` ${intl.formatMessage({ id: "document" })} ${
              fieldElement.name + 1
            } ${intl.formatMessage({
              id: "type",
            })} `}
            initialValueId={attachmentNameDefault}
            isRequired
            isSearchable={false}
            options={attachmentNamesOptions}
            placeholderText={<FormattedMessage id="select" />}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" lg={16} xs={24}>
        <Form.Item
          className="formItem"
          fieldKey={[fieldElement.fieldKey, "url"]}
          label={<FormattedMessage id="link.to.document" />}
          name={[fieldElement.name, "url"]}
          rules={[Rules.required, Rules.url]}
        >
          <Input
            aria-label={` ${intl.formatMessage({ id: "document" })} ${
              fieldElement.name + 1
            } ${intl.formatMessage({
              id: "link.to.document",
            })} `}
            aria-required="true"
            placeholder={intl.formatMessage({
              id: "attachment.placeholder",
            })}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

LinkAttachmentView.propTypes = {
  attachmentNameDefault: PropTypes.string.isRequired,
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
};

export default LinkAttachmentView;
