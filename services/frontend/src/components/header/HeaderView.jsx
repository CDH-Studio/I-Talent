import PropTypes from "prop-types";
import { PageHeader, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";

import "./HeaderView.less";

const HeaderView = ({ title, icon, subtitle, extra, backBtn }) => {
  const intl = useIntl();
  return (
    <PageHeader
      className="pageHeader"
      title={
        <>
          {icon && <div className="headerIcon">{icon}</div>}
          <h1 id="headerTitle">{title}</h1>
        </>
      }
      extra={extra}
      subTitle={subtitle}
      backIcon={
        <Tooltip placement="top" title={intl.formatMessage({ id: "go.back" })}>
          <ArrowLeftOutlined className="circle-icon" />
        </Tooltip>
      }
      onBack={
        backBtn &&
        (() => {
          window.history.back();
        })
      }
    />
  );
};

// aria-label={intl.formatMessage({ id: "go.back" })}
HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  backBtn: PropTypes.bool.isRequired,
};

export default HeaderView;
