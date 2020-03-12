import React, { Component } from "react";
import { Table, Button, PageHeader, Row, Col } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { injectIntl } from "react-intl";

class UserTableView extends Component {
  render() {
    const { data, columns, size, statuses, handleApply } = this.props;
    return (
      <>
        <PageHeader
          title="User Table"
          extra={[
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              size={size}
              onClick={handleApply}
              disabled={Object.entries(statuses).length === 0}
            >
              {this.props.intl.formatMessage({
                id: "admin.apply",
                defaultMessage: "Apply"
              })}
            </Button>
          ]}
        />
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>
        </Row>
      </>
    );
  }
}

export default injectIntl(UserTableView);
