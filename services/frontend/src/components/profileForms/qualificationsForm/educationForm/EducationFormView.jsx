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
  Input,
} from "antd";
import {
  FormOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import dayjs from "dayjs";
import PropTypes from "prop-types";

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
      message: (
        <FormattedMessage id="rules.max" values={{ max: 1500 }} />
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
              <Tooltip
                placement="top"
                title={<FormattedMessage id="delete" />}
              >
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
          >
            <DatePicker
              picker="month"
              disabledDate={disabledDatesAfterEnd}
              className="datePicker"
              placeholder={intl.formatMessage({
                id: "select.month",
              })}
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
                  fieldPrevValues.endDate.isSame(fieldCurrentValues.endDate))
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
                    label={
                      <FormattedMessage id="item.end.date" />
                    }
                  >
                    {!disableEndDate && (
                      <DatePicker
                        picker="month"
                        disabledDate={disabledDatesBeforeStart}
                        disabled={disableEndDate}
                        className="datePicker"
                        placeholder={intl.formatMessage({
                          id: "select.month",
                        })}
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
              );
            }}
          </Form.List>
        </Col>
      </Row>
    </div>
  );
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
