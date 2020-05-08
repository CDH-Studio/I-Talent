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
import { FormattedMessage } from "react-intl";
import moment from "moment";

const { Option } = Select;
const { Title } = Typography;

/**
 *  EducationFormView(props)
 *  This component renders the educations form.
 *  It is rendered when a user generates an education item
 *  It contains diploma, school, start date, and end date.
 */
const EducationFormView = (props) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

  const Rules = {
    required: {
      required: true,
      message: "Required",
    },
    maxChar50: {
      max: 50,
      message: "Max length 50 characters",
    },
    maxChar100: {
      max: 50,
      message: "Max length 100 characters",
    },
  };

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if education is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const educationFieldValues = props.form.getFieldsValue("education");
      educationFieldValues.education[props.field.fieldKey].endDate = null;
      props.form.setFieldsValue(educationFieldValues);
    }
    setDisableEndDate(!disableEndDate);
  };

  /*
   * Disabled Dates Before Start
   *
   * Generates a list of invalid dates before the start date
   * This is used for the end date field
   */
  const disabledDatesBeforeStart = (current) => {
    const fieldPath = ["education", props.field.fieldKey, "startDate"];
    console.log(props.form.getFieldValue(fieldPath));
    if (props.form.getFieldValue(fieldPath)) {
      return (
        current &&
        current < moment(props.form.getFieldValue(fieldPath).startOf("month"))
      );
    }
  };

  /*
   * Disabled Dates After End
   *
   * Generates a list of invalid dates after the end date
   * This is used for the start date field
   */
  const disabledDatesAfterEnd = (current) => {
    const fieldPath = ["education", props.field.fieldKey, "endDate"];
    if (props.form.getFieldValue(fieldPath)) {
      return (
        current &&
        current > moment(props.form.getFieldValue(fieldPath).startOf("month"))
      );
    }
  };

  useEffect(() => {
    // set the default status of "ongoing" checkbox
    if (
      props.profileInfo.education[props.field.fieldKey] &&
      props.profileInfo.education[props.field.fieldKey].endDate.en
    ) {
      toggleEndDate();
    }
  }, [props.profileInfo, props.field]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!props.load) {
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
        <Title level={4} style={props.style.entryTitle}>
          <FormOutlined style={{ marginRight: "0.5em" }} />
          <FormattedMessage id="setup.education" />
          {`: ${props.field.fieldKey + 1}`}
          <Tooltip
            placement="top"
            title={<FormattedMessage id="admin.delete" />}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                props.remove(props.field.name);
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
          name={[props.field.name, "diploma"]}
          fieldKey={[props.field.fieldKey, "diploma"]}
          label={<FormattedMessage id="profile.diploma" />}
          style={props.style.formItem}
          rules={[Rules.required]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
          >
            {props.diplomaOptions.map((value, index) => {
              return <Option key={value.key}>{value.title}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* School Dropdown */}
        <Form.Item
          name={[props.field.name, "school"]}
          fieldKey={[props.field.fieldKey, "school"]}
          label={<FormattedMessage id="profile.school" />}
          rules={[Rules.required]}
          style={props.style.formItem}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
          >
            {props.schoolOptions.map((value) => {
              return <Option key={value.key}>{value.title}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Start Date */}
        <Form.Item
          name={[props.field.name, "startDate"]}
          fieldKey={[props.field.fieldKey, "startDate"]}
          label={<FormattedMessage id="profile.history.item.start.date" />}
          rules={[Rules.required]}
        >
          <DatePicker
            picker="month"
            disabledDate={disabledDatesAfterEnd}
            style={props.style.datePicker}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* End Date */}
        <Form.Item
          name={[props.field.name, "endDate"]}
          fieldKey={[props.field.fieldKey, "endDate"]}
          label={<FormattedMessage id="profile.history.item.end.date" />}
          rules={!disableEndDate ? [Rules.required] : undefined}
        >
          <DatePicker
            picker="month"
            style={props.style.datePicker}
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
    </Row>
  );
};

export default EducationFormView;
