import { FormattedMessage } from "react-intl";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import CardVisibilityStatus from "./cardVisibilityStatus/CardVisibilityStatus";
import EditCardButton from "./editCardButton/EditCardButton";

import "./ProfileCardWrapperView.less";

const { Text, Title } = Typography;

/**
 * Generate Visibility Status indicator for public profile (view only mode)
 * @param {Object} props - component props
 * @param {boolean} props.visibleCards - visibility status of this card.
 * @returns {React.ReactElement} - React Element
 */
// eslint-disable-next-line react/prop-types
const VisibilityStatusForPublic = ({ cardVisibilityStatus = false }) =>
  cardVisibilityStatus ? (
    // return visibility icon if cardVisibilityStatus is boolean true
    <Tooltip
      placement="left"
      title={<FormattedMessage id="visibility.card.visible" />}
    >
      <EyeOutlined style={{ color: "#A9A9A9" }} />
    </Tooltip>
  ) : (
    // return blocked visibility icon if cardVisibilityStatus is boolean false
    <Tooltip
      placement="left"
      title={<FormattedMessage id="visibility.card.blocked" />}
    >
      <EyeInvisibleOutlined style={{ color: "#007471" }} />
    </Tooltip>
  );

/**
 * Generate Visibility Status indicator for profile being viewed by admin
 * @param {Object} props - component props
 * @param {('PRIVATE'|'CONNECTIONS'|'PUBLIC')} props.cardVisibilityStatus - visibility status of card.
 * @return {React.ReactElement} generated element to display
 */
// eslint-disable-next-line react/prop-types
const VisibilityStatusForAdmin = ({ cardVisibilityStatus = "PRIVATE" }) => (
  <CardVisibilityStatus visibilityStatus={cardVisibilityStatus} />
);

/**
 * Generate Edit Menu with visibility toggle and edit button for profile in edit mode
 * @param {Object} props - component props
 * @param {Object} props.visibilityOfAllCards - visibility status of all cards.
 * @param {string} props.cardInfoName - name of the card.
 * @param {string} props.editFormUrl - url to edit form.
 * @param {string} props.cardTitleString - title of card.
 * @return {React.ReactElement} generated element to display
 */
/* eslint-disable react/prop-types */
const EditExtraMenu = ({
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
    <Col className="hide-for-print ml-2">
      <EditCardButton editUrl={editFormUrl} />
    </Col>
  </Row>
);
/* eslint-enable react/prop-types */

/**
 * Generate right menu in card header
 * @param {Object} props - component props
 * @param {Object} props.cardInfoName - name of the card.
 * @param {string} props.cardTitleString - string of card name.
 * @param {string} props.editableCardBool - is the card editable.
 * @param {string} props.editFormUrl - url to edit form.
 * @param {string} props.visibilityOfAllCards - visibility status of all cards.
 * @param {string} props.visibilityOfThisCard - visibility status of this card.
 * @return {React.ReactElement} generated element to display
 */
/* eslint-disable react/prop-types */
const ExtraMenu = ({
  cardInfoName,
  cardTitleString,
  editableCardBool = false,
  editFormUrl,
  visibilityOfAllCards,
  visibilityOfThisCard,
}) => {
  let extraMenu;
  if (editableCardBool) {
    extraMenu = (
      <EditExtraMenu
        cardInfoName={cardInfoName}
        cardTitleString={cardTitleString}
        editFormUrl={editFormUrl}
        visibilityOfAllCards={visibilityOfAllCards}
      />
    );
  } else if (typeof visibilityOfThisCard === "boolean") {
    extraMenu = (
      <VisibilityStatusForPublic cardVisibilityStatus={visibilityOfThisCard} />
    );
  } else {
    extraMenu = (
      <VisibilityStatusForAdmin cardVisibilityStatus={visibilityOfThisCard} />
    );
  }
  return extraMenu;
};
/* eslint-enable react/prop-types */

const ProfileCardWrapperView = ({
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
  const grayedOut = {
    backgroundColor: !visibility && "#DCDCDC",
  };

  return (
    <div>
      <Card
        extra={
          displayExtraHeaderContent && (
            <ExtraMenu
              cardInfoName={cardName}
              cardTitleString={titleString}
              editableCardBool={editableCardBool}
              editFormUrl={editUrl}
              visibilityOfAllCards={visibleCards}
              visibilityOfThisCard={visibility}
            />
          )
        }
        id={id}
        style={grayedOut}
        title={
          <>
            <Title className="d-inline profile-card-heading" level={3}>
              {titleString}
            </Title>
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

ProfileCardWrapperView.propTypes = {
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

ProfileCardWrapperView.defaultProps = {
  children: null,
  displayExtraHeaderContent: false,
  editUrl: null,
  editableCardBool: false,
  lastUpdated: null,
  visibility: null,
  visibleCards: {},
};

export default ProfileCardWrapperView;
