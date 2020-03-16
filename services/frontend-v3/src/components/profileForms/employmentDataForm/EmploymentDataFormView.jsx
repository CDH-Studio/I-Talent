import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
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
  Button
} from "antd";
import { RightOutlined } from "@ant-design/icons";
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
const EmploymentDataFormView = props => {
  const [form] = Form.useForm();
  /* define states */
  const [displayTempRoleForm, setDisplayTempRoleForm] = useState(false);
  const [enableTemEndDate, setEnableTemEndDate] = useState();

  /* toggle temporary role form */
  const toggleTempRoleForm = () => {
    setDisplayTempRoleForm(!displayTempRoleForm);
  };

  /* enable or disable end date field */
  const toggleTempEndDate = () => {
    console.log(enableTemEndDate);
    // reset end date value
    if (enableTemEndDate) {
      form.setFieldsValue({
        actingEndDate: null
      });
    }
    setEnableTemEndDate(!enableTemEndDate);
  };

  /* Handle form submission */
  const handleSubmit = async values => {
    console.log(values);
    if (props.profileInfo) {
      //If profile exists then update profile
      try {
        await axios.put(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      //If profile does not exists then create profile
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

  /* Get temporary role form based on if the form switch is toggled */
  const getTempRoleForm = expandTempRoleForm => {
    if (expandTempRoleForm) {
      return (
        // <div style={{ width: "100%" }}>
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
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingEndDate"
              label={<FormattedMessage id="profile.acting.period.end.date" />}
              rules={enableTemEndDate ? [Rules.required] : undefined}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabled={!enableTemEndDate}
                placeholder={"unknown"}
              />
            </Form.Item>
            <Checkbox
              onChange={toggleTempEndDate}
              defaultChecked={enableTemEndDate}
            >
              <FormattedMessage id="profile.acting.has.end.date" />
            </Checkbox>
          </Col>
        </Row>
        // </div>
      );
    } else {
      return <div />;
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = profile => {
    if (profile) {
      return {
        ...(profile.classification.id && {
          groupLevelId: profile.classification.id
        }),
        ...(profile.temporaryRole.id && {
          tenureId: profile.temporaryRole.id
        }),
        ...(profile.security.id && {
          securityClearanceId: profile.security.id
        }),
        manager: profile.manager,
        ...(profile.acting.id && {
          actingId: profile.acting.id
        }),
        ...(profile.actingPeriodStartDate && {
          actingStartDate: moment(profile.actingPeriodStartDate)
        }),
        ...(profile.actingPeriodEndDate && {
          actingEndDate: moment(profile.actingPeriodEndDate)
        })
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    /* check if user has acting information in db to expand acting form */
    setDisplayTempRoleForm(
      props.profileInfo ? !!props.profileInfo.acting.id : false
    );

    /* check if user has acting end date to enable the date felid on load */
    setEnableTemEndDate(
      props.profileInfo ? Boolean(props.profileInfo.actingPeriodEndDate) : false
    );
  }, [props.profileInfo]);

  /* Component Styles */
  const styles = {
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px"
    },
    formTitle: {
      fontSize: "1.2em"
    },
    headerDiv: {
      margin: "15px 0 15px 0"
    },
    formItem: {
      margin: "10px 0 10px 0",
      padding: "0 20px 0 0",
      textAlign: "left"
    },
    subHeading: {
      fontSize: "1.3em"
    }
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required"
    },
    maxChar50: {
      max: 50,
      message: "Max length 50 characters"
    },
    maxChar100: {
      max: 50,
      message: "Max length 100 characters"
    },
    telephoneFormat: {
      pattern: /^\d{3}-\d{3}-\d{4}$/i, // prettier-ignore
      message: "required format: 111-222-3333"
    },
    emailFormat: {
      pattern: /\S+@\S+\.ca/i, // prettier-ignore
      message: "Please Provide a valid Gov. Canada email"
    }
  };

  /********* Render Component *********/
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
            onFinish={handleSubmit}
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
            {/* Form Row Three */}{" "}
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
            <Row
              style={{
                backgroundColor: "#dfe5e4",
                paddingTop: "15px",
                paddingBottom: "15px",
                marginBottom: "20px",
                marginTop: "10px"
              }}
              gutter={24}
            >
              <Col className="gutter-row" span={24}>
                <FormLabelTooltip
                  labelText={<FormattedMessage id="profile.temporary.role" />}
                  tooltipText="Extra information"
                />
                <Switch
                  defaultChecked={displayTempRoleForm}
                  onChange={toggleTempRoleForm}
                />
                {getTempRoleForm(displayTempRoleForm)}
              </Col>
            </Row>
            {/* Form Row Five: Submit button */}
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item>
                  <Button
                    style={{ float: "right" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {<FormattedMessage id="setup.save.and.next" />}{" "}
                    <RightOutlined />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
};

export default EmploymentDataFormView;
