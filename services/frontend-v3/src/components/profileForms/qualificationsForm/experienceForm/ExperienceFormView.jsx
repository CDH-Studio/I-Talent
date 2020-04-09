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
  Input,
} from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import moment from "moment";

const { Title } = Typography;
const { TextArea } = Input;

/**
 *  EducationFormView(props)
 *  This component renders the educations form.
 *  It is rendered when a user generates an education item
 *  It contains diploma, school, start date, and end date.
 */
const ExperienceFormView = (props) => {
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
   * Enable or disable end date field if experience is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const experienceFieldValues = props.form.getFieldsValue("experience");
      experienceFieldValues.experience[props.field.fieldKey].endDate = null;
      props.form.setFieldsValue(experienceFieldValues);
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
      props.profileInfo.careerSummary[props.field.fieldKey] &&
      props.profileInfo.careerSummary[props.field.fieldKey].endDate
    ) {
      toggleEndDate();
    }
  }, [props.profileInfo]);

  /************************************
   ********* Render Component *********
   ************************************/
  if (!props.load) {
    return <div />;
  } else {
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
            <FormattedMessage id="setup.experience" />
            {": " + (props.field.fieldKey + 1)}
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                props.remove(props.field.name);
              }}
              size={"small"}
              style={{ float: "right" }}
            />
          </Title>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          {/* Diploma Dropdown */}
          <Form.Item
            name={[props.field.name, "header"]}
            fieldKey={[props.field.fieldKey, "header"]}
            label={<FormattedMessage id="admin.job.title" />}
            style={props.style.formItem}
            rules={[Rules.required, Rules.maxChar50]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          {/* School Dropdown */}
          <Form.Item
            name={[props.field.name, "subheader"]}
            fieldKey={[props.field.fieldKey, "subheader"]}
            label={<FormattedMessage id="profile.career.subheader.name" />}
            rules={[Rules.required]}
            rules={[Rules.required, Rules.maxChar50]}
          >
            <Input />
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
              placeholder={"unknown"}
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
          {/* End Date */}
          <Form.Item
            name={[props.field.name, "content"]}
            fieldKey={[props.field.fieldKey, "content"]}
            label={<FormattedMessage id="profile.career.content.name" />}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
    );
  }
};

export default ExperienceFormView;
