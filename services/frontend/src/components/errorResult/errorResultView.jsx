import { Result, Row } from "antd";
import PropTypes from "prop-types";
import AppLayout from "../layouts/appLayout/AppLayout";

const ErrorResultView = ({ status, title, subTitle, extra }) => (
  <AppLayout displaySearch={false}>
    <Row align="middle" justify="center" style={{ height: "100%" }}>
      <Result extra={extra} status={status} subTitle={subTitle} title={title} />
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
