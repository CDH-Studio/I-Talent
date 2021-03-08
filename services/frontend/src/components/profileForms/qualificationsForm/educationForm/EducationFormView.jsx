import {
  Row,
  Col,
  Typography,
  Form,
  Select,
  Button,
  Tooltip,
  Input,
  Checkbox,
} from "antd";
import {
  FormOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useState } from "react";

import {
  FieldPropType,
  FormInstancePropType,
  KeyTitleOptionsPropType,
  IntlPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import filterOption from "../../../../functions/filterSelectInput";
import LinkAttachment from "../../linkAttachment/LinkAttachment";
import "./EducationFormView.less";
import DatePickerField from "../../../formItems/DatePickerField";

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
  intl,
  attachmentNames,
}) => {
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
    maxChar1500: {
      max: 1500,
      message: <FormattedMessage id="rules.max" values={{ max: 1500 }} />,
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
      <Row gutter={24} className="gutter-row titleRow">
        <Col className="titleCol" xs={24} md={24} lg={24} xl={24}>
          <Title level={4} className="entryTitle">
            <Row align="middle" justify="space-between">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="education" />
                {`: ${fieldElement.name + 1}`}
              </Col>
              <Tooltip placement="top" title={<FormattedMessage id="delete" />}>
                <Button
                  type="link"
                  shape="circle"
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    removeElement(fieldElement.name);
                  }}
                  size="small"
                  className="deleteButton"
                />
              </Tooltip>
            </Row>
          </Title>
        </Col>
      </Row>
      <Row gutter={24} className="gutter-row contentRow">
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          {/* Diploma Dropdown */}
          <Form.Item
            name={[fieldElement.name, "diplomaId"]}
            fieldKey={[fieldElement.fieldKey, "diplomaId"]}
            label={<FormattedMessage id="diploma" />}
            rules={[Rules.required]}
          >
            <Select
              showSearch
              placeholder={<FormattedMessage id="input.placeholder.select" />}
              allowClear
              filterOption={filterOption}
            >
              {diplomaOptions.map((value) => (
                <Option key={value.id}>{value.description}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          {/* School Dropdown */}
          <Form.Item
            name={[fieldElement.name, "schoolId"]}
            fieldKey={[fieldElement.fieldKey, "schoolId"]}
            label={<FormattedMessage id="school" />}
            rules={[Rules.required]}
          >
            <Select
              showSearch
              placeholder={<FormattedMessage id="input.placeholder.select" />}
              allowClear
              filterOption={filterOption}
            >
              {schoolOptions.map((value) => (
                <Option key={value.id}>{value.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          {/* Start Date */}
          <Form.Item
            name={[fieldElement.name, "startDate"]}
            fieldKey={[fieldElement.fieldKey, "startDate"]}
            label={<FormattedMessage id="item.start.date" />}
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
              viewOptions={["year", "month"]}
              placeholderText={intl.formatMessage({
                id: "select.month",
              })}
              formatDate="YYYY-MM"
              defaultDate={form.getFieldValue([
                "educations",
                fieldElement.fieldKey,
                "startDate",
              ])}
              disableWhen={{ maxDate: disabledStartDates }}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
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
              const educationItem = getFieldValue("educations")[
                fieldElement.name
              ];
              const disableEndDate = educationItem
                ? educationItem.ongoingDate
                : false;
              return (
                <>
                  {/* End Date */}
                  <Form.Item
                    name={[fieldElement.name, "endDate"]}
                    fieldKey={[fieldElement.fieldKey, "endDate"]}
                    label={<FormattedMessage id="item.end.date" />}
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
                        viewOptions={["year", "month"]}
                        placeholderText={intl.formatMessage({
                          id: "select.month",
                        })}
                        formatDate="YYYY-MM"
                        defaultDate={form.getFieldValue([
                          "educations",
                          fieldElement.fieldKey,
                          "endDate",
                        ])}
                        disableWhen={{ minDate: disabledEndDates }}
                      />
                    )}
                  </Form.Item>
                  {/* Checkbox if event is on-going */}
                  <Form.Item
                    style={{
                      marginTop: disableEndDate ? "-45px" : "-15px",
                      marginBottom: disableEndDate ? "35px" : "15px",
                    }}
                    name={[fieldElement.name, "ongoingDate"]}
                    fieldKey={[fieldElement.fieldKey, "ongoingDate"]}
                    initialValue={false}
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
            name={[fieldElement.name, "description"]}
            fieldKey={[fieldElement.fieldKey, "description"]}
            label={<FormattedMessage id="description" />}
          >
            <Input.TextArea showCount maxLength={1500} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
          <FormattedMessage id="attachment.links" />
          <Form.List
            name={[fieldElement.name, "attachmentLinks"]}
            fieldKey={[fieldElement.fieldKey, "attachmentLinks"]}
          >
            {(fields, { add, remove }) => (
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
                    type="default"
                    onClick={() => add()}
                    disabled={fields.length === 3}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined />
                    <FormattedMessage id="add.attachment" />
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
};

DatePickerField.propTypes = {
  onChange: PropTypes.func,
  placeholderText: PropTypes.string.isRequired,
  defaultDate: PropTypes.instanceOf(Object),
  viewOptions: PropTypes.arrayOf(String),
  disableWhen: PropTypes.instanceOf(Object),
  formatDate: PropTypes.string.isRequired,
};

EducationFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  schoolOptions: KeyTitleOptionsPropType,
  diplomaOptions: KeyTitleOptionsPropType,
  intl: IntlPropType,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

EducationFormView.defaultProps = {
  schoolOptions: undefined,
  diplomaOptions: undefined,
  intl: undefined,
};

export default injectIntl(EducationFormView);
