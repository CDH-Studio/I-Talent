import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CloseCircleOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import {
  FieldPropType,
  FormInstancePropType,
  KeyNameOptionsPropType,
  KeyTitleOptionsPropType,
} from "../../../../utils/customPropTypes";
import Fieldset from "../../../fieldset/Fieldset";
import CustomDropdown from "../../../formItems/CustomDropdown";
import DatePickerField from "../../../formItems/DatePickerField";
import LinkAttachment from "../../linkAttachment/LinkAttachment";

import "./EducationFormView.less";

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
  attachmentNames,
}) => {
  const intl = useIntl();

  // Name of labels used for custom dropdowns in the education form
  const educationLabelName = `educations_${fieldElement.name}_diplomaId`;
  const schoolLabelName = `educations_${fieldElement.name}_schoolId`;

  const Rules = {
    maxChar1500: {
      max: 1500,
      message: <FormattedMessage id="rules.max" values={{ max: 1500 }} />,
    },
    required: {
      message: <FormattedMessage id="rules.required" />,
      required: true,
    },
  };

  /*
   * Disabled End Dates
   *
   * The minimum date that can be chosen for the end date field, all dates
   * before this date are disabled
   *
   * Change Disabled End
   *
   * The function to update this value
   */
  const [disabledEndDates, changeDisabledEnd] = useState(
    form.getFieldValue(["educations", fieldElement.fieldKey, "startDate"])
  );

  /*
   * Disabled Start Dates
   *
   * The maximum date that can be chosen for the start date field, all dates
   * after this date are disabled
   *
   * Change Disabled Start
   *
   * The function to update this value
   */
  const [disabledStartDates, changeDisabledStart] = useState(
    form.getFieldValue(["educations", fieldElement.fieldKey, "endDate"])
  );

  return (
    <div className="education-formItem">
      <Row className="gutter-row titleRow" gutter={24}>
        <Col className="titleCol" lg={24} md={24} xl={24} xs={24}>
          <Title className="entryTitle" level={4}>
            <Row align="middle" justify="space-between">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="education" />
                {`: ${fieldElement.name + 1}`}
              </Col>
              <Tooltip placement="top" title={<FormattedMessage id="delete" />}>
                <Button
                  className="deleteButton"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    removeElement(fieldElement.name);
                  }}
                  shape="circle"
                  size="small"
                  type="link"
                />
              </Tooltip>
            </Row>
          </Title>
        </Col>
      </Row>
      <Row className="gutter-row contentRow" gutter={24}>
        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
          {/* Diploma Dropdown */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "diplomaId"]}
            label={<FormattedMessage id="diploma" />}
            name={[fieldElement.name, "diplomaId"]}
            rules={[Rules.required]}
          >
            <CustomDropdown
              ariaLabel={intl.formatMessage({
                id: "diploma",
              })}
              initialValueId={form.getFieldValue([
                "educations",
                fieldElement.fieldKey,
                "diplomaId",
              ])}
              inputId={educationLabelName}
              isRequired
              isSearchable
              options={diplomaOptions}
              placeholderText={<FormattedMessage id="type.to.search" />}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
          {/* School Dropdown */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "schoolId"]}
            label={<FormattedMessage id="school" />}
            name={[fieldElement.name, "schoolId"]}
            rules={[Rules.required]}
          >
            <CustomDropdown
              ariaLabel={intl.formatMessage({
                id: "school",
              })}
              initialValueId={form.getFieldValue([
                "educations",
                fieldElement.fieldKey,
                "schoolId",
              ])}
              inputId={schoolLabelName}
              isRequired
              isSearchable
              options={schoolOptions}
              placeholderText={<FormattedMessage id="type.to.search" />}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
          {/* Start Date */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "startDate"]}
            label={<FormattedMessage id="item.start.date" />}
            name={[fieldElement.name, "startDate"]}
            shouldUpdate={(prevValues, curValues) => {
              if (prevValues !== curValues) {
                changeDisabledEnd(
                  form.getFieldValue([
                    "educations",
                    fieldElement.fieldKey,
                    "startDate",
                  ])
                );
                changeDisabledStart(
                  form.getFieldValue([
                    "educations",
                    fieldElement.fieldKey,
                    "endDate",
                  ])
                );
              }
            }}
          >
            <DatePickerField
              defaultDate={form.getFieldValue([
                "educations",
                fieldElement.fieldKey,
                "startDate",
              ])}
              disableWhen={{ maxDate: disabledStartDates }}
              formatDate="YYYY-MM"
              placeholderText={intl.formatMessage({
                id: "select.date",
              })}
              viewOptions={["year", "month"]}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
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
                fieldPrevValues.ongoingDate !==
                  fieldCurrentValues.ongoingDate ||
                (fieldPrevValues.endDate &&
                  dayjs(fieldPrevValues.endDate).isSame(
                    dayjs(fieldCurrentValues.endDate)
                  ))
              );
            }}
          >
            {({ getFieldValue }) => {
              const educationItem =
                getFieldValue("educations")[fieldElement.name];
              const disableEndDate = educationItem
                ? educationItem.ongoingDate
                : false;
              return (
                <>
                  {/* End Date */}
                  <Form.Item
                    fieldKey={[fieldElement.fieldKey, "endDate"]}
                    label={<FormattedMessage id="item.end.date" />}
                    name={[fieldElement.name, "endDate"]}
                    shouldUpdate={(prevValues, curValues) => {
                      if (prevValues !== curValues) {
                        changeDisabledEnd(
                          form.getFieldValue([
                            "educations",
                            fieldElement.fieldKey,
                            "startDate",
                          ])
                        );
                        changeDisabledStart(
                          form.getFieldValue([
                            "educations",
                            fieldElement.fieldKey,
                            "endDate",
                          ])
                        );
                      }
                    }}
                  >
                    {!disableEndDate && (
                      <DatePickerField
                        defaultDate={form.getFieldValue([
                          "educations",
                          fieldElement.fieldKey,
                          "endDate",
                        ])}
                        disableWhen={{ minDate: disabledEndDates }}
                        formatDate="YYYY-MM"
                        placeholderText={intl.formatMessage({
                          id: "select.date",
                        })}
                        viewOptions={["year", "month"]}
                      />
                    )}
                  </Form.Item>
                  {/* Checkbox if event is on-going */}
                  <Form.Item
                    fieldKey={[fieldElement.fieldKey, "ongoingDate"]}
                    initialValue={educationItem ? undefined : false}
                    name={[fieldElement.name, "ongoingDate"]}
                    style={{
                      marginBottom: disableEndDate ? "35px" : "15px",
                      marginTop: disableEndDate ? "-45px" : "-15px",
                    }}
                    valuePropName="checked"
                  >
                    <Checkbox>
                      <FormattedMessage id="item.is.ongoing" />
                    </Checkbox>
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
        </Col>

        <Col className="gutter-row descriptionRow" span={24}>
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "description"]}
            label={<FormattedMessage id="description" />}
            name={[fieldElement.name, "description"]}
          >
            <Input.TextArea maxLength={1500} showCount />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
          <Fieldset
            title={<FormattedMessage id="attachment.links.education" />}
          >
            <Form.List
              fieldKey={[fieldElement.fieldKey, "attachmentLinks"]}
              name={[fieldElement.name, "attachmentLinks"]}
            >
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field) => (
                    <LinkAttachment
                      key={field.fieldKey}
                      attachmentNameDefault={form.getFieldValue([
                        "educations",
                        fieldElement.fieldKey,
                        "attachmentLinks",
                        field.fieldKey,
                        "nameId",
                      ])}
                      attachmentNamesOptions={attachmentNames}
                      fieldElement={field}
                      removeElement={remove}
                      typeLabelName={`educations_${fieldElement.fieldKey}_attachmentLinks_${field.fieldKey}_nameId`}
                    />
                  ))}
                  <Form.Item>
                    <Button
                      disabled={fields.length === 3}
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      type="default"
                    >
                      <PlusOutlined aria-hidden="true" className="mr-1" />
                      <FormattedMessage id="attachment.links.education.add" />
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Fieldset>
        </Col>
      </Row>
    </div>
  );
};

DatePickerField.propTypes = {
  defaultDate: PropTypes.instanceOf(Object),
  disableWhen: PropTypes.instanceOf(Object),
  formatDate: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string.isRequired,
  viewOptions: PropTypes.arrayOf(String),
};

EducationFormView.propTypes = {
  attachmentNames: KeyNameOptionsPropType.isRequired,
  diplomaOptions: KeyTitleOptionsPropType,
  fieldElement: FieldPropType.isRequired,
  form: FormInstancePropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType,
};

EducationFormView.defaultProps = {
  diplomaOptions: undefined,
  schoolOptions: undefined,
};

export default EducationFormView;
