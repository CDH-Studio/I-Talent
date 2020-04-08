import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  Switch,
  DatePicker,
  Checkbox,
  Button,
} from "antd";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import moment from "moment";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;

/**
 *  EmploymentDataFormView(props)
 *  this component renders the employment information form.
 *  It contains a toggle to set the acting role
 */
const EmploymentDataFormView = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [enableSecondLang, setEnableSecondLang] = useState();

  /* Component Styles */
  const styles = {
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    formTitle: {
      fontSize: "1.2em",
    },
    headerDiv: {
      margin: "15px 0 15px 0",
    },
    formItem: {
      margin: "10px 0 10px 0",
      padding: "0 20px 0 0",
      textAlign: "left",
    },
    subHeading: {
      fontSize: "1.3em",
    },
    tempRoleRow: {
      backgroundColor: "#dfe5e4",
      paddingTop: "15px",
      paddingBottom: "15px",
      marginBottom: "20px",
      marginTop: "10px",
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
    clearBtn: { float: "left", marginBottom: "1rem" },
    finishAndNextBtn: {
      width: "100%",
      float: "right",
      marginBottom: "1rem",
    },
    datePicker: { width: "100%" },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required",
    },
    maxChar50: {
      max: 50,
      message: "Max length 50 characters",
    },
    maxChar100: {
      max: 50,
      message: "Max length 100 characters",
    },
  };

  /* toggle temporary role form */
  const toggleTempRoleForm = () => {
    setDisplayMentorshipForm(!displayMentorshipForm);
  };

  /* enable or disable end date field */
  const toggleTempEndDate = () => {
    console.log(enableSecondLang);
    // reset end date value
    if (enableSecondLang) {
      form.setFieldsValue({
        actingEndDate: null,
      });
    }
    setEnableSecondLang(!enableSecondLang);
  };

  /* Disable all dates before start date */
  const disabledDatesBeforeStart = (current) => {
    if (form.getFieldValue("actingStartDate")) {
      return current && current < moment(form.getFieldValue("actingStartDate"));
    }
  };

  /* Disable all dates after end date */
  const disabledDatesAfterEnd = (current) => {
    if (form.getFieldValue("actingEndDate")) {
      return current && current > moment(form.getFieldValue("actingEndDate"));
    }
  };

  /* Save data */
  const saveDataToDB = async (values) => {
    // If dropdown value is undefined then clear value in DB
    values.tenureId = values.tenureId ? values.tenureId : null;
    values.groupLevelId = values.groupLevelId ? values.groupLevelId : null;
    values.securityClearanceId = values.securityClearanceId
      ? values.securityClearanceId
      : null;

    if (!displayMentorshipForm) {
      // if temp role toggle isn't active clear data
      values.actingId = null;
      values.actingStartDate = null;
      values.actingEndDate = null;
    } else {
      // format dates before submit
      if (values.actingStartDate) {
        values.actingStartDate = values.actingStartDate.startOf("day");
      }
      if (values.actingEndDate) {
        values.actingEndDate = values.actingEndDate.endOf("day");
      }
    }

    if (props.profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // If profile does not exists then create profile
      try {
        await axios.post(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async (values) => {
    await saveDataToDB(values);
    history.push("/secured/profile/create/step/4");
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/home");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getTempRoleForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <Row gutter={24} style={{ marginTop: "10px" }}>
          <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
            <Form.Item
              name="actingId"
              label={<FormattedMessage id="profile.acting" />}
              rules={[Rules.required]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="choose classification"
                allowClear={true}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {props.classificationOptions.map((value, index) => {
                  return <Option key={value.id}>{value.description}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingStartDate"
              label={<FormattedMessage id="profile.acting.period.start.date" />}
              rules={[Rules.required]}
            >
              <DatePicker
                disabledDate={disabledDatesAfterEnd}
                style={styles.datePicker}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingEndDate"
              label={<FormattedMessage id="profile.acting.period.end.date" />}
              rules={enableSecondLang ? [Rules.required] : undefined}
            >
              <DatePicker
                style={styles.datePicker}
                disabledDate={disabledDatesBeforeStart}
                disabled={!enableSecondLang}
                placeholder={"unknown"}
              />
            </Form.Item>
            <div style={{ marginTop: "-10px" }}>
              <Checkbox
                onChange={toggleTempEndDate}
                defaultChecked={enableSecondLang}
              >
                <FormattedMessage id="profile.acting.has.end.date" />
              </Checkbox>
            </div>
          </Col>
        </Row>
      );
    } else {
      return <div />;
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = (profile) => {
    if (profile) {
      return {
        ...(profile.classification && {
          groupLevelId: profile.classification.id,
        }),
        ...(profile.temporaryRole && {
          tenureId: profile.temporaryRole.id,
        }),
        ...(profile.security && {
          securityClearanceId: profile.security.id,
        }),
        manager: profile.manager,
        ...(profile.acting && {
          actingId: profile.acting.id,
        }),
        ...(profile.actingPeriodStartDate && {
          actingStartDate: moment(profile.actingPeriodStartDate),
        }),
        ...(profile.actingPeriodEndDate && {
          actingEndDate: moment(profile.actingPeriodEndDate),
        }),
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    /* check if user has acting information in db to expand acting form */
    setDisplayMentorshipForm(
      props.profileInfo &&
        props.profileInfo.acting &&
        !!props.profileInfo.acting.id
    );

    /* check if user has acting end date to enable the date felid on load */
    setEnableSecondLang(
      props.profileInfo ? Boolean(props.profileInfo.actingPeriodEndDate) : false
    );
  }, [props.profileInfo]);

  /************************************
   ********* Render Component *********
   ************************************/
  if (!props.load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.content}>
        <Skeleton active />
      </div>
    );
  } else {
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          3. <FormattedMessage id="setup.employment" />
        </Title>
        <Divider style={styles.headerDiv} />
        <div key={props.profileInfo}>
          {/* Create for with initial values */}
          <Form
            name="basicForm"
            form={form}
            initialValues={getInitialValues(props.profileInfo)}
            layout="vertical"
            onFinish={onSaveAndNext}
          >
            {/* Form Row One */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name="tenureId"
                  label={<FormattedMessage id="profile.substantive" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose substantive"
                    allowClear={true}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.substantiveOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name="groupLevelId"
                  label={<FormattedMessage id="profile.classification" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose classification"
                    allowClear={true}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.classificationOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Two */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="securityClearanceId"
                  label={<FormattedMessage id="profile.security" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose security"
                    allowClear={true}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.securityOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Three */}
            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  name="manager"
                  label={<FormattedMessage id="profile.manager" />}
                  rules={[Rules.maxChar50]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Four: Temporary role */}
            <Row style={styles.tempRoleRow} gutter={24}>
              <Col className="gutter-row" span={24}>
                <FormLabelTooltip
                  labelText={<FormattedMessage id="profile.temporary.role" />}
                  tooltipText="Extra information"
                />
                <Switch
                  defaultChecked={displayMentorshipForm}
                  onChange={toggleTempRoleForm}
                />
                {getTempRoleForm(displayMentorshipForm)}
              </Col>
            </Row>
            {/* Form Row Five: Submit button */}
            <Row gutter={24}>
              <Col xs={24} md={24} lg={18} xl={18}>
                <Button
                  style={styles.finishAndSaveBtn}
                  onClick={onSaveAndFinish}
                  htmlType="button"
                >
                  <CheckOutlined style={{ marginRight: "0.2rem" }} />
                  {<FormattedMessage id="setup.save.and.finish" />}
                </Button>
                <Button
                  style={styles.clearBtn}
                  htmlType="button"
                  onClick={onReset}
                  danger
                >
                  {<FormattedMessage id="button.clear" />}
                </Button>
              </Col>
              <Col xs={24} md={24} lg={6} xl={6}>
                <Button
                  style={styles.finishAndNextBtn}
                  type="primary"
                  htmlType="submit"
                >
                  {<FormattedMessage id="setup.save.and.next" />}{" "}
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
};

export default EmploymentDataFormView;
