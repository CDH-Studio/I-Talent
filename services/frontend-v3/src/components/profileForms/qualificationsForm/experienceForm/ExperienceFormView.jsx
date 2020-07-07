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
import {
  FieldPropType,
  FormInstancePropType,
  ProfileInfoPropType,
  StylesPropType,
  IntlPropType,
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
  checkIfFormValuesChanged,
  intl,
  charsLeft,
  handleContentChange,
}) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

  const styles = {
    space: {
      paddingLeft: "0.25em",
    },
  };

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
      message: <FormattedMessage id="profile.rules.max.exceeded" />,
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
          name={[field.name, "organization"]}
          fieldKey={[field.fieldKey, "organization"]}
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
          label={<FormattedMessage id="profile.history.item.end.date" />}
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
        <Form.Item
          name={[field.name, "description"]}
          fieldKey={[field.fieldKey, "description"]}
          label={<FormattedMessage id="profile.career.content.name" />}
          rules={[Rules.maxChar250]}
          extra={
            <div>
              <FormattedMessage id="profile.rules.max.250" />
              {charsLeft >= 0 && (
                <span style={styles.space}>
                  ({charsLeft}
                  <span style={styles.space}>
                    <FormattedMessage id="count.remaining" />
                  </span>
                  )
                </span>
              )}
            </div>
          }
        >
          <TextArea
            name="content"
            onChange={(e) => handleContentChange(e)}
            rows={4}
          />
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
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
  charsLeft: PropTypes.number.isRequired,
  handleContentChange: PropTypes.func.isRequired,
};

ExperienceFormView.defaultProps = {
  intl: undefined,
};

export default injectIntl(ExperienceFormView);
