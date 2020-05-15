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
import PropTypes from "prop-types";
import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  StylesPropType,
} from "../../../../customPropTypes";

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
}) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="profile.rules.max.50" />,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="profile.rules.max.100" />,
    },
  };

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if education is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const educationFieldValues = form.getFieldsValue("education");
      educationFieldValues.education[field.fieldKey].endDate = null;
      form.setFieldsValue(educationFieldValues);
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
    const fieldPath = ["education", field.fieldKey, "startDate"];
    // eslint-disable-next-line no-console
    console.log(form.getFieldValue(fieldPath));
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
    const fieldPath = ["education", field.fieldKey, "endDate"];
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
      profileInfo.education[field.fieldKey] &&
      profileInfo.education[field.fieldKey].endDate.en
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo, field]);

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
        {/* Diploma Dropdown */}
        <Form.Item
          name={[field.name, "diploma"]}
          fieldKey={[field.fieldKey, "diploma"]}
          label={<FormattedMessage id="profile.diploma" />}
          style={style.formItem}
          rules={[Rules.required]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
          >
            {diplomaOptions.map((value) => {
              return <Option key={value.key}>{value.title}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* School Dropdown */}
        <Form.Item
          name={[field.name, "school"]}
          fieldKey={[field.fieldKey, "school"]}
          label={<FormattedMessage id="profile.school" />}
          rules={[Rules.required]}
          style={style.formItem}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder={<FormattedMessage id="setup.select" />}
            allowClear
          >
            {schoolOptions.map((value) => {
              return <Option key={value.key}>{value.title}</Option>;
            })}
          </Select>
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
};

EducationFormView.defaultProps = {
  schoolOptions: [],
  diplomaOptions: [],
};

export default EducationFormView;
