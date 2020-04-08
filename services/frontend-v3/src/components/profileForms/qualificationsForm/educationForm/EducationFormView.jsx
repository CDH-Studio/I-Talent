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
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import moment from "moment";

const { Option } = Select;
const { Title } = Typography;

/**
 *  QualificationsFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const EducationForm = (props) => {
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

  /* enable or disable end date field */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const educationFieldValues = props.form.getFieldsValue("education");
      educationFieldValues.education[props.field.fieldKey].endDate = null;
      props.form.setFieldsValue(educationFieldValues);
    }
    setDisableEndDate(!disableEndDate);
  };

  /* Disable all dates before start date */
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

  /* Disable all dates after end date */
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
  }, [props.profileInfo]);

  //alert(disableEducationEndDate);
  /************************************
   ********* Render Component *********
   ************************************/
  if (!props.load) {
    return <div></div>;
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
            <FormattedMessage id="setup.education" />
            {": " + (props.field.fieldKey + 1)}
            {/* <DeleteOutlined
                onClick={() => {
                  remove(field.name);
                }}
                style={{ float: "right" }}
              /> */}
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
              placeholder="Please select"
              allowClear={true}
            >
              {props.diplomaOptions.map((value, index) => {
                return <Option key={value.key}>{value.title}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
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
              placeholder="Please select"
              allowClear={true}
            >
              {props.schoolOptions.map((value) => {
                return <Option key={value.key}>{value.title}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
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
            <Checkbox onChange={toggleEndDate} defaultChecked={disableEndDate}>
              <FormattedMessage id="profile.is.ongoing" />
            </Checkbox>
          </div>
        </Col>
      </Row>
    );
  }
};

export default EducationForm;
