import React, { useState } from "react";
import { Modal, Typography, Input, Form, Radio, Button } from "antd";
import { useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { BugOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";

const { Paragraph } = Typography;

const ReportBugView = () => {
  const [form] = Form.useForm();
  const { keycloak } = useKeycloak();
  const [visible, setVisible] = useState(false);

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
        okButtonProps={{ disabled: true, icon: <BugOutlined /> }}
        okText="Send bug report"
        onOk={() => setVisible(false)}
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

        <Form form={form} layout="vertical">
          <Form.Item name="location" label="Location" required>
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
          <Form.Item name="description" label="Description" required>
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReportBugView;
