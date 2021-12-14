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
import PropTypes from "prop-types";

import {
  FieldPropType,
  FormInstancePropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import Fieldset from "../../../fieldset/Fieldset";
import CustomDropdown from "../../../formItems/CustomDropdown";
import DatePickerField from "../../../formItems/DatePickerField";
import LinkAttachment from "../../linkAttachment/LinkAttachment";

import "./ExperienceFormView.less";

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
  attachmentNames,
}) => {
  const intl = useIntl();

  // Name of projects label used for a custom dropdowns in the experience form
  const projectsLabelName = `experiences_${fieldElement.name}_projects`;

  const Rules = {
    maxChar1500: {
      max: 1500,
      message: <FormattedMessage id="rules.max" values={{ max: 1500 }} />,
    },
    maxChar60: {
      max: 60,
      message: <FormattedMessage id="rules.max" values={{ max: 60 }} />,
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
    form.getFieldValue(["experiences", fieldElement.fieldKey, "startDate"])
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
    form.getFieldValue(["experiences", fieldElement.fieldKey, "endDate"])
  );

  return (
    <div className="experience-formItem">
      <Row className="gutter-row titleRow" gutter={24}>
        <Col className="titleCol" lg={24} md={24} xl={24} xs={24}>
          <Title className="entryTitle" level={4}>
            <Row align="middle" justify="space-between">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="experience" />
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
          {/* Job Title Field */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "jobTitle"]}
            label={<FormattedMessage id="job.title" />}
            name={[fieldElement.name, "jobTitle"]}
            rules={[Rules.required, Rules.maxChar60]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
          {/* Company Name Field */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "organization"]}
            label={<FormattedMessage id="company.or.gov.branch.name" />}
            name={[fieldElement.name, "organization"]}
            rules={[Rules.required, Rules.maxChar60]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} xl={12} xs={24}>
          {/* Start Date */}
          <Form.Item
            fieldKey={[fieldElement.fieldKey, "startDate"]}
            label={
              <div id="start-date-label">
                <FormattedMessage id="item.start.date" />
              </div>
            }
            name={[fieldElement.name, "startDate"]}
            rules={[Rules.required]}
            shouldUpdate={(prevValues, curValues) => {
              if (prevValues !== curValues) {
                changeDisabledEnd(
                  form.getFieldValue([
                    "experiences",
                    fieldElement.fieldKey,
                    "startDate",
                  ])
                );
                changeDisabledStart(
                  form.getFieldValue([
                    "experiences",
                    fieldElement.fieldKey,
                    "endDate",
                  ])
                );
              }
            }}
          >
            <DatePickerField
              ariaDescribedby="start-date-label"
              defaultDate={form.getFieldValue([
                "experiences",
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
              const fieldPrevValues = prevValues.experiences[fieldElement.name];
              const fieldCurrentValues =
                currentValues.experiences[fieldElement.name];

              if (!fieldPrevValues || !fieldCurrentValues) {
                return false;
              }

              return (
                fieldPrevValues.ongoingDate !==
                  fieldCurrentValues.ongoingDate ||
                (fieldPrevValues.endDate &&
                  fieldPrevValues.endDate.isSame(fieldCurrentValues.endDate))
              );
            }}
          >
            {({ getFieldValue }) => {
              const experienceItem =
                getFieldValue("experiences")[fieldElement.name];

              const disableEndDate = experienceItem
                ? experienceItem.ongoingDate
                : false;

              return (
                <>
                  {/* End Date */}
                  <Form.Item
                    fieldKey={[fieldElement.fieldKey, "endDate"]}
                    label={
                      <div id="end-date-label">
                        <FormattedMessage id="item.end.date" />
                      </div>
                    }
                    name={[fieldElement.name, "endDate"]}
                    rules={!disableEndDate ? [Rules.required] : undefined}
                    shouldUpdate={(prevValues, curValues) => {
                      if (prevValues !== curValues) {
                        changeDisabledEnd(
                          form.getFieldValue([
                            "experiences",
                            fieldElement.fieldKey,
                            "startDate",
                          ])
                        );
                        changeDisabledStart(
                          form.getFieldValue([
                            "experiences",
                            fieldElement.fieldKey,
                            "endDate",
                          ])
                        );
                      }
                    }}
                  >
                    {!disableEndDate && (
                      <DatePickerField
                        ariaDescribedby="end-date-label"
                        defaultDate={form.getFieldValue([
                          "experiences",
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
                    initialValue={experienceItem ? undefined : false}
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
          <Form.Item
            className="custom-bubble-select-style"
            fieldKey={[fieldElement.fieldKey, "projects"]}
            label={<FormattedMessage id="projects" />}
            name={[fieldElement.name, "projects"]}
          >
            <CustomDropdown
              ariaLabel={intl.formatMessage({
                id: "projects",
              })}
              initialValueId={form.getFieldValue([
                "experiences",
                fieldElement.fieldKey,
                "projects",
              ])}
              inputId={projectsLabelName}
              isCreatable
              isMulti
              placeholderText={<FormattedMessage id="press.enter.to.add" />}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
          <Fieldset
            title={<FormattedMessage id="attachment.links.employment" />}
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
                        "experiences",
                        fieldElement.fieldKey,
                        "attachmentLinks",
                        field.fieldKey,
                        "nameId",
                      ])}
                      attachmentNamesOptions={attachmentNames}
                      fieldElement={field}
                      form={form}
                      removeElement={remove}
                      typeLabelName={`experiences_${fieldElement.fieldKey}_attachmentLinks_${field.fieldKey}_nameId`}
                    />
                  ))}
                  <Form.Item>
                    <Button
                      disabled={fields.length === 5}
                      onClick={() => {
                        add();
                      }}
                      style={{ width: "100%" }}
                      type="default"
                    >
                      <PlusOutlined aria-hidden="true" className="mr-1" />
                      <FormattedMessage id="attachment.links.employment.add" />
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

ExperienceFormView.propTypes = {
  attachmentNames: KeyNameOptionsPropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  form: FormInstancePropType.isRequired,
  removeElement: PropTypes.func.isRequired,
};

export default ExperienceFormView;
