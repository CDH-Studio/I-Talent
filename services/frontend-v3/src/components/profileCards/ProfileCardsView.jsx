import React from "react";
import PropTypes from "prop-types";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Card, Button, Row, Col, Tooltip, Radio, Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";

import { HistoryPropType } from "../../customPropTypes";

const ProfileCardsView = ({
  editUrl,
  titleId,
  id,
  content,
  style,
  history,
  type,
  visible,
  handleVisibilityToggle,
  status,
}) => {
  /*
   * Handle Visibility Toggle
   *
   * Handle card visibility toggle by updating state and saving state to backend
   */
  const redirectToEdit = () => {
    if (editUrl) {
      history.push(editUrl);
    }
  };

  const generateSwitchButton = () => {
    if (type) {
      return (
        <div style={{ marginTop: "15px" }}>
          <Row type="flex" gutter={[16, 16]}>
            <Col>
              <Radio.Group value={status} buttonStyle="solid" size="middle">
                <Popconfirm
                  title={
                    <FormattedMessage id="profile.visibility.show.confirm" />
                  }
                  placement="topRight"
                  okText={<FormattedMessage id="profile.yes" />}
                  cancelText={<FormattedMessage id="profile.no" />}
                  icon={<WarningOutlined style={{ color: "orange" }} />}
                  onConfirm={() => handleVisibilityToggle("PUBLIC")}
                >
                  <Tooltip
                    placement="bottom"
                    title={
                      <FormattedMessage id="profile.visibleCards.public" />
                    }
                  >
                    <Radio.Button value="PUBLIC">
                      <EyeOutlined />
                    </Radio.Button>
                  </Tooltip>
                </Popconfirm>
                <Tooltip
                  placement="bottom"
                  title={
                    <FormattedMessage id="profile.visibleCards.connections" />
                  }
                >
                  <Radio.Button
                    value="CONNECTIONS"
                    onClick={() => handleVisibilityToggle("CONNECTIONS")}
                  >
                    <TeamOutlined />
                  </Radio.Button>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={<FormattedMessage id="profile.visibleCards.private" />}
                >
                  <Radio.Button
                    value="PRIVATE"
                    onClick={() => handleVisibilityToggle("PRIVATE")}
                  >
                    <EyeInvisibleOutlined />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>
            </Col>
            <Col>
              <Tooltip
                placement="top"
                title={<FormattedMessage id="profile.visibleCards.private" />}
              >
                <Button
                  aria-label="edit card"
                  type="default"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={redirectToEdit}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      );
    }
    return <></>;
  };

  const grayedOut = {
    backgroundColor: visible ? "": "#D3D3D3",
  };

  return (
    <div>
      <Card
        className={content === null ? "no-content-card" : null}
        title={
          typeof titleId === "string" ? (
            <FormattedMessage id={titleId} />
          ) : (
            titleId
          )
        }
        id={id}
        extra={generateSwitchButton()}
        style={(style, grayedOut)}
      >
        {content}
      </Card>
    </div>
  );
};

ProfileCardsView.propTypes = {
  editUrl: PropTypes.string,
  titleId: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.element,
  style: PropTypes.objectOf(PropTypes.string),
  history: HistoryPropType.isRequired,
  type: PropTypes.bool,
  visible: PropTypes.bool,
  handleVisibilityToggle: PropTypes.func,
  status: PropTypes.string,
};

ProfileCardsView.defaultProps = {
  style: undefined,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
  handleVisibilityToggle: null,
  status: "",
};

export default ProfileCardsView;
