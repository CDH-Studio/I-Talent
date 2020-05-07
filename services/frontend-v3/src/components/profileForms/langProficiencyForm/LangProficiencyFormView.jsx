import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Switch,
  DatePicker,
  Button,
  message,
  Modal,
} from "antd";
import { useHistory } from "react-router-dom";
import {
  RightOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import moment from "moment";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";
import EditProfileHeader from "../../editProfileHeader/EditProfileHeader";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;

/**
 *  LangProficiencyFormView(props)
 *  this component renders the language proficiency form.
 *  It contains a toggle to set the second language
 */
const LangProficiencyFormView = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);

  /* Component Styles */
  const styles = {
    skeleton: {
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
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
    secondLangRow: {
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
    saveBtn: {
      float: "right",
      marginBottom: "1rem",
      width: "100%",
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required",
    },
  };

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = (formType) => {
    if (formType === "create") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
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
              onClick={onSaveAndNext}
            >
              {<FormattedMessage id="setup.save.and.next" />} <RightOutlined />
            </Button>
          </Col>
        </Row>
      );
    } else if (formType === "edit") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
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
            <Button style={styles.saveBtn} type="primary" onClick={onSave}>
              {<FormattedMessage id="setup.save" />}
            </Button>
          </Col>
        </Row>
      );
    } else {
      console.log("Error Getting Action Buttons");
    }
  };

  /* toggle temporary role form */
  const toggleSecLangForm = () => {
    setDisplayMentorshipForm(!displayMentorshipForm);
  };

  /* Save data */
  const saveDataToDB = async (values) => {
    // If firstLanguage is undefined then clear value in DB
    values.firstLanguage = values.firstLanguage ? values.firstLanguage : null;

    if (!displayMentorshipForm) {
      // if second language tab is not opened clear values before submission
      values.secondLanguage = null;
      values.readingProficiency = null;
      values.writingProficiency = null;
      values.oralProficiency = null;
      values.secondaryReadingDate = null;
      values.secondaryWritingDate = null;
      values.secondaryOralDate = null;
    } else {
      // set second language based on first language
      values.secondLanguage = values.firstLanguage === "en" ? "fr" : "en";

      // format dates before submit
      if (values.secondaryReadingDate) {
        values.secondaryReadingDate = values.secondaryReadingDate.startOf(
          "day"
        );
      }
      if (values.secondaryWritingDate) {
        values.secondaryWritingDate = values.secondaryWritingDate.startOf(
          "day"
        );
      }
      if (values.secondaryOralDate) {
        values.secondaryWritingDate = values.secondaryOralDate.startOf("day");
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

  /* show message */
  const openNotificationWithIcon = (type) => {
    switch (type) {
      case "success":
        message.success(
          props.intl.formatMessage({ id: "profile.edit.save.success" })
        );
        break;
      case "error":
        message.error(
          props.intl.formatMessage({ id: "profile.edit.save.error" })
        );
        break;
      default:
        message.warning(
          props.intl.formatMessage({ id: "profile.edit.save.problem" })
        );
        break;
    }
  };

  /* save and show success notification */
  const onSave = async (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        openNotificationWithIcon("success");
      })
      .catch(() => {
        console.log("validation failure");
        openNotificationWithIcon("error");
      });
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/5");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/8");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info("Form Cleared");
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getSecondLanguageForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <div>
          {/* Reading Proficiency */}
          <Row gutter={24} style={{ marginTop: "10px" }}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="readingProficiency"
                label={
                  <FormattedMessage id="profile.secondary.reading.proficiency" />
                }
                rules={[Rules.required]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.proficiencyOptions.map((value, index) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryReadingDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
                rules={[Rules.required]}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>

          {/* Writing Proficiency */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="writingProficiency"
                label={
                  <FormattedMessage id="profile.secondary.writing.proficiency" />
                }
                rules={[Rules.required]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.proficiencyOptions.map((value, index) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryWritingDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
                rules={[Rules.required]}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>

          {/* Oral Proficiency */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="oralProficiency"
                label={
                  <FormattedMessage id="profile.secondary.oral.proficiency" />
                }
                rules={[Rules.required]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.proficiencyOptions.map((value, index) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryOralDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
                rules={[Rules.required]}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div />;
    }
  };

  /* Generate form header based on form type */
  const getFormHeader = (formType) => {
    if (formType == "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          4. <FormattedMessage id="setup.language.proficiency" />
        </Title>
      );
    } else {
      return (
        <Title level={2} style={styles.formTitle}>
          <FormattedMessage id="setup.language.proficiency" />
        </Title>
      );
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = (profile) => {
    // Get default language from API and convert to dropdown key
    let firstLanguage = null;
    if (profile) {
      if (profile.firstLanguage) {
        firstLanguage = profile.firstLanguage.en === "English" ? "en" : "fr";
      } else {
        firstLanguage = undefined;
      }

      return {
        firstLanguage: firstLanguage,
        ...(profile.secondaryReadingProficiency && {
          readingProficiency: profile.secondaryReadingProficiency,
        }),
        ...(profile.secondaryWritingProficiency && {
          writingProficiency: profile.secondaryWritingProficiency,
        }),
        ...(profile.secondaryOralProficiency && {
          oralProficiency: profile.secondaryOralProficiency,
        }),
        ...(profile.secondaryReadingDate && {
          secondaryReadingDate: moment(profile.secondaryReadingDate),
        }),
        ...(profile.secondaryWritingDate && {
          secondaryWritingDate: moment(profile.secondaryWritingDate),
        }),
        ...(profile.secondaryOralDate && {
          secondaryOralDate: moment(profile.secondaryOralDate),
        }),
      };
    } else {
      return {};
    }
  };

  /* Returns true if the values in the form have changed based on its initial values */
  const checkIfFormValuesChanged = () => {
    const formValues = form.getFieldsValue();
    const initialValues = getInitialValues(props.profileInfo);

    return Object.keys(formValues).some(
      (key) => formValues[key] !== initialValues[key]
    );
  };

  /* Redirect to profile view */
  const redirectToProfile = () => {
    history.push("/secured/profile/" + localStorage.getItem("userId"));
  };

  /* Returns to profile view all while taking into account the new content in the form  */
  const returnToProfile = () => {
    if (checkIfFormValuesChanged()) {
      Modal.confirm({
        title: props.intl.formatMessage({
          id: "profile.edit.changes.modal.title",
        }),
        icon: <ExclamationCircleOutlined />,
        content: props.intl.formatMessage({
          id: "profile.edit.changes.modal.content",
        }),
        okText: props.intl.formatMessage({ id: "setup.save" }),
        cancelText: props.intl.formatMessage({
          id: "profile.edit.changes.modal.cancel",
        }),
        onOk() {
          form
            .validateFields()
            .then(async (values) => {
              await saveDataToDB(values);
              redirectToProfile();
            })
            .catch(() => {
              console.log("validation failure");
              openNotificationWithIcon("error");
              Modal.destroyAll();
            });
        },
        onCancel: redirectToProfile,
      });
    } else {
      redirectToProfile();
    }
  };

  useEffect(() => {
    /* check if user has a second language */
    setDisplayMentorshipForm(
      props.profileInfo ? Boolean(props.profileInfo.secondLanguage) : false
    );
  }, [props.profileInfo]);

  /************************************
   ********* Render Component *********
   ************************************/
  let content = (
    /* If form data is loading then wait */
    <div style={styles.content}>
      <Skeleton active />
    </div>
  );

  if (props.load) {
    /* Once data had loaded display form */
    content = (
      <div style={styles.content}>
        {/* get form title */}
        {getFormHeader(props.formType)}
        <Divider style={styles.headerDiv} />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          form={form}
          initialValues={getInitialValues(props.profileInfo)}
          layout="vertical"
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="firstLanguage"
                label={<FormattedMessage id="profile.first.language" />}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.languageOptions.map((value, index) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Four: Temporary role */}
          <Row style={styles.secondLangRow} gutter={24}>
            <Col className="gutter-row" span={24}>
              <FormLabelTooltip
                labelText={
                  <FormattedMessage id="profile.graded.on.second.language" />
                }
                tooltipText="Extra information"
              />
              <Switch
                defaultChecked={displayMentorshipForm}
                onChange={toggleSecLangForm}
              />
              {getSecondLanguageForm(displayMentorshipForm)}
            </Col>
          </Row>
          {/* Form Row Five: Submit button */}
          {getFormControlButtons(props.formType)}
        </Form>
      </div>
    );
  }

  return (
    <>
      {props.formType === "edit" && (
        <EditProfileHeader returnToProfile={returnToProfile} />
      )}
      {content}
    </>
  );
};

export default injectIntl(LangProficiencyFormView);
