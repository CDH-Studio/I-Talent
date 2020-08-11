import React from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const EditCardButtonView = ({ redirectToEdit, floatRight }) => (
  <Tooltip placement="top" title={<FormattedMessage id="profile.edit" />}>
    <Button
      aria-label="edit card"
      type="default"
      shape="circle"
      icon={<EditOutlined />}
      onClick={redirectToEdit}
      style={floatRight ? { float: "right" } : null}
    />
  </Tooltip>
);

EditCardButtonView.propTypes = {
  redirectToEdit: PropTypes.func.isRequired,
  floatRight: PropTypes.bool,
};

EditCardButtonView.defaultProps = {
  floatRight: false,
};

export default EditCardButtonView;
