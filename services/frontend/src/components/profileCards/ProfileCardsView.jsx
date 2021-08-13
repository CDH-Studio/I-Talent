import PropTypes from "prop-types";
import { Card, Col, Row, Typography, Tooltip } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

import CardVisibilityToggle from "../cardVisibilityToggle/CardVisibilityToggle";
import CardVisibilityStatus from "../cardVisibilityStatus/CardVisibilityStatus";
import EditCardButton from "../editCardButton/EditCardButton";

const { Text } = Typography;

const ProfileCardsView = ({
  editUrl,
  titleString,
  id,
  children,
  style,
  editableCardBool,
  displayExtraHeaderContent,
  visibility,
  visibleCards,
  cardName,
  lastUpdated,
  subTitle,
}) => {
  /**
   * Generate Edit Menu with visibility toggle and edit button for profile in edit mode
   * @param {Object} visibilityOfAllCards - visibility status of all cards.
   * @param {string} cardInfoName - name of the card.
   * @param {string} editFormUrl - url to edit form.
   * @param {string} cardTitleString - url to edit form.
   * @return {HTMLElement} generated element to display
   *
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
          visibleCards={visibilityOfAllCards}
          cardName={cardInfoName}
          ariaLabel={cardTitleString}
        />
      </Col>
      <Col style={{ marginLeft: 20 }} className="hide-for-print">
        <EditCardButton editUrl={editFormUrl} />
      </Col>
    </Row>
  );

  /**
   * Generate Visibility Status indicator for public profile (view only mode)
   * @param {boolean} visibleCards - visibility status of this card.
   * @return {HTMLElement} generated element to display
   *
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
          visibilityOfAllCards: visibleCards,
          cardInfoName: cardName,
          editFormUrl: editUrl,
          cardTitleString: titleString,
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
        title={
          <>
            {titleString}
            {lastUpdated && (
              <Tooltip title={<FormattedMessage id="last.modified.date" />}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                  type="secondary"
                >
                  ({dayjs(lastUpdated).format("ll")})
                </Text>
              </Tooltip>
            )}
            {subTitle && (
              <>
                <br />
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: "12px",
                  }}
                  type="secondary"
                >
                  <FormattedMessage id={subTitle} />
                </Text>
              </>
            )}
          </>
        }
        id={id}
        extra={generateExtraMenu()}
        style={(style, grayedOut)}
      >
        {children}
      </Card>
    </div>
  );
};

ProfileCardsView.propTypes = {
  editUrl: PropTypes.string,
  titleString: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.element,
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
  subTitle: PropTypes.string,
};

ProfileCardsView.defaultProps = {
  style: undefined,
  children: null,
  editUrl: null,
  editableCardBool: false,
  displayExtraHeaderContent: false,
  visibility: null,
  visibleCards: {},
  lastUpdated: null,
  subTitle: null,
};

export default ProfileCardsView;
