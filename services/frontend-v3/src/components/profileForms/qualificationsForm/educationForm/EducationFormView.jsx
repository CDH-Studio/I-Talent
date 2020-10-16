import React from "react";
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
import dayjs from "dayjs";
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
import LinkAttachment from "../../linkAttachment/LinkAttachment";

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
  intl,
  attachmentNames,
}) => {
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
        current < dayjs(form.getFieldValue(fieldPath).startOf("month"))
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
        current > dayjs(form.getFieldValue(fieldPath).startOf("month"))
      );
    }
    return undefined;
  };

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

      <Col
        className="gutter-row"
        xs={24}
        md={24}
        lg={12}
        xl={12}
        // style={{ marginBottom: "-50px" }}
      >
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            const fieldPrevValues = prevValues.educations[fieldElement.name];
            const fieldCurrentValues =
              currentValues.educations[fieldElement.name];

            if (!fieldPrevValues || !fieldCurrentValues) {
              return false;
            }

            return (
              fieldPrevValues.ongoingDate !== fieldCurrentValues.ongoingDate ||
              (fieldPrevValues.endDate &&
                fieldPrevValues.endDate.isSame(fieldCurrentValues.endDate))
            );
          }}
        >
          {({ getFieldValue }) => {
            const disableEndDate = getFieldValue("educations")[
              fieldElement.name
            ].ongoingDate;

            return (
              <>
                {/* End Date */}
                <Form.Item
                  name={[fieldElement.name, "endDate"]}
                  fieldKey={[fieldElement.fieldKey, "endDate"]}
                  label={
                    <FormattedMessage id="profile.history.item.end.date" />
                  }
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

                {/* Checkbox if event is on-going */}
                <Form.Item
                  style={{ marginTop: disableEndDate ? "-45px" : "-15px" }}
                  name={[fieldElement.name, "ongoingDate"]}
                  fieldKey={[fieldElement.fieldKey, "ongoingDate"]}
                  initialValue={false}
                  valuePropName="checked"
                >
                  <Checkbox>
                    <FormattedMessage id="profile.is.ongoing" />
                  </Checkbox>
                </Form.Item>
              </>
            );
          }}
        </Form.Item>
      </Col>

      <Col className="gutter-row" className="descriptionRow" span={24}>
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
      ongoingDate: PropTypes.bool,
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
