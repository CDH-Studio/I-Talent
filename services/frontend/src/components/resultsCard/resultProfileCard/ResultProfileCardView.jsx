import "./ResultProfileCardView.less";

import {
  BranchesOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  FileSearchOutlined,
  LockOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  List,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

import { ProfileInfoPropType } from "../../../utils/customPropTypes";
import FuzzyMatchItem from "./fuzzyMatchItem/FuzzyMatchItem";

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
          id="connection.tooltip"
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
          block
          className="result-card-button"
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
          tabIndex={0}
          type="link"
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
        block
        className="result-card-button"
        icon={<EditOutlined className="result-card-button-icon" />}
        onClick={(e) => {
          e.stopPropagation();
          history.push("/profile/edit/primary-info");
        }}
        tabIndex={0}
        type="link"
      >
        <FormattedMessage id="edit.profile" />
      </Button>
    );
  };

  /**
   * Render User Avatar for each card
   * @param {Object} user - The profile being rendered on card.
   */
  const getCardFooter = ({ user }) => [
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
      {profile.officeLocation ? (
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

  /**
   * Render card title
   * @param {Object} user - The profile being rendered on card.
   */
  const getCardTitle = ({ user }) => (
    <Text>
      {user.firstName} {user.lastName}
    </Text>
  );

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
      <Col key={key} span={24} xxl={12}>
        <Badge.Ribbon
          color={isConnection ? "#192E2F" : "#1D807B"}
          style={{ padding: 0 }}
          text={getActionRibbonBtn({ user: profile })}
        >
          <Card
            actions={getCardFooter({ user: profile })}
            bodyStyle={{ padding: "23px", flex: 1, flexBasis: "auto" }}
            bordered
            className="result-card"
            hoverable
            onClick={() => history.push(`/profile/${profile.id}`)}
            onKeyPress={(e) => handleKeyPress(e, profile.id)}
            tabIndex={0}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Meta
                    avatar={getUserAvatar({ user: profile })}
                    className="result-card-meta"
                    description={
                      <p className="result-card-small-p">
                        {getUserSubtitle({ user: profile })}
                      </p>
                    }
                    title={getCardTitle({ user: profile })}
                  />
                </Row>
              </Col>

              <Col span={24}>
                {profile.totalSkillsCount > 0 ? (
                  <span>
                    {profile.skills.map(({ id, name }) => (
                      <Tag key={id} className="result-card-tag">
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
                aria-label={ariaLabels[0]}
                aria-pressed="false"
                className="fuzzy-match-modal-btn"
                icon={<FileSearchOutlined />}
                onClick={(e) => {
                  showModal(e);
                }}
                onKeyPress={(e) => {
                  showModal(e);
                }}
                role="button"
                shape="circle"
                size="medium"
                tabIndex={0}
              />
            )}
          </Card>
        </Badge.Ribbon>
      </Col>

      {/* render fuzzy search match modal */}
      <Modal
        footer={[
          <Button onClick={handleCancel} type="primary">
            Ok
          </Button>,
        ]}
        onCancel={handleCancel}
        title={<FormattedMessage id="search.fuzzy.results" />}
        visible={searchMatchVisibility}
        width={700}
      >
        <Text className="match-modal-description" strong>
          <FileSearchOutlined />
          <FormattedMessage
            id="search.fuzzy.description"
            values={{
              name: getCardTitle({ user: profile }),
            }}
          />
        </Text>
        <List
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
          size="small"
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
