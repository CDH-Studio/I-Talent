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
import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";

import DescriptionFormItem from "../../descriptionFormItem/DescriptionFormItem";
import {
  FieldPropType,
  FormInstancePropType,
  IntlPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";

import "./ExperienceFormView.scss";
import LinkAttachment from "../linkAttachment/LinkAttachment";

const { Title } = Typography;

/**
 *  ExperienceFormView(props)
 *  This component renders the experience form.
 *  It is rendered when a user generates an experience item
 *  It contains jobTilt, Company, start date, end date, and description.
 */
const ExperienceFormView = ({
  form,
  fieldElement,
  removeElement,
  savedExperience,
  checkIfFormValuesChanged,
  attachmentNames,
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
      experienceFieldValues.experience[
        fieldElement.fieldKey
      ].endDate = undefined;
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
    const fieldPath = ["experiences", fieldElement.fieldKey, "startDate"];
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
    const fieldPath = ["experiences", fieldElement.fieldKey, "endDate"];
    if (form.getFieldValue(fieldPath)) {
      return (
        current &&
        current > moment(form.getFieldValue(fieldPath).startOf("month"))
      );
    }
    return undefined;
  };

  useEffect(() => {
    if (
      fieldElement &&
      savedExperience[fieldElement.fieldKey] &&
      savedExperience[fieldElement.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedExperience]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  return (
    <Row gutter={24} className="topRow">
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Title level={4} className="entryTitle">
          <FormOutlined className="formOutlined" />
          <FormattedMessage id="setup.experience" />
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
              style={{ float: "right" }}
            />
          </Tooltip>
        </Title>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Job Title Field */}
        <Form.Item
          name={[fieldElement.name, "jobTitle"]}
          fieldKey={[fieldElement.fieldKey, "jobTitle"]}
          label={<FormattedMessage id="admin.job.title" />}
          className="formItem"
          rules={[Rules.required, Rules.maxChar60]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Company Name Field */}
        <Form.Item
          name={[fieldElement.name, "organization"]}
          fieldKey={[fieldElement.fieldKey, "organization"]}
          label={<FormattedMessage id="profile.career.subheader.name" />}
          rules={[Rules.required, Rules.maxChar60]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Start Date */}
        <Form.Item
          name={[fieldElement.name, "startDate"]}
          fieldKey={[fieldElement.fieldKey, "startDate"]}
          label={<FormattedMessage id="profile.history.item.start.date" />}
          rules={[Rules.required]}
        >
          <DatePicker
            picker="month"
            disabledDate={disabledDatesAfterEnd}
            className="datePicker"
            placeholder={intl.formatMessage({
              id: "profile.qualifications.select.month",
            })}
          />
        </Form.Item>
      </Col>

      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* End Date */}
        <Form.Item
          name={[fieldElement.name, "endDate"]}
          fieldKey={[fieldElement.fieldKey, "endDate"]}
          label={<FormattedMessage id="profile.history.item.end.date" />}
          rules={!disableEndDate ? [Rules.required] : undefined}
        >
          {!disableEndDate && (
            <DatePicker
              picker="month"
              disabledDate={disabledDatesBeforeStart}
              disabled={disableEndDate}
              className="datePicker"
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
          label={<FormattedMessage id="profile.qualification.description" />}
          name={[fieldElement.name, "description"]}
          fieldKey={[fieldElement.fieldKey, "description"]}
          maxLength={Rules.maxChar1500.max}
          maxLengthMessage={Rules.maxChar1500.message}
          lengthMessage={<FormattedMessage id="profile.rules.max.1500" />}
          value={
            savedExperience[fieldElement.fieldKey] &&
            savedExperience[fieldElement.fieldKey].description
          }
        />
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Form.List
          name={[fieldElement.name, "attachmentLinks"]}
          fieldKey={[fieldElement.fieldKey, "attachmentLinks"]}
        >
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <LinkAttachment
                    key={field.fieldKey}
                    form={form}
                    fieldElement={field}
                    removeElement={remove}
                    profileInfo={savedExperience}
                    NameOptions={attachmentNames}
                  />
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    disabled={fields.length === 6}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined />
                    <FormattedMessage id="setup.add.attachment" />
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Col>
    </Row>
  );
};

ExperienceFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
  attachmentNames: KeyNameOptionsPropType.isRequired,
  savedExperience: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      startDate: PropTypes.oneOfType([PropTypes.object]),
      organization: PropTypes.string,
      attachmentLinks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          nameId: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
};

ExperienceFormView.defaultProps = {
  intl: undefined,
  savedExperience: [],
};

export default injectIntl(ExperienceFormView);
