import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
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
  Modal,
  List,
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
  FileSearchOutlined,
} from "@ant-design/icons";
import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import FuzzyMatchItem from "./fuzzyMatchItem/FuzzyMatchItem";
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
  const [searchMatchVisibility, setSearchMatchVisibility] = useState(false);
  const intl = useIntl();

  const ariaLabels = [
    intl.formatMessage({ id: "search.fuzzy.results.button.label" }),
  ];

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
          id=" connection.tooltip"
          values={{ name: user.firstName }}
        />
      );
    } else if (user.status === "INACTIVE") {
      badgeIcon = <LockOutlined className="result-card-badge-icon" />;
      badgeColor = "#989898";
      tooltipMessage = (
        <FormattedMessage
          id="connection.tooltip.inactive"
          values={{ name: user.firstName }}
        />
      );
    } else if (user.status === "HIDDEN") {
      badgeIcon = <EyeInvisibleOutlined />;
      badgeColor = "#000";
      tooltipMessage = (
        <FormattedMessage
          id="connection.tooltip.hidden"
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
            <FormattedMessage id="remove.connection" />
          ) : (
              <FormattedMessage id="add.connection" />
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
              <FormattedMessage id="branch.not.found" />
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
              <FormattedMessage id="location.not.found" />
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

  /**
   * Open modal visibility
   * @param {e} event - event used to stop click propagation to parent
   */
  const showModal = (e) => {
    e.stopPropagation();
    setSearchMatchVisibility(true);
  };

  /**
   * Close modal
   */
  const handleCancel = () => {
    setSearchMatchVisibility(false);
  };

  return (
    <>
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
                <Row>
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

              <Col span={24}>
                {profile.totalSkillsCount > 0 ? (
                  <span>
                    {profile.skills.map(({ id, name }) => (
                      <Tag className="result-card-tag" key={id}>
                        {name}
                      </Tag>
                    ))}
                    {profile.totalSkillsCount > 3 && (
                      <Tag className="result-card-tag">
                        +{profile.totalSkillsCount - 3}
                      </Tag>
                    )}
                  </span>
                ) : (
                    <Tag className="result-card-tag">
                      <FormattedMessage id="skills.not.found" />
                    </Tag>
                  )}
              </Col>
            </Row>

            {profile.matches && (
              <Button
                role="button"
                aria-label={ariaLabels[0]}
                aria-pressed="false"
                tabIndex={0}
                shape="circle"
                icon={<FileSearchOutlined />}
                size="medium"
                className="fuzzy-match-modal-btn"
                onClick={(e) => {
                  showModal(e);
                }}
                onKeyPress={(e) => {
                  showModal(e);
                }}
              />
            )}
          </Card>
        </Badge.Ribbon>
      </Col>

      {/* render fuzzy search match modal */}
      <Modal
        title={<FormattedMessage id="search.fuzzy.results" />}
        width={700}
        visible={searchMatchVisibility}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Ok
          </Button>,
        ]}
      >
        <Text strong className="match-modal-description">
          <FileSearchOutlined />
          <FormattedMessage
            id="search.fuzzy.description"
            values={{
              name: getCardTitle({ user: profile }),
            }}
          />
        </Text>
        <List
          size="small"
          className="match-term-list"
          dataSource={profile.matches}
          renderItem={(item) => (
            <List.Item>
              <FuzzyMatchItem
                matchItemName={item.key}
                matchItemString={item.value}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
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
