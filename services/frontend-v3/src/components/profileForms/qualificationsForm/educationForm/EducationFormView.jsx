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

import { FormOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
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

import "./EducationFormView.scss";
import LinkAttachment from "../linkAttachment/LinkAttachment";

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
  fieldElement,
  removeElement,
  diplomaOptions,
  schoolOptions,
  savedEducation,
  checkIfFormValuesChanged,
  intl,
  attachmentNames,
}) => {
  const [disableEndDate, setDisableEndDate] = useState(true);

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

  /*
   * Toggle End Date
   *
   * Enable or disable end date field if education is on going
   */
  const toggleEndDate = () => {
    if (!disableEndDate) {
      const educationFieldValues = form.getFieldsValue();
      educationFieldValues.educations[
        fieldElement.fieldKey
      ].endDate = undefined;
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
    const fieldPath = ["educations", fieldElement.fieldKey, "startDate"];
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
    const fieldPath = ["educations", fieldElement.fieldKey, "endDate"];
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
      fieldElement &&
      savedEducation[fieldElement.fieldKey] &&
      savedEducation[fieldElement.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedEducation]);
  return (
    <Row gutter={24} className="topRow">
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Title level={4} className="entryTitle">
          <FormOutlined className="formOutlined" />
          <FormattedMessage id="setup.education" />
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
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        {/* Diploma Dropdown */}
        <Form.Item
          name={[fieldElement.name, "diplomaId"]}
          fieldKey={[fieldElement.fieldKey, "diplomaId"]}
          label={<FormattedMessage id="profile.diploma" />}
          rules={[Rules.required]}
          className="formItem"
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
          name={[fieldElement.name, "schoolId"]}
          fieldKey={[fieldElement.fieldKey, "schoolId"]}
          label={<FormattedMessage id="profile.school" />}
          rules={[Rules.required]}
          className="formItem"
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
      <Col className="gutter-row" span={24}>
        <DescriptionFormItem
          label={<FormattedMessage id="profile.qualification.description" />}
          name={[fieldElement.name, "description"]}
          fieldKey={[fieldElement.fieldKey, "description"]}
          maxLength={Rules.maxChar1500.max}
          maxLengthMessage={Rules.maxChar1500.message}
          lengthMessage={<FormattedMessage id="profile.rules.max.1500" />}
          value={
            savedEducation[fieldElement.fieldKey] &&
            savedEducation[fieldElement.fieldKey].description
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
                    fieldElement={field}
                    removeElement={remove}
                    nameOptions={attachmentNames}
                  />
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={add}
                    disabled={fields.length === 3}
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

EducationFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType,
  savedEducation: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      startDate: PropTypes.oneOfType([PropTypes.object]),
      school: PropTypes.string,
      attachmentLinks: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          nameId: PropTypes.string,
          url: PropTypes.string,
        })
      ),
    })
  ),
  diplomaOptions: KeyTitleOptionsPropType,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

EducationFormView.defaultProps = {
  schoolOptions: [],
  diplomaOptions: [],
  savedEducation: [],
  intl: undefined,
};

export default injectIntl(EducationFormView);
