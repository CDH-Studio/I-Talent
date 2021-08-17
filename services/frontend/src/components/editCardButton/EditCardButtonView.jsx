import { FormattedMessage } from "react-intl";
import { EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import PropTypes from "prop-types";

import "./EditCardButtonView.less";

const EditCardButtonView = ({ redirectToEdit }) => (
  <Tooltip placement="top" title={<FormattedMessage id="edit" />}>
    <Button
      aria-label="edit card"
      className="editCardButton"
      icon={<EditOutlined />}
      onClick={redirectToEdit}
      shape="circle"
      type="default"
    />
  </Tooltip>
);

EditCardButtonView.propTypes = {
  redirectToEdit: PropTypes.func.isRequired,
};

export default EditCardButtonView;
