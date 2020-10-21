import React from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Select,
  Button,
  DatePicker,
  Tooltip,
  Input,
} from "antd";

import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import DescriptionFormItem from "../../descriptionFormItem/DescriptionFormItem";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
  IntlPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import filterOption from "../../../../functions/filterSelectInput";

import "./QualifiedPoolsFormView.scss";
import LinkAttachment from "../../linkAttachment/LinkAttachment";

const { Option } = Select;
const { Title } = Typography;

/**
 *  QualifiedPoolsFormView(props)
 *  This component renders the educations form.
 *  It is rendered when a user generates an education item
 *  It contains diploma, school, start date, and end date.
 */
const QualifiedPoolsFormView = ({
  form,
  fieldElement,
  removeElement,
  intl,
  savedQualifiedPools,
  classificationOptions
}) => {
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    maxChar1500: {
      max: 1500,
      message: (
        <FormattedMessage
          id="profile.rules.max"
          values={{
            max: 1500,
          }}
        />
      ),
    },
  };

  return (
    <Row gutter={24} className="topRow">
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Title level={4} className="entryTitle">
          <FormOutlined className="formOutlined" />
          <FormattedMessage id="setup.qualified.pools.title" />
          {`: ${fieldElement.name + 1}`}
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
        </Title>
      </Col>

      <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
        {/* Classification Dropdown */}
        <Form.Item
          name={[fieldElement.name, "classificationId"]}
          fieldKey={[fieldElement.fieldKey, "classificationId"]}
          label={<FormattedMessage id="profile.classification" />}
          rules={[Rules.required]}
          className="formItem"
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
            filterOption={filterOption}
          >
            {classificationOptions.map((value) => {
              return <Option key={value.id}>{value.description}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
        <Form.Item
          name={[fieldElement.name, "jobTitle"]}
          label={<FormattedMessage id="profile.qualified.pools.job.title" />}
          rules={[Rules.required]}
          fieldKey={[fieldElement.fieldKey, "jobTitle"]}
          value={
            savedQualifiedPools[fieldElement.fieldKey] &&
            savedQualifiedPools[fieldElement.fieldKey].description
          }
        >
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
        <Form.Item
          name={[fieldElement.name, "jobPosterLink"]}
          label={<FormattedMessage id="profile.qualified.pools.job.poster.link" />}
          rules={[Rules.required]}
          fieldKey={[fieldElement.fieldKey, "jobPosterLink"]}
          value={
            savedQualifiedPools[fieldElement.fieldKey] &&
            savedQualifiedPools[fieldElement.fieldKey].description
          }
        >
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
        <Form.Item
          name={[fieldElement.name, "selectionProcessNumber"]}
          label={<FormattedMessage id="profile.qualified.pools.selection.process.number" />}
          rules={[Rules.required]}
          fieldKey={[fieldElement.fieldKey, "selectionProcessNumber"]}
          value={
            savedQualifiedPools[fieldElement.fieldKey] &&
            savedQualifiedPools[fieldElement.fieldKey].description
          }
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};

QualifiedPoolsFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
      jobPosterLink: PropTypes.string,
    })
  ).isRequired,
  classificationOptions: KeyTitleOptionsPropType.isRequired,
  intl: IntlPropType,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

QualifiedPoolsFormView.defaultProps = {
  classificationOptions: [],
  savedQualifiedPools: [],
  intl: undefined,
};

export default injectIntl(QualifiedPoolsFormView);
