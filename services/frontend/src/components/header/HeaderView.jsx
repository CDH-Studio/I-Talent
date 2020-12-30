import PropTypes from "prop-types";
import { PageHeader, Button, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";

import "./HeaderView.less";

const HeaderView = ({ title, icon, subtitle, extra, onBack }) => {
  const intl = useIntl();

  return (
    <PageHeader
      className="pageHeader"
      title={
        <>
          {icon && <div className="headerIcon">{icon}</div>}

          {title}
        </>
      }
      extra={extra}
      subTitle={subtitle}
      backIcon={
        <Tooltip placement="top" title={intl.formatMessage({ id: "go.back" })}>
          <Button
            type="primary"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            aria-label={intl.formatMessage({ id: "go.back" })}
          />
        </Tooltip>
      }
      onBack={onBack}
    />
  );
};

HeaderView.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default HeaderView;
