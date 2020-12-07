import { Result,Row } from "antd";
import PropTypes from "prop-types";
import AppLayout from "../layouts/appLayout/AppLayout";

const ErrorResultView = ({ status, title, subTitle, extra }) => (
  <AppLayout displaySearch={false}>
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={extra}
      />
    </Row>
  </AppLayout>
);

ErrorResultView.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node.isRequired,
  extra: PropTypes.node.isRequired,
};

export default ErrorResultView;
