import { FormattedMessage, useIntl } from "react-intl";
import { Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./EditCardButtonView.less";

const EditCardButtonView = ({ redirectToEdit }) => (
  <Tooltip placement="top" title={<FormattedMessage id="profile.edit" />}>
    <Button
      role="button"
      className="editCardButton"
      aria-label={useIntl().formatMessage({ id: "edit.card" })}
      type="default"
      shape="circle"
      icon={<EditOutlined />}
      onClick={redirectToEdit}
    />
  </Tooltip>
);

EditCardButtonView.propTypes = {
  redirectToEdit: PropTypes.func.isRequired,
};

export default EditCardButtonView;
