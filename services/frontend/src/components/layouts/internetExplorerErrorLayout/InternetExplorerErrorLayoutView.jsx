import PropTypes from "prop-types";
import { Layout, Row, Col, Button, Result, Divider, Card } from "antd";
import { IeOutlined } from "@ant-design/icons";
import logo from "../../../assets/I-talent-logo-light.png";

const { Header } = Layout;

/**
 *  InternetExplorerErrorLayoutView(props)
 *
 *  Component to render the IE incompatibility error
 */
const InternetExplorerErrorLayoutView = ({ redirectBrowser }) => {
  return (
    <Layout className="layout">
      <Header>
        <img src={logo} alt="I-Talent Landing" style={{ height: "50%" }} />
      </Header>
      <div style={{ padding: "50px 50px" }}>
        <Row gutter={[48, 16]}>
          <Col lg={12} xs={24}>
            <Card size="small">
              <Result
                icon={<IeOutlined />}
                title="IE Not Supported"
                subTitle="I-Talent requires a more modern browser to provide a fast and secure experience."
                extra={
                  <Button type="primary" onClick={redirectBrowser}>
                    <span>
                      <strong>Open in Microsoft Edge</strong>
                    </span>
                  </Button>
                }
              />
            </Card>
          </Col>
          <Col lg={0} xs={24}>
            <Divider />
          </Col>
          <Col lg={12} xs={24}>
            <Card size="small">
              <Result
                icon={<IeOutlined />}
                title="IE n'est pas pris en charge"
                subTitle="I-Talent nécessite un navigateur plus moderne pour offrir une expérience rapide et sécurisée."
                extra={
                  <Button type="primary" onClick={redirectBrowser}>
                    <span>
                      <strong>Ouvrir avec Microsoft Edge</strong>
                    </span>
                  </Button>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

InternetExplorerErrorLayoutView.propTypes = {
  redirectBrowser: PropTypes.func.isRequired,
};

export default InternetExplorerErrorLayoutView;
