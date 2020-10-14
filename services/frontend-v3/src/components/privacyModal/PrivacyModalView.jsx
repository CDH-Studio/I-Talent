import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { FormattedMessage } from "react-intl";

const PrivacyModalView = ({ handleOk, showModal, keycloak }) => {
 
  return (
    <Modal
    title="Basic Modal"
    visible={showModal && keycloak && keycloak.authenticated}
    onOk={handleOk}
    onCancel={handleOk}
    >
  </Modal>
  );
};

PrivacyModalView.propTypes = {
    showModal: PropTypes.bool.isRequired,
    keycloak: PropTypes.object.isRequired,
    handleOk: PropTypes.func.isRequired,
};

export default PrivacyModalView;
