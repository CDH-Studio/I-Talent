import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const PrivacyModalView = ({ handleOk, handleCancel, showModal, keycloak }) => {
  return (
    <Modal
      title={
        <>
          <LockOutlined /> Privacy Agreement
        </>
      }
      visible={showModal && keycloak && keycloak.authenticated}
      maskClosable={false}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
    >
      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
        <p>
          Please be advised that by logging in you have the ability to
          self-administer information about yourself. The collection of your
          self-administered information is known as your Profile information to
          showcase your professional history. You will be able to control who
          and what information I-Talent members at ISED can see in your profile
          settings.
        </p>
        <p>
          All personal information collected and used in this application is
          considered voluntarily provided and any use or disclosure will be
          governed by the rights of access to, correction of, and protection of
          personal information under the Privacy Act.
        </p>
        <p>
          Your personal information will be used for human resources related
          activities, such as, but not limited to, the following purposes: match
          interested and qualified people to positions or roles, identify skills
          and competencies at various levels, design development strategies, and
          planning and reporting. The personal information collected will be
          retained and disposed of in accordance with the ISED retention and
          disposal schedule.
        </p>
        <p>
          You are required to respect the obligations set out in the Values and
          Ethics Code for the Public Sector and as such are held accountable for
          all your Profile information that you have self-administered.
        </p>
        <p>
          Please note that the Department may remove your profile at its sole
          discretion.
        </p>
        <p>
          Please refer to the Terms and Conditions and Privacy for additional
          privacy related information and your responsibility when entering your
          profile information.
        </p>
        <p>
          If you require clarification or more information on privacy issues and
          the Privacy Act, you can contact our ATIP Services at
          atip-aiprpa.ic@canada.ca.
        </p>
        <p>
          By submitting your information, you are confirming that you have
          accessed this Privacy notice statement and disclaimer and are now
          ready to provide your personal information in accordance with it.
        </p>
      </div>
    </Modal>
  );
};

PrivacyModalView.propTypes = {
  showModal: PropTypes.bool.isRequired,
  keycloak: PropTypes.object.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default PrivacyModalView;
