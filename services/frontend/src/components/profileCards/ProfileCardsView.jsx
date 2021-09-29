import { FormattedMessage } from "react-intl";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CardVisibilityStatus from "../cardVisibilityStatus/CardVisibilityStatus";
import CardVisibilityToggle from "../cardVisibilityToggle/CardVisibilityToggle";
import EditCardButton from "../editCardButton/EditCardButton";

const { Text } = Typography;

const ProfileCardsView = ({
  editUrl,
  titleString,
  id,
  children,
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  visibleCards,
  cardName,
  lastUpdated,
}) => {
  /**
   * Generate Edit Menu with visibility toggle and edit button for profile in edit mode
   * @param {Object} visibilityOfAllCards - visibility status of all cards.
   * @param {string} cardInfoName - name of the card.
   * @param {string} editFormUrl - url to edit form.
   * @param {string} cardTitleString - url to edit form.
   * @return {HTMLElement} generated element to display
   */
  const generateEditMenu = ({
    visibilityOfAllCards,
    cardInfoName,
    editFormUrl,
    cardTitleString,
  }) => (
    <Row>
      <Col className="hide-for-print">
        <CardVisibilityToggle
          ariaLabel={cardTitleString}
          cardName={cardInfoName}
          visibleCards={visibilityOfAllCards}
        />
      </Col>
      <Col className="hide-for-print" style={{ marginLeft: 20 }}>
        <EditCardButton editUrl={editFormUrl} />
      </Col>
    </Row>
  );

  /**
   * Generate Visibility Status indicator for public profile (view only mode)
   * @param {boolean} visibleCards - visibility status of this card.
   * @return {HTMLElement} generated element to display
   */
  const generateVisibilityStatusForPublic = (cardVisibilityStatus) => {
    let visibilityStatusSymbol;

    if (cardVisibilityStatus === true) {
      // return visibility icon if cardVisibilityStatus is boolean true
      visibilityStatusSymbol = (
        <Tooltip
          placement="left"
          title={<FormattedMessage id="visibility.card.visible" />}
        >
          <EyeOutlined style={{ color: "#A9A9A9" }} />
        </Tooltip>
      );
    } else if (cardVisibilityStatus === false) {
      // return blocked visibility icon if cardVisibilityStatus is boolean false
      visibilityStatusSymbol = (
        <Tooltip
          placement="left"
          title={<FormattedMessage id="visibility.card.blocked" />}
        >
          <EyeInvisibleOutlined style={{ color: "#007471" }} />
        </Tooltip>
      );
    } else {
      visibilityStatusSymbol = null;
    }
    return visibilityStatusSymbol;
  };

  /**
   * Generate Visibility Status indicator for profile being viewed by admin
   * @param {('PRIVATE'|'CONNECTIONS'|'PUBLIC')} cardVisibilityStatus - visibility status of card.
   * @return {HTMLElement} generated element to display
   */
  const generateVisibilityStatusForAdmin = (cardVisibilityStatus) => (
    <CardVisibilityStatus visibilityStatus={cardVisibilityStatus} />
  );

  /**
   * Generate right menu in card header
   * @return {HTMLElement} generated element to display
   */
  const generateExtraMenu = () => {
    let extraMenu;
    // check if header content should be visible
    if (displayExtraHeaderContent) {
      if (editableCardBool) {
        extraMenu = generateEditMenu({
          cardInfoName: cardName,
          cardTitleString: titleString,
          editFormUrl: editUrl,
          visibilityOfAllCards: visibleCards,
        });
      } else if (typeof visibility === "boolean") {
        extraMenu = generateVisibilityStatusForPublic(visibility);
      } else {
        extraMenu = generateVisibilityStatusForAdmin(visibility);
      }
    }
    return extraMenu;
  };

  const grayedOut = {
    backgroundColor: !visibility && "#DCDCDC",
  };

  return (
    <div>
      <Card
        extra={generateExtraMenu()}
        id={id}
        style={grayedOut}
        title={
          <>
            <h3 className="d-inline"> {titleString}</h3>
            {lastUpdated && (
              <Tooltip title={<FormattedMessage id="last.modified.date" />}>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "normal",
                    marginLeft: 10,
                  }}
                  type="secondary"
                >
                  ({dayjs(lastUpdated).format("ll")})
                </Text>
              </Tooltip>
            )}
          </>
        }
      >
        {children}
      </Card>
    </div>
  );
};

ProfileCardsView.propTypes = {
  cardName: PropTypes.string.isRequired,
  children: PropTypes.element,
  displayExtraHeaderContent: PropTypes.bool,
  editUrl: PropTypes.string,
  editableCardBool: PropTypes.bool,
  id: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string,
  titleString: PropTypes.node.isRequired,
  visibility: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
  ]),
  visibleCards: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]),
    ])
  ),
};

ProfileCardsView.defaultProps = {
  children: null,
  displayExtraHeaderContent: false,
  editUrl: null,
  editableCardBool: false,
  lastUpdated: null,
  visibility: null,
  visibleCards: {},
};

export default ProfileCardsView;
