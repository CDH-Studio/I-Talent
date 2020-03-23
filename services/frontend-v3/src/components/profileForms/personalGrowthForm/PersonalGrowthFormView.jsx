import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Button,
  TreeSelect,
  Checkbox
} from "antd";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;
const { SHOW_CHILD } = TreeSelect;

/**
 *  TalentFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const PersonalGrowthFormView = props => {
  const history = useHistory();
  const [form] = Form.useForm();

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
    },
    secondLangRow: {
      backgroundColor: "#dfe5e4",
      paddingTop: "15px",
      paddingBottom: "15px",
      marginBottom: "20px",
      marginTop: "10px"
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem"
    },
    clearBtn: { float: "left", marginBottom: "1rem" },
    finishAndNextBtn: {
      width: "100%",
      float: "right",
      marginBottom: "1rem"
    }
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async values => {
    console.log(values);
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

  /*
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async values => {
    await saveDataToDB(values);
    history.push("/secured/profile/create/step/7");
  };

  /*
   * save and finish
   *
   * Save form data and redirect home
   */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
        history.push("/secured/home");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /*
   * On Reset
   *
   * reset form fields to state when page was loaded
   */
  const onReset = () => {
    form.resetFields();
  };

  /*
   * Get the initial values for the form
   *
   */
  const getInitialValues = profile => {
    console.log(props.savedCareerMobility);
    if (profile && props) {
      return {
        developmentalGoals: props.savedDevelopmentalGoals,
        interestedInRemote: profile.interestedInRemote.toString(),
        relocationLocations: props.savedRelocationLocations,
        lookingForNewJob: props.savedLookingForNewJob,
        careerMobility: props.savedCareerMobility,
        exFeeder: props.savedExFeederBool
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    /* check if user has a skills to mentor */
  }, [props]);

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
    console.log(getInitialValues(props.profileInfo));
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          5. <FormattedMessage id="profile.employee.growth.interests" />
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
            {/* *************** Developmental ************** */}
            {/* Form Row One: Developmental Goals */}
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="setup.developmental.goals" />
            </Title>
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  className="custom-bubble-select-style"
                  name="developmentalGoals"
                  label={
                    <FormLabelTooltip
                      labelText={
                        <FormattedMessage id="setup.developmental.goals" />
                      }
                      tooltipText="Extra information"
                    />
                  }
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                  >
                    {props.developmentalGoalOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* *************** Career Interest ************** */}
            <Divider style={styles.headerDiv} />
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="setup.career.interests" />
            </Title>
            {/* Form Row One: Remote Work */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="interestedInRemote"
                  label={<FormattedMessage id="profile.interested.in.remote" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Please select"
                    allowClear={true}
                  >
                    {props.interestedInRemoteOptions.map((value, index) => {
                      return <Option key={value.key}>{value.text}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Form Row Two: Relocation */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  className="custom-bubble-select-style"
                  name="relocationLocations"
                  label={
                    <FormLabelTooltip
                      labelText={
                        <FormattedMessage id="profile.willing.to.relocate.to" />
                      }
                      tooltipText="Extra information"
                    />
                  }
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                  >
                    {props.relocationOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Form Row Three: new job */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="lookingForNewJob"
                  label={<FormattedMessage id="profile.looking.for.new.job" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Please select"
                    allowClear={true}
                  >
                    {props.lookingForNewJobOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* *************** Talent Management ************** */}
            <Divider style={styles.headerDiv} />
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="setup.talent.management" />
            </Title>

            {/* Form Row Three: career mobility */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="careerMobility"
                  label={<FormattedMessage id="profile.career.mobility" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Please select"
                    allowClear={true}
                  >
                    {props.careerMobilityOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Form Row Three: new job */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="lookingForNewJob"
                  label={<FormattedMessage id="profile.talent.matrix.result" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Please select"
                    allowClear={true}
                  >
                    {props.lookingForNewJobOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Form Row Three: new job */}
            <Row gutter={24} style={{ marginBottom: "15px" }}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item name="exFeeder" valuePropName="checked">
                  <Checkbox>
                    {<FormattedMessage id="profile.ex.feeder" />}
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            {/* *************** Control Buttons ************** */}
            {/* Form Row Four: Submit button */}
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

export default PersonalGrowthFormView;
