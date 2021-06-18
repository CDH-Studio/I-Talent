import PropTypes from "prop-types";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";

const ChangeLanguageView = ({ handleLanguageChange }) => (
  <Button
    ghost="true"
    type="default"
    tabIndex={0}
    onClick={handleLanguageChange}
    style={{
      textTransform: "uppercase",
      color: "#454545",
      borderColor: "#454545",
    }}
  >
    <GlobalOutlined id="admin" className="mr-2" />
    <FormattedMessage style={{ textTransform: "capitalize" }} id="lang.code" />
  </Button>
);

ChangeLanguageView.propTypes = {
  handleLanguageChange: PropTypes.func.isRequired,
};

export default ChangeLanguageView;
