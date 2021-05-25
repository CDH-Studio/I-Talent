import {
  Row,
  Col,
  Typography,
  Form,
  Button,
  Checkbox,
  Input,
  Tooltip,
  Select,
} from "antd";
import PropTypes from "prop-types";
import {
  FormOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { useState } from "react";

import {
  FieldPropType,
  FormInstancePropType,
  IntlPropType,
  KeyNameOptionsPropType,
} from "../../../../utils/customPropTypes";
import "./ExperienceFormView.less";
import LinkAttachment from "../../linkAttachment/LinkAttachment";
import DatePickerField from "../../../formItems/DatePickerField";

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
  intl,
}) => {
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
    maxChar60: {
      max: 60,
      message: <FormattedMessage id="rules.max" values={{ max: 60 }} />,
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
      <Row gutter={24} className="gutter-row titleRow">
        <Col className="titleCol" xs={24} md={24} lg={24} xl={24}>
          <Title level={4} className="entryTitle">
            <Row justify="space-between" align="middle">
              <Col>
                <FormOutlined className="formItemIcon" />
                <FormattedMessage id="experience" />
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
          {/* Job Title Field */}
          <Form.Item
            name={[fieldElement.name, "jobTitle"]}
            fieldKey={[fieldElement.fieldKey, "jobTitle"]}
            label={<FormattedMessage id="job.title" />}
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
            label={<FormattedMessage id="company.or.gov.branch.name" />}
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
            label={<FormattedMessage id="item.start.date" />}
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
              viewOptions={["year", "month"]}
              placeholderText={intl.formatMessage({
                id: "select.month",
              })}
              formatDate="YYYY-MM"
              defaultDate={form.getFieldValue([
                "experiences",
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
                    name={[fieldElement.name, "endDate"]}
                    fieldKey={[fieldElement.fieldKey, "endDate"]}
                    label={<FormattedMessage id="item.end.date" />}
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
                        viewOptions={["year", "month"]}
                        placeholderText={intl.formatMessage({
                          id: "select.month",
                        })}
                        formatDate="YYYY-MM"
                        defaultDate={form.getFieldValue([
                          "experiences",
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
          <Form.Item
            mode="tags"
            name={[fieldElement.name, "projects"]}
            fieldKey={[fieldElement.fieldKey, "projects"]}
            label={<FormattedMessage id="projects" />}
            className="custom-bubble-select-style"
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder={<FormattedMessage id="press.enter.to.add" />}
            />
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
                    form={form}
                    fieldElement={field}
                    removeElement={remove}
                    nameOptions={attachmentNames}
                  />
                ))}
                <Form.Item>
                  <Button
                    type="default"
                    onClick={() => {
                      add();
                    }}
                    disabled={fields.length === 5}
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

ExperienceFormView.propTypes = {
  form: FormInstancePropType.isRequired,
  fieldElement: FieldPropType.isRequired,
  removeElement: PropTypes.func.isRequired,
  intl: IntlPropType,
  attachmentNames: KeyNameOptionsPropType.isRequired,
};

ExperienceFormView.defaultProps = {
  intl: undefined,
};

export default injectIntl(ExperienceFormView);
