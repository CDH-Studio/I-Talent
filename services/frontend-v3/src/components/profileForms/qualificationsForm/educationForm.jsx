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
  DatePicker,
} from "antd";
import { useHistory } from "react-router-dom";
import {
  RightOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
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
const EducationForm = (props) => {
  const [ll, setLl] = useState([false, false]);
  const [disableEndDate, setDisableEndDate] = useState();

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

    entryTitle: {
      fontSize: "1em",
    },

    headerDiv: {
      margin: "15px 0 15px 0",
    },
    formItem: {
      margin: "0px 0px 0px 0px !important",
      textAlign: "left",
    },
    subHeading: {
      fontSize: "1.3em",
    },
    datePicker: { width: "100%" },
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
  };

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

  const onChange = () => {
    setLl([false, !ll[1]]);

    // let formName = props.form.__INTERNAL__.name;
    // let feildName = startDate;
    //console.log(formName);
    console.log(props.form);
    console.log(props.field);
    console.log(
      props.form.getFieldValue(["education", props.field.fieldKey, "startDate"])
    );
    // props.form.setFieldsValue({
    //   education_0_startDate: moment(),
    // });
    // props.form.setFieldsValue(
    //   ["education", props.field.fieldKey, "startDate"],
    //   gg.add(7, "days")
    // );
    // props.form.setFieldsValue({
    //   education_0_startDate: moment.add(7, "days"),
    // });

    console.log(
      props.form.getFieldValue(["education", props.field.fieldKey, "startDate"])
    );

    // if (ll[1]) {
    //   form.setFieldsValue({
    //     dateRan: null,
    //   });
    // }
  };

  /* enable or disable end date field */
  const toggleEndDate = () => {
    // reset end date value
    // if (enableSecondLang) {
    //   form.setFieldsValue({
    //     actingEndDate: null,
    //   });
    // }
    // console.log(
    //   props.form.getFieldValue([
    //     "education",
    //     props.field.fieldKey,
    //     "startDateV2",
    //   ])
    // );
    if (!disableEndDate) {
      const fieldPath = ["education", props.field.fieldKey, "endDate"];
      try {
        const kk = props.form.getFieldsValue("education");
        kk.education[props.field.fieldKey].endDate = null;
        console.log(props.form.getFieldsValue("education"));
        props.form.setFieldsValue(kk);
      } catch (e) {
        console.log(e);
      }
    }
    setDisableEndDate(!disableEndDate);
  };

  /* Disable all dates before start date */
  const disabledDatesBeforeStart = (current) => {
    const fieldPath = ["education", props.field.fieldKey, "startDate"];
    console.log(props.form.getFieldValue(fieldPath));
    if (props.form.getFieldValue(fieldPath)) {
      return (
        current &&
        current < moment(props.form.getFieldValue(fieldPath).startOf("month"))
      );
    }
  };

  /* Disable all dates after end date */
  const disabledDatesAfterEnd = (current) => {
    const fieldPath = ["education", props.field.fieldKey, "endDate"];
    if (props.form.getFieldValue(fieldPath)) {
      return (
        current &&
        current > moment(props.form.getFieldValue(fieldPath).startOf("month"))
      );
    }
  };

  useEffect(() => {
    let jj = [];
    jj.push([false, false]);
    // setDisableEducationEndDate(jj);
    console.log(jj);
    /* check if user has a skills to mentor */
  }, [props]);

  //alert(disableEducationEndDate);
  /************************************
   ********* Render Component *********
   ************************************/
  return (
    <Row
      key={props.fieldKey}
      gutter={24}
      style={{
        backgroundColor: "#dfe5e4",
        padding: "15px 10px 15px 10px",
        marginBottom: "17px",
      }}
    >
      <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
        <Title level={4} style={styles.entryTitle}>
          <FormOutlined style={{ marginRight: "0.5em" }} />
          <FormattedMessage id="setup.education" />
          {": " + (props.index + 1)}
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
              props.remove(props.field.name);
            }}
            size={"small"}
            style={{ float: "right" }}
          />
        </Title>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={[props.field.name, "diploma"]}
          fieldKey={[props.field.fieldKey, "diploma"]}
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
          name={[props.field.name, "school"]}
          fieldKey={[props.field.fieldKey, "school"]}
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
            {props.schoolOptions.map((value) => {
              return <Option key={value.key}>{value.title}</Option>;
            })}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={[props.field.name, "startDate"]}
          fieldKey={[props.field.fieldKey, "startDate"]}
          label={<FormattedMessage id="profile.history.item.start.date" />}
          rules={[Rules.required]}
        >
          <DatePicker
            picker="month"
            disabledDate={disabledDatesAfterEnd}
            style={styles.datePicker}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={[props.field.name, "endDate"]}
          fieldKey={[props.field.fieldKey, "endDate"]}
          label={<FormattedMessage id="profile.history.item.end.date" />}
          rules={!disableEndDate ? [Rules.required] : undefined}
        >
          <DatePicker
            picker="month"
            style={styles.datePicker}
            disabledDate={disabledDatesBeforeStart}
            disabled={disableEndDate}
            placeholder={"unknown"}
          />
        </Form.Item>
        <div style={{ marginTop: "-10px" }}>
          <Checkbox
            onChange={toggleEndDate}
            //defaultChecked={enableEndDate}
          >
            <FormattedMessage id="profile.is.ongoing" />
          </Checkbox>
        </div>
      </Col>
    </Row>
  );
};

export default EducationForm;
