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
  ProfileInfoPropType,
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
  formElement,
  fieldElement,
  removeElement,
  diplomaOptions,
  schoolOptions,
  profileInfo,
  checkIfFormValuesChanged,
  intl,
  attachmentNamesTypeEduOptions,
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
      const educationFieldValues = formElement.getFieldsValue();
      educationFieldValues.educations[
        fieldElement.fieldKey
      ].endDate = undefined;
      formElement.setFieldsValue(educationFieldValues);
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
    if (formElement.getFieldValue(fieldPath)) {
      return (
        current &&
        current < moment(formElement.getFieldValue(fieldPath).startOf("month"))
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
    if (formElement.getFieldValue(fieldPath)) {
      return (
        current &&
        current > moment(formElement.getFieldValue(fieldPath).startOf("month"))
      );
    }
    return undefined;
  };

  useEffect(() => {
    // set the default status of "ongoing" checkbox
    if (
      profileInfo &&
      fieldElement &&
      profileInfo.educations[fieldElement.fieldKey] &&
      profileInfo.educations[fieldElement.fieldKey].endDate
    ) {
      toggleEndDate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileInfo]);

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
          name={[fieldElement.name, "description"]}
          fieldKey={[fieldElement.fieldKey, "description"]}
          rule={Rules.maxChar1500}
          value={
            profileInfo.educations[fieldElement.fieldKey] &&
            profileInfo.educations[fieldElement.fieldKey].description
          }
          label={<FormattedMessage id="profile.qualification.description" />}
          maxLengthMessage={<FormattedMessage id="profile.rules.max.1500" />}
        />
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Form.List name="links">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field) => (
                  <LinkAttachment
                    key={field.fieldKey}
                    formElement={formElement}
                    fieldElement={field}
                    removeElement={remove}
                    profileInfo={profileInfo}
                    parentField={fieldElement}
                    NameOptions={attachmentNamesTypeEduOptions}
                  />
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
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
  formElement: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType,
  profileInfo: ProfileInfoPropType.isRequired,
  diplomaOptions: KeyTitleOptionsPropType,
  checkIfFormValuesChanged: PropTypes.func.isRequired,
  intl: IntlPropType,
  attachmentNamesTypeEduOptions: KeyNameOptionsPropType.isRequired,
};

EducationFormView.defaultProps = {
  schoolOptions: [],
  diplomaOptions: [],
  intl: undefined,
};

export default injectIntl(EducationFormView);
