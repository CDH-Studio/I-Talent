import PropTypes from "prop-types";
import { PageHeader, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";

import "./HeaderView.less";

const HeaderView = ({ title, icon, subtitle, extra, backBtn }) => {
  const intl = useIntl();
  return (
    <PageHeader
      backIcon={
        <Tooltip placement="top" title={intl.formatMessage({ id: "go.back" })}>
          <ArrowLeftOutlined className="circle-icon" />
        </Tooltip>
      }
      className="pageHeader"
      extra={extra}
      onBack={
        backBtn &&
        (() => {
          window.history.back();
        })
      }
      subTitle={subtitle}
      title={
        <>
          {icon && (
            <div aria-hidden="true" className="headerIcon">
              {icon}
            </div>
          )}
          <h1 id="headerTitle">{title}</h1>
        </>
      }
    />
  );
};

HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  backBtn: PropTypes.bool.isRequired,
};

export default HeaderView;
