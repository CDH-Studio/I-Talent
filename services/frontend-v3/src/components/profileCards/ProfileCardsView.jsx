import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Typography, Tooltip } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import CardVisibilityToggle from "../cardVisibilityToggle/CardVisibilityToggle";
import EditCardButton from "../editCardButton/EditCardButton";

const { Text } = Typography;

const ProfileCardsView = ({
  editUrl,
  titleId,
  id,
  content,
  style,
  type,
  visible,
  visibleCards,
  cardName,
  lastUpdated,
}) => {
  const generateSwitchButton = () => {
    if (type) {
      // return visibility toggle
      return (
        <Row>
          <Col>
            <CardVisibilityToggle
              visibleCards={visibleCards}
              cardName={cardName}
            />
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <EditCardButton editUrl={editUrl} />
          </Col>
        </Row>
      );
    } else {
      const visibilityStyle = {
        color: "#A9A9A9",
      };
      // return visibility icon
      if (visible) {
        return (
          <Tooltip
            placement="left"
            title={<FormattedMessage id="profile.visibility.card.visible" />}
          >
            <EyeOutlined style={{ color: "#A9A9A9" }} />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip
            placement="left"
            title={<FormattedMessage id="profile.visibility.card.blocked" />}
          >
            <EyeInvisibleOutlined style={{ color: "#007471" }} />
          </Tooltip>
        );
      }
    }
  };

  const grayedOut = {
    backgroundColor: visible ? "" : "#DCDCDC",
  };

  return (
    <div>
      <Card
        className={content === null ? "no-content-card" : null}
        title={
          <>
            {typeof titleId === "string" ? (
              <FormattedMessage id={titleId} />
            ) : (
              titleId
            )}
            {lastUpdated && (
              <Tooltip title={<FormattedMessage id="profile.last.updated" />}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontStyle: "italic",
                    fontWeight: "normal",
                  }}
                  type="secondary"
                >
                  {moment(lastUpdated).format("LL")}
                </Text>
              </Tooltip>
            )}
          </>
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
  type: PropTypes.bool,
  visible: PropTypes.bool,
  cardName: PropTypes.string.isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ),
  lastUpdated: PropTypes.string,
};

ProfileCardsView.defaultProps = {
  style: undefined,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
  visibleCards: {},
  lastUpdated: null,
};

export default ProfileCardsView;
