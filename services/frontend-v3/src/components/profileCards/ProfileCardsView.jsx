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
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  visibleCards,
  cardName,
  lastUpdated,
}) => {
  const generateSwitchButton = () => {
    if (displayExtraHeaderContent) {
      if (editableCardBool) {
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
      }

      if (visibility) {
        // return visibility icon
        return (
          <Tooltip
            placement="left"
            title={<FormattedMessage id="profile.visibility.card.visible" />}
          >
            <EyeOutlined style={{ color: "#A9A9A9" }} />
          </Tooltip>
        );
      }

      // return blocked visibility icon
      return (
        <Tooltip
          placement="left"
          title={<FormattedMessage id="profile.visibility.card.blocked" />}
        >
          <EyeInvisibleOutlined style={{ color: "#007471" }} />
        </Tooltip>
      );
    }
    return null;
  };

  const grayedOut = {
    backgroundColor: visibility ? "#fff" : "#DCDCDC",
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

                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                  type="secondary"
                >
                  ({moment(lastUpdated).format("ll")})
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
  editableCardBool: PropTypes.bool,
  displayExtraHeaderContent: PropTypes.bool,
  visibility: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
  ]),
  cardName: PropTypes.string.isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
    ])
  ),
  lastUpdated: PropTypes.string,
};

ProfileCardsView.defaultProps = {
  style: undefined,
  content: null,
  editUrl: null,
  editableCardBool: false,
  displayExtraHeaderContent: false,
  visibility: null,
  visibleCards: {},
  lastUpdated: null,
};

export default ProfileCardsView;
