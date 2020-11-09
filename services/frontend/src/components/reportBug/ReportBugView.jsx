import React, { useState } from "react";
import { Modal, Typography, Form, Radio, Button, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { BugOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import handleError from "../../functions/handleError";

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

const ReportBugView = ({ saveDataToDB }) => {
  const [form] = Form.useForm();
  const { keycloak } = useKeycloak();
  const [visible, setVisible] = useState(false);
  const [enableSubmission, setEnableSubmission] = useState(false);
  const intl = useIntl();
  const history = useHistory();

  const radioOptions = [
    {
      label: intl.formatMessage({ id: "bugs.location.home" }),
      value: "HOME",
    },
    {
      label: intl.formatMessage({ id: "bugs.location.profile" }),
      value: "PROFILE",
    },
    {
      label: intl.formatMessage({ id: "bugs.location.search" }),
      value: "SEARCH",
    },
    {
      label: intl.formatMessage({ id: "bugs.location.forms" }),
      value: "FORMS",
    },
  ];

  /**
   * Enables/Disable modal ok button, based on the errors in the form
   */
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

  /**
   * Send API request to backend to create bug report
   */
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
          <span>
            <FormattedMessage id="bugs.action" />
          </span>
        </Button>
      )}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: !enableSubmission }}
        okText={
          <>
            <BugOutlined />
            <span>
              <FormattedMessage id="bugs.modal.ok" />
            </span>
          </>
        }
        onOk={createBugReport}
        title={<FormattedMessage id="bugs.action" />}
      >
        <Paragraph>
          <FormattedMessage id="bugs.modal.description" />
        </Paragraph>
        <Paragraph type="secondary">
          <FormattedMessage id="bugs.modal.note" />
        </Paragraph>

        <Form form={form} layout="vertical" onFieldsChange={onFormValuesChange}>
          <Form.Item
            name="location"
            label={<FormattedMessage id="bugs.location" />}
            rules={[Rules.required]}
          >
            <Radio.Group
              options={radioOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label={<FormattedMessage id="bugs.description" />}
            rules={[Rules.required, Rules.maxChar500]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ReportBugView.propTypes = {
  saveDataToDB: PropTypes.func.isRequired,
};

export default ReportBugView;
