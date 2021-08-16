import "./HeaderView.less";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { PageHeader, Tooltip } from "antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

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
  backBtn: PropTypes.bool.isRequired,
  extra: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};

export default HeaderView;
