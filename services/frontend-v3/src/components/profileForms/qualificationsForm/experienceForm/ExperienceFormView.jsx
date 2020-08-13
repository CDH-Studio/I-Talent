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
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import DescriptionFormItem from "../../descriptionFormItem/DescriptionFormItem";
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  StylesPropType,
  IntlPropType,
} from "../../../../utils/customPropTypes";

const { Title } = Typography;

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
  checkIfFormValuesChanged,
  intl,
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
    maxChar1500: {
      max: 1500,
      message: <FormattedMessage id="profile.rules.max.100" />,
    },
  };

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if experience is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const experienceFieldValues = form.getFieldsValue();
      experienceFieldValues.experience[field.fieldKey].endDate = undefined;
      form.setFieldsValue(experienceFieldValues);
    }
    setDisableEndDate((prev) => !prev);
    checkIfFormValuesChanged();
  };

  /*
   * Disabled Dates Before Start
   *
   * Generates a list of invalid dates before the start date
   * This is used for the end date field
   */
  const disabledDatesBeforeStart = (current) => {
    const fieldPath = ["experiences", field.fieldKey, "startDate"];
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
    const fieldPath = ["experiences", field.fieldKey, "endDate"];
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
      profileInfo &&
      field &&
      profileInfo.experiences[field.fieldKey] &&
      profileInfo.experiences[field.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

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
          {`: ${field.name + 1}`}
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
          name={[field.name, "jobTitle"]}
          fieldKey={[field.fieldKey, "jobTitle"]}
          label={`Experience ${  field.name + 1  } Title`}
          style={style.formItem}
          rules={[Rules.required, Rules.maxChar60]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Company Name Field */}
        <Form.Item
          name={[field.name, "organization"]}
          fieldKey={[field.fieldKey, "organization"]}
          label={`Experience ${  field.name + 1  } Company`}
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
          label={`Experience ${  field.name + 1  } Start Date`}
          rules={[Rules.required]}
        >
          <DatePicker
            picker="month"
            disabledDate={disabledDatesAfterEnd}
            style={style.datePicker}
            placeholder={intl.formatMessage({
              id: "profile.qualifications.select.month",
            })}
          />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* End Date */}
        <Form.Item
          name={[field.name, "endDate"]}
          fieldKey={[field.fieldKey, "endDate"]}
          label={`Experience ${  field.name + 1  } End Date`}
          rules={!disableEndDate ? [Rules.required] : undefined}
        >
          {!disableEndDate && (
            <DatePicker
              picker="month"
              style={style.datePicker}
              disabledDate={disabledDatesBeforeStart}
              disabled={disableEndDate}
              placeholder={intl.formatMessage({
                id: "profile.qualifications.select.month",
              })}
            />
          )}
        </Form.Item>
        <div style={{ marginTop: disableEndDate ? "-38px" : "-10px" }}>
          {/* Checkbox if event is on-going */}
          <Checkbox onChange={toggleEndDate} checked={disableEndDate}>
            <FormattedMessage id="profile.is.ongoing" />
          </Checkbox>
        </div>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        {/* Descriptions */}
        <DescriptionFormItem
          name={[field.name, "description"]}
          fieldKey={[field.fieldKey, "description"]}
          label={`Experience ${  field.name + 1  } Description`}
          rules={[Rules.maxChar1500]}
          value={
            profileInfo.experiences[field.fieldKey] &&
            profileInfo.experiences[field.fieldKey].description
          }
          maxLengthMessage={<FormattedMessage id="profile.rules.max.1500" />}
        />
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
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
};

ExperienceFormView.defaultProps = {
  intl: undefined,
};

export default injectIntl(ExperienceFormView);
