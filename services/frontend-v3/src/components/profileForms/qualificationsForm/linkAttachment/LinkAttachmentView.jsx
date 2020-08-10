import React from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Select,
  Button,
  Checkbox,
  DatePicker,
  Tooltip,
  Input,
} from "antd";

import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

import "./LinkAttachmentView.scss";

const options = [
  { value: "diploma", label: "diploma" },
  { value: "transcript", label: "transcript" },
  { value: "publicationList", label: "publication list" },
];

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="profile.rules.required" />,
  },
};
const LinkAttachmentView = () => {
  return (
    <Row gutter={24} className="topRow">
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name="website"
          label="Website"
          className="formItem"
          rules={[Rules.required]}
        >
          <Input placeholder="ex. www.google.com" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name="Name"
          label="Name"
          className="formItem"
          rules={[Rules.required]}
        >
          <Select optionFilterProp="children" allowClear options={options} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default LinkAttachmentView;
