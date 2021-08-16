import { Row, Col, Form, Button, Input, Divider } from "antd";
import { CloseCircleOutlined, PaperClipOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  FieldPropType,
  KeyNameOptionsPropType,
} from "../../../utils/customPropTypes";
import CustomDropdown from "../../formItems/CustomDropdown";

import "./LinkAttachmentView.less";

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
  attachmentNamesOptions,
  attachmentNameDefault,
}) => {
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

      <Col className="gutter-row" xs={24} lg={8}>
        <Form.Item
          rules={[Rules.required]}
          className="formItem"
          name={[fieldElement.name, "nameId"]}
          fieldKey={[fieldElement.fieldKey, "nameId"]}
          label={<FormattedMessage id="type" />}
        >
          <CustomDropdown
            ariaLabel={` ${intl.formatMessage({ id: "document" })} ${
              fieldElement.name + 1
            } ${intl.formatMessage({
              id: "type",
            })} `}
            initialValueId={attachmentNameDefault}
            placeholderText={<FormattedMessage id="select" />}
            options={attachmentNamesOptions}
            isRequired
            isSearchable={false}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} lg={16}>
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
  attachmentNamesOptions: KeyNameOptionsPropType.isRequired,
  attachmentNameDefault: PropTypes.string.isRequired,
};

export default LinkAttachmentView;
