import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Select,
  Button,
  Tooltip,
  Input,
} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./LinkAttachmentView.scss";

import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

const { Option } = Select;

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="profile.rules.required" />,
  },
};
const LinkAttachmentView = ({
  formElement,
  fieldElement,
  removeElement,
  profileInfo,
  NameOptions,
}) => {
  // useEffect(() => {
  //   // set the default status of "ongoing" checkbox
  //   if (
  //     profileInfo &&
  //     fieldElement &&
  //     profileInfo.educations[fieldElement.fieldKey] &&
  //     profileInfo.educations[fieldElement.fieldKey].endDate
  //   ) {
  //     toggleEndDate();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [profileInfo]);

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
          name={[fieldElement.name, "attachmentURL"]}
          fieldKey={[fieldElement.fieldKey, "attachmentURL"]}
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
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  NameOptions: KeyNameOptionsPropType.isRequired,
};
export default LinkAttachmentView;
