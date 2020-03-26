import React, { useState, useEffect, forceUpdate } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Button,
  Checkbox,
  DatePicker
} from "antd";
import { useHistory } from "react-router-dom";
import {
  RightOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import moment from "moment";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

/**
 *  QualificationsFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const QualificationsFormView = props => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [disableEducationEndDate, setDisableEducationEndDate] = useState();

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

    entryTitle: {
      fontSize: "1em"
    },

    headerDiv: {
      margin: "15px 0 15px 0"
    },
    formItem: {
      margin: "0px 0px 0px 0px !important",
      textAlign: "left"
    },
    subHeading: {
      fontSize: "1.3em"
    },
    datePicker: { width: "100%" },
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
    // set cleared field to null to clear DB data
    console.log(values);
    // values.interestedInRemote = values.interestedInRemote
    //   ? values.interestedInRemote
    //   : null;
    // values.lookingForNewJob = values.lookingForNewJob
    //   ? values.lookingForNewJob
    //   : null;
    // values.careerMobility = values.careerMobility
    //   ? values.careerMobility
    //   : null;
    // values.talentMatrixResult = values.talentMatrixResult
    //   ? values.talentMatrixResult
    //   : null;

    if (values.education) {
      for (let i = 0; i < values.education.length; i++) {
        values.education[i].startDate = values.education[i].startDate.startOf(
          "day"
        );
        values.education[i].endDate = values.education[i].endDate.endOf("day");
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

  /* Disable all dates before start date */
  const disabledDatesBeforeStart = (current, index) => {
    console.log(current);
    let values = form.getFieldsValue("education");
    // console.log(values.education[index].startDate);
    // if (values.education[index].startDate) {
    //   console.log("helloohhhh");
    //   return current && current < moment(values.education[0].startDate);
    // }
  };

  /* Disable all dates after end date */
  const disabledDatesAfterEnd = current => {
    if (form.getFieldValue("actingEndDate")) {
      return current && current > moment(form.getFieldValue("endDate"));
    }
  };

  /*
   * save and finish
   *
   * Save form data and redirect home
   */
  const getEducationForm = (field, index, remove, dd) => {
    console.log(dd);
    function onChange() {
      console.log(dd);
      let gg = disableEducationEndDate;
      gg[index] = [false, true];
      //   console.log(gg);
      //gg[index] = !gg[index];
      //setDisableEducationEndDate(gg);
      setDisableEducationEndDate(gg);
      console.log(disableEducationEndDate);
      forceUpdate();
    }

    function getdisbaled() {
      console.log(disableEducationEndDate[index]);
      return disableEducationEndDate[index];
    }

    return (
      <Row
        key={field.key}
        gutter={24}
        style={{
          backgroundColor: "#dfe5e4",
          padding: "15px 10px 15px 10px",
          marginBottom: "17px"
        }}
      >
        <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
          <Title level={4} style={styles.entryTitle}>
            <FormOutlined style={{ marginRight: "0.5em" }} />
            <FormattedMessage id="setup.education" />
            {": " + (index + 1)}
            {/* <DeleteOutlined
            onClick={() => {
              remove(field.name);
            }}
            style={{ float: "right" }}
          /> */}
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                remove(field.name);
              }}
              size={"small"}
              style={{ float: "right" }}
            />
          </Title>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          <Form.Item
            name={[field.name, "diploma"]}
            fieldKey={[field.fieldKey, "diploma"]}
            label={<FormattedMessage id="profile.diploma" />}
            style={styles.formItem}
            rules={[Rules.required]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Please select"
              allowClear={true}
            >
              {props.diplomaOptions.map((value, index) => {
                return <Option key={value.key}>{value.title}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          <Form.Item
            name={[field.name, "school"]}
            fieldKey={[field.fieldKey, "school"]}
            label={<FormattedMessage id="profile.school" />}
            rules={[Rules.required]}
            style={styles.formItem}
          >
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Please select"
              allowClear={true}
            >
              {props.schoolOptions.map((value, index) => {
                return <Option key={value.key}>{value.title}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          <Form.Item
            name={[field.name, "dateRange"]}
            fieldKey={[field.fieldKey, "dateRange"]}
            label={"Dates"}
            rules={[Rules.required]}
          >
            <div value={disableEducationEndDate}>
              <RangePicker
                picker="month"
                style={styles.datePicker}
                ranges={{
                  Today: [moment(), undefined],
                  "This Month": [moment(), "undefined"]
                }}
                //disabled={[false, disableEducationEndDate]}
                // disabled={disableEducationEndDate}
                // disabled={true}
                disabled={getdisbaled()}
              />
            </div>
          </Form.Item>
        </Col>
        <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
          <Form.Item
            name={[field.name, "dateRangeBool"]}
            //fieldKey={[field.fieldKey, "dateRange"]}
          >
            <Checkbox onChange={onChange} style={{ marginTop: "40px" }}>
              <FormattedMessage id="profile.is.ongoing" />
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  /*
   * On Reset
   *
   * reset form fields to state when page was loaded
   */
  const onReset = () => {
    form.resetFields();
  };

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
    }
  };

  /*
   * Get the initial values for the form
   *
   */
  const getInitialValues = profile => {
    if (profile && props) {
      console.log(props.savedEducation);
      return {
        education: props.savedEducation
        // interestedInRemote: profile.interestedInRemote
        //   ? profile.interestedInRemote.toString()
        //   : undefined,
        // relocationLocations: props.savedRelocationLocations,
        // lookingForNewJob: props.savedLookingForNewJob,
        // careerMobility: props.savedCareerMobility,
        // talentMatrixResult: props.savedTalentMatrixResult,
        // exFeeder: props.savedExFeederBool
      };
    } else {
      return {};
    }
  };
  useEffect(() => {
    let jj = [];
    jj.push([false, false]);
    setDisableEducationEndDate(jj);
    console.log(jj);
    /* check if user has a skills to mentor */
  }, [props]);

  //alert(disableEducationEndDate);
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
              <FormattedMessage id="setup.education" />
            </Title>
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.List name="education">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map((field, index) =>
                          //{fields.map(getEducationForm(field, index, remove))}
                          getEducationForm(
                            field,
                            index,
                            remove,
                            disableEducationEndDate
                          )
                        )}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            style={{ width: "100%" }}
                          >
                            <PlusOutlined /> Add field
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
              </Col>
            </Row>

            {/* *************** Career Interest ************** */}
            <Divider style={styles.headerDiv} />
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="setup.career.interests" />
            </Title>
            {/* Form Row One: Remote Work */}
            {/* <Row gutter={24}>
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
            </Row> */}

            {/* Form Row Two: Relocation */}
            {/* <Row gutter={24}>
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
            </Row> */}

            {/* Form Row Three: new job */}
            {/* <Row gutter={24}>
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
            </Row> */}

            {/* *************** Talent Management ************** */}
            <Divider style={styles.headerDiv} />
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="setup.talent.management" />
            </Title>

            {/* Form Row Three: career mobility */}
            {/* <Row gutter={24}>
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
            </Row> */}

            {/* Form Row Three: talent matrix */}
            {/* <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="talentMatrixResult"
                  label={<FormattedMessage id="profile.talent.matrix.result" />}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Please select"
                    allowClear={true}
                  >
                    {props.talentMatrixResultOptions.map((value, index) => {
                      return <Option key={value.key}>{value.title}</Option>;
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row> */}

            {/* Form Row Three: ex feeder */}
            {/* <Row gutter={24} style={{ marginBottom: "15px" }}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.Item name="exFeeder" valuePropName="checked">
                  <Checkbox>
                    {<FormattedMessage id="profile.ex.feeder" />}
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row> */}

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

export default QualificationsFormView;
