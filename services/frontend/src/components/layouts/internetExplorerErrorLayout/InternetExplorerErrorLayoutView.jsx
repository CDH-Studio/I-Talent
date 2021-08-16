import { IeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Layout, Result, Row } from "antd";
import PropTypes from "prop-types";

import logo from "../../../assets/I-talent-logo-light.png";

const { Header } = Layout;

/**
 *  InternetExplorerErrorLayoutView(props)
 *
 *  Component to render the IE incompatibility error
 */
const InternetExplorerErrorLayoutView = ({ redirectBrowser }) => (
  <Layout className="layout">
    <Header>
      <img alt="I-Talent Landing" src={logo} style={{ height: "50%" }} />
    </Header>
    <div style={{ padding: "50px 50px" }}>
      <Row gutter={[48, 16]}>
        <Col lg={12} xs={24}>
          <Card size="small">
            <Result
              extra={
                <Button onClick={redirectBrowser} type="primary">
                  <span>
                    <strong>Open in Microsoft Edge</strong>
                  </span>
                </Button>
              }
              icon={<IeOutlined />}
              subTitle="I-Talent requires a more modern browser to provide a fast and secure experience."
              title="IE Not Supported"
            />
          </Card>
        </Col>
        <Col lg={0} xs={24}>
          <Divider />
        </Col>
        <Col lg={12} xs={24}>
          <Card size="small">
            <Result
              extra={
                <Button onClick={redirectBrowser} type="primary">
                  <span>
                    <strong>Ouvrir avec Microsoft Edge</strong>
                  </span>
                </Button>
              }
              icon={<IeOutlined />}
              subTitle="I-Talent nécessite un navigateur plus moderne pour offrir une expérience rapide et sécurisée."
              title="IE n'est pas pris en charge"
            />
          </Card>
        </Col>
      </Row>
    </div>
  </Layout>
);

InternetExplorerErrorLayoutView.propTypes = {
  redirectBrowser: PropTypes.func.isRequired,
};

export default InternetExplorerErrorLayoutView;
