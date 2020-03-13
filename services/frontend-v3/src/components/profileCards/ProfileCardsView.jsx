import React from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined
} from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import { Card, Switch, Button, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";

function ProfileCardsView(props) {
  return (
    <div>
      <Card
        title={props.title}
        extra={generateSwitchButton()}
        style={props.style}
      >
        {props.content}
      </Card>
    </div>
  );
}
const generateSwitchButton = () => {
  return (
    <div>
      <Row type="flex" gutter={[16, 16]}>
        <Col>
          <Switch
            checkedChildren={<EyeOutlined />}
            unCheckedChildren={<EyeInvisibleOutlined />}
            defaultChecked
          />
        </Col>
        <Col>
          <Button type="primary" icon={<EditOutlined />}>
            {<FormattedMessage id="profile.edit" />}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileCardsView;
