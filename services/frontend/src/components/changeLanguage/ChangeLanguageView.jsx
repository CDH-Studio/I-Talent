import { FormattedMessage, useIntl } from "react-intl";
import { GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";

const ChangeLanguageView = ({ className, handleLanguageChange }) => {
  const intl = useIntl();

  return (
    <Button
      aria-label={intl.formatMessage({ id: "language.change" })}
      className={className}
      ghost="true"
      onClick={handleLanguageChange}
      style={{
        borderColor: "#454545",
        color: "#454545",
        textTransform: "uppercase",
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
  className: PropTypes.string.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
};

export default ChangeLanguageView;
