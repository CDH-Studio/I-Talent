import React from "react";
import { injectIntl } from "react-intl";
import { Form } from "antd";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Button, Card } from "antd";
import logo from "../sideNav/logo_v2.svg";

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
      toggle,
      data
    } = this.props;

    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });

    const onFinish = values => {
      handleSearch(values);
    };

    return (
      <Form
        onFinish={onFinish}
        style={{
          width: "100%",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "60px"
        }}
      >
        <div style={styles.outerDiv}>
          <div style={styles.mainSearchDiv}>
            <header style={styles.header}>
              <img src={logo} alt="UpSkill Logo" style={{ height: "80px" }} />;
            </header>
            {/* Gets main basic search field and shows buttons beneath */}
            <div style={styles.advFieldStyles}>{getBasicField(data)}</div>
            <Col span={24} style={{ textAlign: "right" }}>
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
                onClick={() => {
                  handleReset();
                }}
              >
                {this.props.intl.formatMessage({
                  id: "button.clear",
                  defaultMessage: "Clear"
                })}
              </Button>
            </Col>
          </div>
          <Card style={styles.advSearchCard}>
            {/* Gets fields for Advanced Search in collapse */}
            <Row gutter={24} type="flex">
              {getFields(data)}
            </Row>
            <Row>
              <Col span={24} style={styles.advFieldPlacement}>
                <a style={{ marginLeft: 8, fontSize: 14 }} onClick={toggle}>
                  {this.props.intl.formatMessage({
                    id: "advanced.search.button.text",
                    defaultMessage: "Advanced Search"
                  })}{" "}
                  <LegacyIcon type={this.state.expand ? "up" : "down"} />
                </a>
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    );
  }
}

const styles = {
  outerDiv: {
    paddingTop: "80px",
    paddingLeft: "20%",
    paddingRight: "20%",
    paddingBottom: "20px"
  },
  mainSearchDiv: {
    backgroundColor: "#001C1A",
    borderRadius: "5px",
    paddingTop: "80px",
    paddingLeft: "80px",
    paddingRight: "80px",
    paddingBottom: "30px",
    boxShadow: "10px 10px 10px #cccccc"
  },
  header: {
    paddingBottom: "20px",
    textAlign: "center"
  },
  advFieldStyles: {
    textAlign: "center"
  },
  advSearchCard: {
    boxShadow: "10px 10px 10px #cccccc",
    borderRadius: "5px"
  },
  advFieldPlacement: {
    textAlign: "right"
  }
};
export default injectIntl(SearchBarView);
