import React, { useState, useEffect } from "react";
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
} from "antd";

import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";

import DescriptionFormItem from "../../descriptionFormItem/DescriptionFormItem";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  StylesPropType,
  IntlPropType,
} from "../../../../utils/customPropTypes";
import filterOption from "../../../../functions/filterSelectInput";

const { Option } = Select;
const { Title } = Typography;

/**
 *  EducationFormView(props)
 *  This component renders the educations form.
 *  It is rendered when a user generates an education item
 *  It contains diploma, school, start date, and end date.
 */
const EducationFormView = ({
  form,
  field,
  remove,
  diplomaOptions,
  schoolOptions,
  profileInfo,
  style,
  load,
  checkIfFormValuesChanged,
  intl,
}) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

  const Rules = {
    required: {
      required: true,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="profile.rules.max.50" />,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="profile.rules.max.100" />,
    },
    maxChar1500: {
      max: 1500,
      message: <FormattedMessage id="profile.rules.max.exceeded" />,
    },
  };

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if education is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const educationFieldValues = form.getFieldsValue();
      educationFieldValues.educations[field.fieldKey].endDate = undefined;
      form.setFieldsValue(educationFieldValues);
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
    const fieldPath = ["educations", field.fieldKey, "startDate"];
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
    const fieldPath = ["educations", field.fieldKey, "endDate"];
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
      profileInfo.educations[field.fieldKey] &&
      profileInfo.educations[field.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return <div />;
  }
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
          <FormattedMessage id="setup.education" />
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
        {/* Diploma Dropdown */}
        <Form.Item
          name={[field.name, "diplomaId"]}
          fieldKey={[field.fieldKey, "diplomaId"]}
          label={"Education " + (field.name + 1) + " Diploma"}
          style={style.formItem}
          rules={[Rules.required]}
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
            filterOption={filterOption}
          >
            {diplomaOptions.map((value) => {
              return <Option key={value.id}>{value.description}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* School Dropdown */}
        <Form.Item
          name={[field.name, "schoolId"]}
          fieldKey={[field.fieldKey, "schoolId"]}
          label={"Education " + (field.name + 1) + " School"}
          rules={[Rules.required]}
          style={style.formItem}
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
            filterOption={filterOption}
          >
            {schoolOptions.map((value) => {
              return <Option key={value.id}>{value.name}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Start Date */}
        <Form.Item
          name={[field.name, "startDate"]}
          fieldKey={[field.fieldKey, "startDate"]}
          label={"Education " + (field.name + 1) + " Start Date"}
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
          label={"Education " + (field.name + 1) + " End Date"}
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
      <Col className="gutter-row" span={24}>
        <DescriptionFormItem
          name={[field.name, "description"]}
          fieldKey={[field.fieldKey, "description"]}
          rules={Rules.maxChar1500}
          value={
            profileInfo.educations[field.fieldKey] &&
            profileInfo.educations[field.fieldKey].description
          }
          label={<FormattedMessage id="profile.qualification.description" />}
          maxLengthMessage={<FormattedMessage id="profile.rules.max.1500" />}
        />
      </Col>
    </Row>
  );
};

EducationFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  field: FieldPropType.isRequired,
  remove: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType,
  profileInfo: ProfileInfoPropType.isRequired,
  style: StylesPropType.isRequired,
  diplomaOptions: KeyTitleOptionsPropType,
  load: PropTypes.bool.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
};

EducationFormView.defaultProps = {
  schoolOptions: [],
  diplomaOptions: [],
  intl: undefined,
};

export default injectIntl(EducationFormView);
