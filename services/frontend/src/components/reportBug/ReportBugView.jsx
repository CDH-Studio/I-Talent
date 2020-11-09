import React, { useState } from "react";
import {
  Modal,
  Typography,
  Form,
  Radio,
  Button,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BugOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import handleError from "../../functions/handleError";
import useAxios from "../../utils/useAxios";

const { Paragraph } = Typography;

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="profile.rules.required" />,
  },
  maxChar500: {
    max: 500,
    message: <FormattedMessage id="profile.rules.max" values={{ max: 500 }} />,
  },
};

const ReportBugView = () => {
  const [form] = Form.useForm();
  const { keycloak } = useKeycloak();
  const [visible, setVisible] = useState(false);
  const [enableSubmission, setEnableSubmission] = useState(false);
  const intl = useIntl();
  const axios = useAxios();
  const history = useHistory();

  const onFormValuesChange = () => {
    const formErrors = form.getFieldsError();

    setEnableSubmission(!formErrors.some(({ errors }) => errors.length !== 0));
  };

  /**
   * Open Notification
   * @param {Object} notification - The notification to be displayed.
   * @param {string} notification.type - The type of notification.
   * @param {string} notification.description - Additional info in notification.
   */
  const openNotificationWithIcon = ({ type, description }) => {
    switch (type) {
      case "success":
        notification.success({
          message: intl.formatMessage({
            id: "profile.edit.save.success",
          }),
        });
        break;
      case "error":
        notification.error({
          message: intl.formatMessage({ id: "profile.edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({
            id: "profile.edit.save.problem",
          }),
        });
        break;
    }
  };

  const saveDataToDB = async (values) => {
    await axios.post("api/bugs", values);
  };

  const createBugReport = () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        openNotificationWithIcon({ type: "success" });
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        handleError(error, "message", history);
      });
  };

  return (
    <>
      {keycloak && keycloak.authenticated && (
        <Button
          type="primary"
          className="dashes"
          onClick={() => setVisible(true)}
        >
          <BugOutlined />
          <span>Report a bug</span>
        </Button>
      )}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: !enableSubmission, icon: <BugOutlined /> }}
        okText="Send bug report"
        onOk={createBugReport}
        closable={false}
        title="Report a bug"
      >
        <Paragraph>
          Sorry to hear you encountered a bug. Please fill out the following
          fields for us to address the bug.
        </Paragraph>
        <Paragraph type="secondary">
          Your account will be linked to this report, for us to contact you in
          case
        </Paragraph>

        <Form form={form} layout="vertical" onFieldsChange={onFormValuesChange}>
          <Form.Item name="location" label="Location" rules={[Rules.required]}>
            <Radio.Group
              options={[
                { label: "Home", value: "HOME" },
                { label: "Profile", value: "PROFILE" },
                { label: "Search", value: "SEARCH" },
                { label: "Forms", value: "FORMS" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[Rules.required, Rules.maxChar500]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReportBugView;
