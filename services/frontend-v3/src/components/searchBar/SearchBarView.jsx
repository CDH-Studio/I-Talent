import React from "react";
import { injectIntl } from "react-intl";
import { Form, Row, Select, Col, Button, Icon, Card } from "antd";

import logo from "../sideNav/logo_v2.svg";

const { Option } = Select;
class SearchBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  render() {
    const {
      getFields,
      getBasicField,
      handleSearch,
      handleReset,
      toggle
    } = this.props;
    const { data } = this.props;

    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });

    return (
      <Form onSubmit={handleSearch}>
        <div
          style={{
            paddingTop: "80px",
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingBottom: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: "#001C1A",
              borderRadius: "5px",
              paddingTop: "80px",
              paddingLeft: "80px",
              paddingRight: "80px",
              paddingBottom: "80px",
              boxShadow: "5px 5px 5px #cccccc"
            }}
          >
            <header
              style={{
                paddingBottom: "20px",
                textAlign: "center"
              }}
            >
              <img src={logo} alt="UpSkill Logo" style={{ height: "80px" }} />;
            </header>
            {/* Gets main basic search field and shows buttons beneath */}
            <div style={{ paddingBottom: "20px" }}>{getBasicField(data)}</div>
            <Col span={24} style={{ textAlign: "right", paddingTop: "0px" }}>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
              >
                {searchLabel}
              </Button>
              <Button
                ghost
                shape="round"
                size="large"
                style={{ marginLeft: 8 }}
                onClick={handleReset}
              >
                {this.props.intl.formatMessage({
                  id: "button.clear",
                  defaultMessage: "Clear"
                })}
              </Button>
            </Col>
          </div>
          <Card
            style={{ boxShadow: "5px 5px 5px #e6e6e6", borderRadius: "5px" }}
          >
            {/* Gets fields for Advanced Search in collapse */}
            <Row gutter={24}>{getFields(data)}</Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <a style={{ marginLeft: 8, fontSize: 14 }} onClick={toggle}>
                  {this.props.intl.formatMessage({
                    id: "advanced.search.button.text",
                    defaultMessage: "Advanced Search"
                  })}{" "}
                  <Icon type={this.state.expand ? "up" : "down"} />
                </a>
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    );
  }
}
export default injectIntl(SearchBarView);
