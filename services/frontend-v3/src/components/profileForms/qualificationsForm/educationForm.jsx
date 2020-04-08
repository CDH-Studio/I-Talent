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
        <p>{console.log(ll)}</p>
        <Form.Item
          name={[props.field.name, "dateRange"]}
          fieldKey={[props.field.fieldKey, "dateRange"]}
          label={"Dates"}
          rules={[Rules.required]}
        >
          <RangePicker
            picker="month"
            style={styles.datePicker}
            ranges={{
              Today: [moment(), undefined],
              "This Month": [moment(), "undefined"],
            }}
            //disabled={[false, disableEducationEndDate]}
            // disabled={disableEducationEndDate}
            // disabled={true}
            disabled={ll}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={[props.field.name, "dateRangeBool"]}
          //fieldKey={[field.fieldKey, "dateRange"]}
        >
          <Checkbox style={{ marginTop: "40px" }} onChange={onChange}>
            <FormattedMessage id="profile.is.ongoing" />
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default EducationForm;
