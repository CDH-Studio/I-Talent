import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";
import { FormattedMessage } from "react-intl";

import CardVisibilityToggle from "../cardVisibilityToggle/CardVisibilityToggle";
import EditCardButton from "../editCardButton/EditCardButton";

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
}) => {
  const generateSwitchButton = () =>
    type && (
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
  type: PropTypes.bool,
  visible: PropTypes.bool,
  cardName: PropTypes.string.isRequired,
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
  ),
};

ProfileCardsView.defaultProps = {
  style: undefined,
  content: null,
  editUrl: null,
  type: null,
  visible: null,
  visibleCards: {},
};

export default ProfileCardsView;
