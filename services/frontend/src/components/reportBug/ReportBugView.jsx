import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { BugOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Form, Modal, notification,Radio, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";

import handleError from "../../functions/handleError";

const { Paragraph } = Typography;

const Rules = {
  maxChar500: {
    max: 500,
    message: <FormattedMessage id="rules.max" values={{ max: 500 }} />,
  },
  required: {
    message: <FormattedMessage id="rules.required" />,
    required: true,
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
      label: intl.formatMessage({ id: "home" }),
      value: "HOME",
    },
    {
      label: intl.formatMessage({ id: "profile" }),
      value: "PROFILE",
    },
    {
      label: intl.formatMessage({ id: "search" }),
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
            id: "edit.save.success",
          }),
        });
        break;
      case "error":
        notification.error({
          description,
          message: intl.formatMessage({ id: "edit.save.error" }),
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({
            id: "edit.save.problem",
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
          className="dashes"
          onClick={() => setVisible(true)}
          type="primary"
        >
          <BugOutlined />
          <span>
            <FormattedMessage id="bugs.modal.ok" />
          </span>
        </Button>
      )}
      <Modal
        okButtonProps={{ disabled: !enableSubmission }}
        okText={
          <>
            <BugOutlined />
            <span>
              <FormattedMessage id="bugs.modal.ok" />
            </span>
          </>
        }
        onCancel={() => setVisible(false)}
        onOk={createBugReport}
        title={<FormattedMessage id="bugs.modal.ok" />}
        visible={visible}
      >
        <Paragraph>
          <FormattedMessage id="bugs.modal.description" />
        </Paragraph>
        <Paragraph type="secondary">
          <FormattedMessage id="bugs.modal.note" />
        </Paragraph>

        <Form form={form} layout="vertical" onFieldsChange={onFormValuesChange}>
          <Form.Item
            label={<FormattedMessage id="location" />}
            name="location"
            rules={[Rules.required]}
          >
            <Radio.Group
              buttonStyle="solid"
              options={radioOptions}
              optionType="button"
            />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="description" />}
            name="description"
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
