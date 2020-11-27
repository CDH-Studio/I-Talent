import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  Row,
  Col,
  Tag,
  Card,
  Avatar,
  Typography,
  Badge,
  Tooltip,
  Button,
} from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  EditOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  BranchesOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import "./ResultProfileCardView.less";

const { Meta } = Card;
const { Text } = Typography;

const ResultProfileCardView = ({
  profile,
  key,
  isConnection,
  addConnection,
  removeConnection,
  loggedInUserId,
}) => {
  const history = useHistory();

  /**
   * Render User Avatar for each card
   * @param {Object} profile - The profile being rendered on card.
   */
  const getUserAvatar = ({ user }) => {
    let badgeIcon;
    let badgeColor;
    let tooltipMessage;

    if (user.isConnection) {
      badgeIcon = <TeamOutlined className="result-card-badge-icon" />;
      badgeColor = "#087472";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip"
          values={{ name: user.firstName }}
        />
      );
    } else if (user.status === "INACTIVE") {
      badgeIcon = <LockOutlined className="result-card-badge-icon" />;
      badgeColor = "#989898";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip.inactive"
          values={{ name: user.firstName }}
        />
      );
    } else if (user.status === "HIDDEN") {
      badgeIcon = <EyeInvisibleOutlined />;
      badgeColor = "#000";
      tooltipMessage = (
        <FormattedMessage
          id="search.results.cards.connection.tooltip.hidden"
          values={{ name: user.firstName }}
        />
      );
    }

    return (
      <Tooltip align={{ offset: [18, -3] }} title={tooltipMessage}>
        <Badge
          count={badgeIcon}
          offset={[-6, 6]}
          style={{
            backgroundColor: badgeColor,
            borderRadius: "20px",
            padding: "5px",
            color: "white",
          }}
        >
          <Avatar
            size={48}
            style={{
              backgroundColor: user.avatarColor,
            }}
          >
            <Text className="result-card-avatar-text">{user.nameInitials}</Text>
          </Avatar>
        </Badge>
      </Tooltip>
    );
  };

  /**
   * Get subtitle for user card
   * @param {Object} user - The profile being rendered on card.
   */
  const getUserSubtitle = ({ user }) => {
    let subtitle = "-";

    if (user.jobTitle) {
      subtitle = user.jobTitle;
    }

    if (user.groupLevel) {
      subtitle = `${subtitle} (${user.groupLevel.name})`;
    }

    return subtitle;
  };

  /**
   * Render User Avatar for each card
   * @param {Object} user - The profile being rendered on card.
   */
  const getActionRibbonBtn = ({ user }) => {
    // get action in ribbon
    if (user.id !== loggedInUserId) {
      return (
        <Button
          tabIndex={0}
          type="link"
          block
          icon={
            isConnection ? (
              <UserDeleteOutlined className="result-card-button-icon" />
            ) : (
              <UserAddOutlined className="result-card-button-icon" />
            )
          }
          onClick={(e) => {
            e.stopPropagation();

            if (isConnection) {
              removeConnection(user.id);
            } else {
              addConnection(user.id);
            }
          }}
          className="result-card-button"
        >
          {isConnection ? (
            <FormattedMessage id="search.results.cards.remove.connection" />
          ) : (
            <FormattedMessage id="search.results.cards.add.connection" />
          )}
        </Button>
      );
    }
    return (
      <Button
        tabIndex={0}
        type="link"
        block
        icon={<EditOutlined className="result-card-button-icon" />}
        onClick={(e) => {
          e.stopPropagation();
          history.push("/profile/edit/primary-info");
        }}
        className="result-card-button"
      >
        <FormattedMessage id="edit.profile" />
      </Button>
    );
  };

  /**
   * Render User Avatar for each card
   * @param {Object} user - The profile being rendered on card.
   */
  const getCardFooter = ({ user }) => {
    return [
      <div>
        <BranchesOutlined className="result-card-footer-icon" />
        {user.branch ? (
          <Text>{user.branch}</Text>
        ) : (
          <Text>
            <FormattedMessage id="search.results.cards.branch.not.found" />
          </Text>
        )}
      </div>,
      <div>
        <EnvironmentOutlined className="result-card-footer-icon" />
        {user.branch ? (
          <Text>
            {profile.officeLocation.streetNumber}{" "}
            {profile.officeLocation.streetName}, {user.officeLocation.city}
          </Text>
        ) : (
          <Text>
            <FormattedMessage id="search.results.cards.location.not.found" />
          </Text>
        )}
      </div>,
    ];
  };

  /**
   * Render card title
   * @param {Object} user - The profile being rendered on card.
   */
  const getCardTitle = ({ user }) => {
    return (
      <Text>
        {user.firstName} {user.lastName}
      </Text>
    );
  };

  /**
   * handle how to process when enter key is hit when focusing on a results card
   * @param {Object} userId - ID of the profile being rendered on card.
   */
  const handleKeyPress = (e, userId) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      history.push(`/profile/${userId}`);
    }
  };

  return (
    <Col span={24} xxl={12} key={key}>
      <Badge.Ribbon
        style={{ padding: 0 }}
        text={getActionRibbonBtn({ user: profile })}
        color={isConnection ? "#192E2F" : "#1D807B"}
      >
        <Card
          tabIndex={0}
          className="result-card"
          hoverable
          bordered
          onClick={() => history.push(`/profile/${profile.id}`)}
          onKeyPress={(e) => handleKeyPress(e, profile.id)}
          actions={getCardFooter({ user: profile })}
          bodyStyle={{ padding: "23px", flex: 1, flexBasis: "auto" }}
        >
          <Row>
            <Col span={24}>
              <Row style={{ paddingTop: "15px" }}>
                <Meta
                  className="result-card-meta"
                  avatar={getUserAvatar({ user: profile })}
                  title={getCardTitle({ user: profile })}
                  description={
                    <p className="result-card-small-p">
                      {getUserSubtitle({ user: profile })}
                    </p>
                  }
                />
              </Row>
            </Col>

            <Col span={24} style={{ marginTop: "12px" }}>
              {profile.resultSkills.length > 0 ? (
                <span>
                  {profile.resultSkills.map(({ id, name }) => (
                    <Tag className="result-card-tag" key={id}>
                      {name}
                    </Tag>
                  ))}
                  <Tag className="result-card-tag">
                    +{profile.totalResultSkills - 4}
                  </Tag>
                </span>
              ) : (
                <Tag className="result-card-tag">
                  <FormattedMessage id="search.results.cards.skills.not.found" />
                </Tag>
              )}
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

ResultProfileCardView.propTypes = {
  profile: ProfileInfoPropType.isRequired,
  key: PropTypes.string.isRequired,
  isConnection: PropTypes.bool.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
  addConnection: PropTypes.func.isRequired,
  removeConnection: PropTypes.func.isRequired,
};

export default ResultProfileCardView;
