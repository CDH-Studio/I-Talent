import { FormattedMessage } from "react-intl";
import { Tooltip, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./EditCardButtonView.less";

const EditCardButtonView = ({ redirectToEdit }) => (
  <Tooltip placement="top" title={<FormattedMessage id="edit" />}>
    <Button
      className="editCardButton"
      aria-label="edit card"
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
