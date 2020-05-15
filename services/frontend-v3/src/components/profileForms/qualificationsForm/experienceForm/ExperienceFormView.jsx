import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Tooltip,
} from "antd";
import PropTypes from "prop-types";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  StylesPropType,
} from "../../../../customPropTypes";

const { Title } = Typography;
const { TextArea } = Input;

/**
 *  ExperienceFormView(props)
 *  This component renders the experience form.
 *  It is rendered when a user generates an experience item
 *  It contains jobTilt, Company, start date, end date, and description.
 */
const ExperienceFormView = ({
  form,
  field,
  remove,
  profileInfo,
  style,
}) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    maxChar60: {
      max: 60,
      message: <FormattedMessage id="profile.rules.max.60" />,
    },
    maxChar250: {
      max: 250,
      message: <FormattedMessage id="profile.rules.max.250" />,
    },
  };

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if experience is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const experienceFieldValues = form.getFieldsValue("experience");
      experienceFieldValues.experience[field.fieldKey].endDate = null;
      form.setFieldsValue(experienceFieldValues);
    }
    setDisableEndDate(!disableEndDate);
    return undefined;
  };

  /*
   * Disabled Dates Before Start
   *
   * Generates a list of invalid dates before the start date
   * This is used for the end date field
   */
  const disabledDatesBeforeStart = (current) => {
    const fieldPath = ["experience", field.fieldKey, "startDate"];
    if (form.getFieldValue(fieldPath)) {
      return (
        current &&
        current < moment(form.getFieldValue(fieldPath).startOf("month"))
      );
    }
    return undefined;
  };

  /*
   * Disabled Dates After End
   *
   * Generates a list of invalid dates after the end date
   * This is used for the start date field
   */
  const disabledDatesAfterEnd = (current) => {
    const fieldPath = ["experience", field.fieldKey, "endDate"];
    if (form.getFieldValue(fieldPath)) {
      return (
        current &&
        current > moment(form.getFieldValue(fieldPath).startOf("month"))
      );
    }
    return undefined;
  };

  useEffect(() => {
    // set the default status of "ongoing" checkbox
    if (
      profileInfo.careerSummary[field.fieldKey] &&
      profileInfo.careerSummary[field.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo, field]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  return (
    <Row
      gutter={24}
      style={{
        backgroundColor: "#dfe5e4",
        padding: "15px 10px 15px 10px",
        marginBottom: "17px",
      }}
    >
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Title level={4} style={style.entryTitle}>
          <FormOutlined style={{ marginRight: "0.5em" }} />
          <FormattedMessage id="setup.experience" />
          {`: ${field.fieldKey + 1}`}
          <Tooltip
            placement="top"
            title={<FormattedMessage id="admin.delete" />}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                remove(field.name);
              }}
              size="small"
              style={{ float: "right" }}
            />
          </Tooltip>
        </Title>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Job Title Field */}
        <Form.Item
          name={[field.name, "header"]}
          fieldKey={[field.fieldKey, "header"]}
          label={<FormattedMessage id="admin.job.title" />}
          style={style.formItem}
          rules={[Rules.required, Rules.maxChar60]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Company Name Field */}
        <Form.Item
          name={[field.name, "subheader"]}
          fieldKey={[field.fieldKey, "subheader"]}
          label={<FormattedMessage id="profile.career.subheader.name" />}
          rules={[Rules.required, Rules.maxChar60]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Start Date */}
        <Form.Item
          name={[field.name, "startDate"]}
          fieldKey={[field.fieldKey, "startDate"]}
          label={<FormattedMessage id="profile.history.item.start.date" />}
          rules={[Rules.required]}
        >
          <DatePicker
            picker="month"
            disabledDate={disabledDatesAfterEnd}
            style={style.datePicker}
          />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* End Date */}
        <Form.Item
          name={[field.name, "endDate"]}
          fieldKey={[field.fieldKey, "endDate"]}
          label={<FormattedMessage id="profile.history.item.end.date" />}
          rules={!disableEndDate ? [Rules.required] : undefined}
        >
          <DatePicker
            picker="month"
            style={style.datePicker}
            disabledDate={disabledDatesBeforeStart}
            disabled={disableEndDate}
            placeholder="unknown"
          />
        </Form.Item>
        <div style={{ marginTop: "-10px" }}>
          {/* Checkbox if event is on-going */}
          <Checkbox onChange={toggleEndDate} defaultChecked={disableEndDate}>
            <FormattedMessage id="profile.is.ongoing" />
          </Checkbox>
        </div>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        {/* Descriptions */}
        <Form.Item
          name={[field.name, "content"]}
          fieldKey={[field.fieldKey, "content"]}
          label={<FormattedMessage id="profile.career.content.name" />}
          rules={[Rules.required, Rules.maxChar250]}
          extra={<FormattedMessage id="profile.rules.max.250" />}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  );
};

ExperienceFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  field: FieldPropType.isRequired,
  remove: PropTypes.func.isRequired,
  profileInfo: ProfileInfoPropType.isRequired,
  style: StylesPropType.isRequired,
};

export default ExperienceFormView;
