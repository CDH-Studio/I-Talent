import PropTypes from "prop-types";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FormattedMessage, useIntl } from "react-intl";

const ChangeLanguageView = ({ className, handleLanguageChange }) => {
  const intl = useIntl();

  return (
    <Button
      aria-label={intl.formatMessage({ id: "language.change" })}
      className={className}
      ghost="true"
      onClick={handleLanguageChange}
      style={{
        textTransform: "uppercase",
        color: "#454545",
        borderColor: "#454545",
      }}
      tabIndex={0}
      type="default"
    >
      <GlobalOutlined className="mr-2" id="admin" />
      <FormattedMessage
        id="lang.code"
        style={{ textTransform: "capitalize" }}
      />
    </Button>
  );
};

ChangeLanguageView.propTypes = {
  handleLanguageChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ChangeLanguageView;
